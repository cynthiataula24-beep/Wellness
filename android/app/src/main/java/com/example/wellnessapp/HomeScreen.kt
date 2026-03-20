package com.example.wellnessapp

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun HomeScreen(userName: String, onNavigate: (String) -> Unit) {
    // Background Gradient
    val backgroundGradient = Brush.verticalGradient(
        colors = listOf(Color(0xFFDBEAFE), Color(0xFFBFDBFE))
    )

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(backgroundGradient)
            .verticalScroll(rememberScrollState())
            .padding(20.dp)
    ) {
        // Greeting Section
        Text(
            text = "Welcome back, $userName 🌟",
            fontSize = 28.sp,
            fontWeight = FontWeight.Bold,
            color = Color(0xFF1E40AF)
        )
        Text(
            text = "Here’s your wellness hub — quick access to all your supportive spaces.",
            fontSize = 16.sp,
            color = Color(0xFF3B82F6),
            modifier = Modifier.padding(top = 4.dp, bottom = 24.dp)
        )

        // Feature Cards
        WellnessCard(
            title = "Self Love",
            description = "Learn and practice self-love from the basics upward.",
            buttonText = "Start Self Love",
            buttonColor = Color(0xFFDC3545), // Bootstrap Danger
            icon = Icons.Default.Favorite,
            onClick = { onNavigate("self_love") }
        )

        WellnessCard(
            title = "Goals",
            description = "Track habits like hydration, sleep, and exercise.",
            buttonText = "View Goals",
            buttonColor = Color(0xFF198754), // Bootstrap Success
            icon = Icons.Default.CheckCircle,
            onClick = { onNavigate("goals") }
        )

        WellnessCard(
            title = "Wellness",
            description = "Explore articles, grounding exercises, and resources.",
            buttonText = "Explore Wellness",
            buttonColor = Color(0xFF0DCAF0), // Bootstrap Info
            icon = Icons.Default.Info,
            onClick = { onNavigate("tips") }
        )

        // Motivational Quote Card
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 24.dp),
            colors = CardDefaults.cardColors(containerColor = Color(0xFFE0F2FE)),
            shape = RoundedCornerShape(16.dp),
            border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFF93C5FD))
        ) {
            Text(
                text = "“You are enough, just as you are.” 💙",
                modifier = Modifier
                    .padding(24.dp)
                    .fillMaxWidth(),
                textAlign = TextAlign.Center,
                fontSize = 18.sp,
                fontStyle = FontStyle.Italic,
                color = Color(0xFF2563EB),
                fontWeight = FontWeight.Medium
            )
        }
    }
}

@Composable
fun WellnessCard(
    title: String,
    description: String,
    buttonText: String,
    buttonColor: Color,
    icon: ImageVector,
    onClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp),
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Color(0xFFF0F9FF)),
        border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFF93C5FD))
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(icon, contentDescription = null, tint = Color(0xFF1E3A8A))
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = title,
                    fontSize = 20.sp,
                    fontWeight = FontWeight.SemiBold,
                    color = Color(0xFF1E3A8A)
                )
            }
            Text(
                text = description,
                fontSize = 14.sp,
                color = Color(0xFF1E3A8A),
                modifier = Modifier.padding(vertical = 12.dp)
            )
            Button(
                onClick = onClick,
                colors = ButtonDefaults.buttonColors(containerColor = buttonColor),
                shape = RoundedCornerShape(12.dp)
            ) {
                Text(buttonText, color = if (buttonColor == Color(0xFFFFC107)) Color.Black else Color.White)
            }
        }
    }
}
