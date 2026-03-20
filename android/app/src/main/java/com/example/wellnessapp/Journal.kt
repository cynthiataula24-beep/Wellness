package com.example.wellnessapp

import android.content.Context
import android.widget.Toast
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.KeyboardArrowDown
import androidx.compose.material.icons.filled.KeyboardArrowUp
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.text.SimpleDateFormat
import java.util.*
import kotlin.math.absoluteValue

@Composable
fun JournalScreen() {
    val context = LocalContext.current
    var entryText by remember { mutableStateOf("") }
    val entries = remember { mutableStateListOf<JournalEntry>() }

    var isLoading by remember { mutableStateOf(false) }
    var expandedCategory by remember { mutableStateOf<String?>(null) }

    // ✅ Load token from SharedPreferences
    val prefs = context.getSharedPreferences("auth", Context.MODE_PRIVATE)
    val token = prefs.getString("access_token", null)

    // --- HISTORY ON LOAD ---
    LaunchedEffect(Unit) {
        if (token != null) {
            isLoading = true
            RetrofitClient.instance.getJournalEntries("Bearer $token").enqueue(object : Callback<List<JournalEntry>> {
                override fun onResponse(call: retrofit2.Call<List<JournalEntry>>, response: Response<List<JournalEntry>>) {
                    isLoading = false
                    if (response.isSuccessful) {
                        entries.clear()
                        response.body()?.forEach {
                            entries.add(it) // it is already a JournalEntry
                        }
                    }

                else {
                        Toast.makeText(context, "Failed to load journal entries", Toast.LENGTH_SHORT).show()
                    }
                }
                override fun onFailure(call: retrofit2.Call<List<JournalEntry>>, t: Throwable) {
                    isLoading = false
                    Toast.makeText(context, "Error: ${t.message}", Toast.LENGTH_SHORT).show()
                }
            })
        }
    }

    val categories = mapOf(
        "Letters From Me" to listOf("Write a letter to your 5-year-old self...", "Write a letter to your future self in 10 years."),
        "Knowing Who I Am" to listOf("What are the three most important values you live by?", "When do you feel the most like yourself?"),
        "Self Love" to listOf("What are three things you love about your personality today?", "Write a thank-you note to your body.")
    )

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFFF8FAFC))
            .padding(16.dp)
            .verticalScroll(rememberScrollState())
    ) {
        Text("My Journal", fontSize = 24.sp, fontWeight = FontWeight.Bold, color = Color(0xFF1E3A8A))

        if (isLoading) {
            LinearProgressIndicator(modifier = Modifier.fillMaxWidth().padding(vertical = 8.dp))
        }

        Spacer(modifier = Modifier.height(16.dp))

        // --- Editor FIRST (half screen) ---
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .heightIn(min = 300.dp), // spans ~half screen
            colors = CardDefaults.cardColors(containerColor = Color.White)
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                OutlinedTextField(
                    value = entryText,
                    onValueChange = { entryText = it },
                    placeholder = { Text("Write your thoughts here...") },
                    modifier = Modifier.fillMaxWidth().height(200.dp)
                )

                Spacer(modifier = Modifier.height(12.dp))

                Button(
                    onClick = {
                        if (entryText.isNotBlank() && token != null) {
                            val date = SimpleDateFormat("MMM dd, yyyy", Locale.getDefault()).format(Date())
                            val newEntry = JournalEntry(id = 0, text = entryText, date = date)

                            RetrofitClient.instance.saveJournalEntry("Bearer $token", newEntry).enqueue(object : Callback<Void> {
                                override fun onResponse(call: retrofit2.Call<Void>, response: Response<Void>) {
                                    if (response.isSuccessful) {
                                        entries.add(0, newEntry)
                                        entryText = ""
                                    } else {
                                        Toast.makeText(context, "Failed to save entry", Toast.LENGTH_SHORT).show()
                                    }
                                }
                                override fun onFailure(call: retrofit2.Call<Void>, t: Throwable) {
                                    Toast.makeText(context, "Error: ${t.message}", Toast.LENGTH_SHORT).show()
                                }
                            })
                        }
                    }
                ) {
                    Text("Save Entry")
                }
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        // --- Prompts as Expandable Colorful Cards ---
        Text("Daily Prompts", fontWeight = FontWeight.Bold, color = Color.Blue)
        
        categories.forEach { (category, prompts) ->
            PromptCategoryCard(
                category = category,
                prompts = prompts,
                isExpanded = expandedCategory == category,
                onToggle = { expandedCategory = if (expandedCategory == category) null else category },
                onPromptClick = { entryText = it }
            )
        }

        // --- Add New Journal Card ---
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 8.dp)
                .clickable { entryText = "" },
            colors = CardDefaults.cardColors(containerColor = Color(0xFFE0F7FA)),
            elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
        ) {
            Row(
                modifier = Modifier.padding(16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(Icons.Default.Add, contentDescription = "New Journal", tint = Color(0xFF00796B))
                Spacer(modifier = Modifier.width(8.dp))
                Text("New Journal", fontWeight = FontWeight.Bold, color = Color(0xFF00796B))
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        // --- History Header ---
        Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
            Text("Journal History", fontWeight = FontWeight.Bold, color = Color.Blue)
            if (entries.isNotEmpty()) {
                TextButton(onClick = {
                    if (token != null) {
                        RetrofitClient.instance.clearJournal("Bearer $token").enqueue(object : Callback<Void> {
                            override fun onResponse(call: Call<Void>, response: Response<Void>) {
                                if (response.isSuccessful) {
                                    entries.clear()
                                    Toast.makeText(context, "All entries cleared", Toast.LENGTH_SHORT).show()
                                } else {
                                    Toast.makeText(context, "Failed to clear entries", Toast.LENGTH_SHORT).show()
                                }
                            }
                            override fun onFailure(call: Call<Void>, t: Throwable) {
                                Toast.makeText(context, "Error: ${t.message}", Toast.LENGTH_SHORT).show()
                            }
                        })
                    }
                }) {
                    Text("Clear All", color = Color.Red)
                }

            }
        }

        // --- Entries List ---
        entries.forEach { entry ->
            JournalHistoryCard(entry = entry, onDelete = { id ->
                if (token != null) {
                    RetrofitClient.instance.deleteJournalEntry("Bearer $token", id).enqueue(object : Callback<Void> {
                        override fun onResponse(call: Call<Void>, response: Response<Void>) {
                            if (response.isSuccessful) {
                                entries.removeAll { it.id == id }
                                Toast.makeText(context, "Entry deleted", Toast.LENGTH_SHORT).show()
                            } else {
                                Toast.makeText(context, "Failed to delete entry", Toast.LENGTH_SHORT).show()
                            }
                        }
                        override fun onFailure(call: Call<Void>, t: Throwable) {
                            Toast.makeText(context, "Error: ${t.message}", Toast.LENGTH_SHORT).show()
                        }
                    })
                }
            })
        }

    }
}

