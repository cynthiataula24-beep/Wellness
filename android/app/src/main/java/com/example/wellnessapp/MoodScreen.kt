package com.example.wellnessapp

import android.content.Context
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Timeline
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.media3.common.Timeline
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

@Composable
fun MoodScreen() {
    val context = LocalContext.current
    val prefs = context.getSharedPreferences("auth", Context.MODE_PRIVATE)
    val token = prefs.getString("access_token", "") ?: ""

    var moodText by remember { mutableStateOf("") }
    var moodHistory by remember { mutableStateOf<List<MoodLog>>(emptyList()) }
    var latestResult by remember { mutableStateOf<MoodLog?>(null) }
    var isLoading by remember { mutableStateOf(false) }

    LaunchedEffect(token) {
        if (token.isNotEmpty()) {
            RetrofitClient.instance.getMoodHistory("Bearer $token")
                .enqueue(object : Callback<List<MoodLog>> {
                    override fun onResponse(call: Call<List<MoodLog>>, response: Response<List<MoodLog>>) {
                        if (response.isSuccessful) moodHistory = response.body() ?: emptyList()
                    }
                    override fun onFailure(call: Call<List<MoodLog>>, t: Throwable) {}
                })
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFFF8FAFC))
            .padding(16.dp)
    ) {
        Text("Mood Tracker", fontSize = 28.sp, fontWeight = FontWeight.Bold, color = Color(0xFF1E3A8A))
        Spacer(modifier = Modifier.height(16.dp))

        // --- Input Section ---
        OutlinedTextField(
            value = moodText,
            onValueChange = { moodText = it },
            modifier = Modifier.fillMaxWidth(),
            placeholder = { Text("How are you feeling today?") },
            shape = RoundedCornerShape(12.dp),
            colors = OutlinedTextFieldDefaults.colors(focusedContainerColor = Color.White, unfocusedContainerColor = Color.White)
        )

        Button(
            onClick = {
                if (moodText.isBlank() || token.isEmpty()) return@Button
                isLoading = true
                RetrofitClient.instance.analyzeMood("Bearer $token", MoodRequest(moodText))
                    .enqueue(object : Callback<MoodLog> {
                        override fun onResponse(call: Call<MoodLog>, response: Response<MoodLog>) {
                            isLoading = false
                            if (response.isSuccessful) {
                                val newLog = response.body()
                                latestResult = newLog
                                if (newLog != null) moodHistory = listOf(newLog) + moodHistory
                                moodText = ""
                            }
                        }
                        override fun onFailure(call: Call<MoodLog>, t: Throwable) { isLoading = false }
                    })
            },
            modifier = Modifier.padding(vertical = 8.dp).align(Alignment.End),
            enabled = !isLoading,
            shape = RoundedCornerShape(8.dp)
        ) {
            Text(if (isLoading) "Analyzing..." else "Check My Mood")
        }

        // --- AI Result Card ---
        latestResult?.let { result ->
            Card(
                colors = CardDefaults.cardColors(containerColor = Color(0xFFE0F2FE)),
                modifier = Modifier.fillMaxWidth().padding(bottom = 16.dp)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text("Current Vibe: ${result.emotion.uppercase()}", fontWeight = FontWeight.Bold, color = Color(0xFF0369A1))
                    Text(result.recommendation, fontSize = 14.sp, color = Color.DarkGray)
                }
            }
        }

        // --- Better Section Header for Trend ---
        Row(verticalAlignment = Alignment.CenterVertically) {
            Icon(Icons.Default.Timeline, contentDescription = null, tint = Color(0xFF1E3A8A), modifier = Modifier.size(20.dp))
            Spacer(modifier = Modifier.width(8.dp))
            Text("Weekly Sentiment Trend", fontSize = 18.sp, fontWeight = FontWeight.Bold, color = Color(0xFF334155))
        }

        Spacer(modifier = Modifier.height(12.dp))

        // --- Line Graph Visualization ---
        MoodLineGraph(moodHistory)

        HorizontalDivider(modifier = Modifier.padding(vertical = 20.dp), color = Color(0xFFE2E8F0))

        Text("Recent History", fontSize = 18.sp, fontWeight = FontWeight.Bold, color = Color(0xFF334155))
        Spacer(modifier = Modifier.height(8.dp))

        LazyColumn(
            modifier = Modifier.weight(1f),
            verticalArrangement = Arrangement.spacedBy(10.dp),
            contentPadding = PaddingValues(bottom = 16.dp)
        ) {
            items(moodHistory) { item -> MoodHistoryItem(item) }
        }
    }
}

@Composable
fun MoodLineGraph(history: List<MoodLog>) {
    val dataPoints = history.take(7).reversed()
    if (dataPoints.isEmpty()) {
        Box(Modifier.fillMaxWidth().height(120.dp).background(Color(0xFFF1F5F9), RoundedCornerShape(12.dp)), contentAlignment = Alignment.Center) {
            Text("No trend data yet", color = Color.Gray, fontSize = 12.sp)
        }
        return
    }

    Canvas(
        modifier = Modifier
            .fillMaxWidth()
            .height(120.dp)
            .background(Color.White, RoundedCornerShape(12.dp))
            .padding(top = 16.dp, bottom = 8.dp, start = 12.dp, end = 12.dp)
    ) {
        val width = size.width
        val height = size.height
        val spacing = width / (dataPoints.size.coerceAtLeast(2) - 1)

        // Draw Neutral Center Line
        drawLine(color = Color(0xFFCBD5E1), start = androidx.compose.ui.geometry.Offset(0f, height / 2), end = androidx.compose.ui.geometry.Offset(width, height / 2), strokeWidth = 1f)

        val path = Path().apply {
            dataPoints.forEachIndexed { i, log ->
                val x = i * spacing
                val y = ((1.0 - log.compound) / 2.0 * height).toFloat().coerceIn(0f, height)
                if (i == 0) moveTo(x, y) else lineTo(x, y)
            }
        }

        drawPath(path = path, color = Color(0xFF3B82F6), style = Stroke(width = 5f))

        // Draw Circles for points
        dataPoints.forEachIndexed { i, log ->
            val x = i * spacing
            val y = ((1.0 - log.compound) / 2.0 * height).toFloat().coerceIn(0f, height)
            drawCircle(color = if (log.compound >= 0) Color(0xFF4ADE80) else Color(0xFFF87171), radius = 8f, center = androidx.compose.ui.geometry.Offset(x, y))
        }
    }
}

@Composable
fun MoodHistoryItem(log: MoodLog) {
    val accentColor = when (log.emotion.lowercase()) {
        "happy" -> Color(0xFF4ADE80)
        "sad" -> Color(0xFF60A5FA)
        "angry" -> Color(0xFFF87171)
        else -> Color(0xFFA3A3A3)
    }

    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(12.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        elevation = CardDefaults.cardElevation(1.dp)
    ) {
        Row(modifier = Modifier.height(IntrinsicSize.Min)) {
            Box(modifier = Modifier.width(5.dp).fillMaxHeight().background(accentColor))
            Column(modifier = Modifier.padding(12.dp)) {
                Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                    Text(text = log.emotion.uppercase(), fontSize = 11.sp, fontWeight = FontWeight.Bold, color = accentColor)
                    Text(text = log.date.take(10), fontSize = 11.sp, color = Color.Gray)
                }
                Text(text = log.text, fontSize = 14.sp, fontWeight = FontWeight.Medium, color = Color(0xFF1E293B), maxLines = 1)
            }
        }
    }
}