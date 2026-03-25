package com.example.wellnessapp

import android.content.Context
import android.util.Log
import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.window.Dialog
import kotlinx.coroutines.launch

@Composable
fun GoalsScreen(apiService: ApiService) {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    val scrollState = rememberScrollState()

    val prefs = remember { context.getSharedPreferences("auth", Context.MODE_PRIVATE) }
    val token = prefs.getString("access_token", "") ?: ""

    var habits by remember { mutableStateOf<List<Habit>>(emptyList()) }
    var isLoading by remember { mutableStateOf(true) }
    var showAddDialog by remember { mutableStateOf(false) }

    LaunchedEffect(Unit) {
        if (token.isNotEmpty()) {
            try {
                val response = apiService.getHabits("Bearer $token")
                // REMOVE CODING CARD: Filter to keep only what you want
                habits = response.filter { it.name != "Coding" }
            } catch (e: Exception) {
                Log.e("GoalsScreen", "Fetch failed: ${e.message}")
            } finally {
                isLoading = false
            }
        }
    }

    Scaffold(containerColor = Color(0xFFF8F9FA)) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .verticalScroll(scrollState)
                .padding(20.dp)
        ) {
            Text("Daily Goals", fontSize = 28.sp, fontWeight = FontWeight.Bold, color = Color(0xFF1E40AF))
            Text("Stay consistent. Resetting daily.", fontSize = 14.sp, color = Color.Gray, modifier = Modifier.padding(bottom = 24.dp))

            if (isLoading) {
                Box(Modifier.fillMaxWidth().height(200.dp), contentAlignment = Alignment.Center) {
                    CircularProgressIndicator(color = Color(0xFF0D6EFD))
                }
            } else {
                habits.forEach { habit ->
                    HabitWebCard(
                        habit = habit,
                        onLog = {
                            val increment = if (habit.name == "Daily Steps") 100f else 1f
                            val newCurrent = (habit.current + increment).coerceAtMost(habit.target)
                            scope.launch {
                                try {
                                    val updated = apiService.updateHabit("Bearer $token", habit.id, HabitUpdate(newCurrent))
                                    habits = habits.map { if (it.id == habit.id) updated else it }
                                } catch (e: Exception) { Log.e("GoalsScreen", "Update failed") }
                            }
                        },
                        onDelete = {
                            scope.launch {
                                try {
                                    apiService.deleteHabit("Bearer $token", habit.id)
                                    habits = habits.filter { it.id != habit.id }
                                } catch (e: Exception) { Log.e("GoalsScreen", "Delete failed") }
                            }
                        }
                    )
                    Spacer(modifier = Modifier.height(16.dp))
                }

                Button(
                    onClick = { showAddDialog = true },
                    modifier = Modifier.fillMaxWidth().padding(vertical = 20.dp).height(54.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF0D6EFD)),
                    shape = RoundedCornerShape(27.dp)
                ) {
                    Text("+ Add New Goal", fontSize = 16.sp, fontWeight = FontWeight.Bold)
                }
            }
        }
    }

    if (showAddDialog) {
        AddHabitDialog(
            onDismiss = { showAddDialog = false },
            onConfirm = { name, target, unit ->
                scope.launch {
                    try {
                        val newHabit = HabitCreateRequest(name, target, unit, "#0d6efd")
                        val savedHabit = apiService.createHabit("Bearer $token", newHabit)
                        habits = habits + savedHabit
                        showAddDialog = false
                    } catch (e: Exception) { Log.e("GoalsScreen", "Add failed") }
                }
            }
        )
    }
}