@Composable
fun PromptCategoryCard(
    category: String,
    prompts: List<String>,
    isExpanded: Boolean,
    onToggle: () -> Unit,
    onPromptClick: (String) -> Unit
) {
    val colors = listOf(
        Color(0xFFE3F2FD), // light blue
        Color(0xFFF3E5F5), // lavender
        Color(0xFFE8F5E9)  // mint green
    )
    val bgColor = colors[category.hashCode().absoluteValue % colors.size]

    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp)
            .clickable { onToggle() },
        colors = CardDefaults.cardColors(containerColor = bgColor),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text(category, fontWeight = FontWeight.Bold, fontSize = 18.sp, color = Color(0xFF1E3A8A))
                Spacer(modifier = Modifier.weight(1f))
                Icon(
                    imageVector = if (isExpanded) Icons.Default.KeyboardArrowUp else Icons.Default.KeyboardArrowDown,
                    contentDescription = null
                )
            }
            if (isExpanded) {
                Spacer(modifier = Modifier.height(8.dp))
                prompts.forEach { prompt ->
                    Text(
                        text = "• $prompt",
                        modifier = Modifier
                            .padding(vertical = 4.dp)
                            .clickable { onPromptClick(prompt) },
                        fontSize = 14.sp,
                        color = Color.DarkGray
                    )
                }
            }
        }
    }
}

@Composable
fun JournalHistoryCard(entry: JournalEntry, onDelete: (Int) -> Unit) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 4.dp),
        colors = CardDefaults.cardColors(containerColor = Color(0xFFF1F5F9))
    ) {
        Row(modifier = Modifier.padding(12.dp), verticalAlignment = Alignment.CenterVertically) {
            Column(modifier = Modifier.weight(1f)) {
                Text(entry.date, fontSize = 11.sp, color = Color.Gray)
                Text(entry.text, fontSize = 14.sp)
            }
            IconButton(onClick = { onDelete(entry.id) }) {
                Icon(Icons.Default.Close, contentDescription = "Delete", tint = Color.Gray, modifier = Modifier.size(20.dp))
            }
        }
    }
}