@Composable
fun HabitWebCard(habit: Habit, onLog: () -> Unit, onDelete: () -> Unit) {
    val progress = (habit.current / habit.target).coerceIn(0f, 1f)
    val isDone = habit.current >= habit.target
    val habitColor = remember(habit.color) {
        try { Color(android.graphics.Color.parseColor(habit.color)) }
        catch (e: Exception) { Color(0xFF0D6EFD) }
    }

    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(2.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            // Delete Button at Top Right
            Box(modifier = Modifier.fillMaxWidth()) {
                IconButton(
                    onClick = onDelete,
                    modifier = Modifier.align(Alignment.TopEnd).size(24.dp)
                ) {
                    Icon(Icons.Default.Close, contentDescription = "Delete", tint = Color.LightGray)
                }

                // Progress Circle
                Box(modifier = Modifier.size(50.dp), contentAlignment = Alignment.Center) {
                    Canvas(modifier = Modifier.fillMaxSize()) {
                        drawArc(Color(0xFFF1F3F5), -90f, 360f, false, style = Stroke(10f))
                        drawArc(if (isDone) Color(0xFF198754) else habitColor, -90f, progress * 360f, false, style = Stroke(10f))
                    }
                    Text(if (isDone) "🎉" else "${(progress * 100).toInt()}%", fontSize = 11.sp, fontWeight = FontWeight.Bold)
                }
            }

            Spacer(modifier = Modifier.height(8.dp))
            Column(Modifier.fillMaxWidth(), horizontalAlignment = Alignment.CenterHorizontally) {
                Text(habit.name, fontSize = 20.sp, fontWeight = FontWeight.Bold, color = if (isDone) Color.Gray else Color.Black)
                Text("${habit.current.toInt()} of ${habit.target.toInt()} ${habit.unit}", fontSize = 14.sp, color = Color.Gray, modifier = Modifier.padding(top = 4.dp, bottom = 12.dp))
                OutlinedButton(
                    onClick = onLog,
                    modifier = Modifier.fillMaxWidth().height(48.dp),
                    shape = RoundedCornerShape(24.dp),
                    enabled = !isDone,
                    border = BorderStroke(1.dp, if (isDone) Color.Transparent else habitColor),
                    colors = ButtonDefaults.outlinedButtonColors(contentColor = habitColor)
                ) {
                    Text(if (isDone) "Completed" else "Log ${habit.unit}", fontWeight = FontWeight.Bold)
                }
            }
        }
    }
}

@Composable
fun AddHabitDialog(onDismiss: () -> Unit, onConfirm: (String, Float, String) -> Unit) {
    var name by remember { mutableStateOf("") }
    var target by remember { mutableStateOf("") }
    var unit by remember { mutableStateOf("") }

    Dialog(onDismissRequest = onDismiss) {
        Card(shape = RoundedCornerShape(16.dp), colors = CardDefaults.cardColors(containerColor = Color.White)) {
            Column(modifier = Modifier.padding(24.dp)) {
                Text("Add New Habit", fontSize = 20.sp, fontWeight = FontWeight.Bold, color = Color(0xFF1E40AF))
                Spacer(modifier = Modifier.height(16.dp))

                // Placeholder added here
                OutlinedTextField(
                    value = name,
                    onValueChange = { name = it },
                    label = { Text("Habit Name") },
                    placeholder = { Text("e.g. Reading") }
                )
                Spacer(modifier = Modifier.height(8.dp))
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    OutlinedTextField(
                        value = target,
                        onValueChange = { target = it },
                        label = { Text("Target") },
                        placeholder = { Text("2") },
                        modifier = Modifier.weight(1f)
                    )
                    OutlinedTextField(
                        value = unit,
                        onValueChange = { unit = it },
                        label = { Text("Unit") },
                        placeholder = { Text("hours") },
                        modifier = Modifier.weight(1f)
                    )
                }
                Spacer(modifier = Modifier.height(24.dp))
                Button(
                    onClick = { onConfirm(name, target.toFloatOrNull() ?: 1f, unit) },
                    modifier = Modifier.fillMaxWidth().height(48.dp),
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF0D6EFD)),
                    shape = RoundedCornerShape(24.dp)
                ) { Text("Create Goal", fontWeight = FontWeight.Bold) }
            }
        }
    }
}