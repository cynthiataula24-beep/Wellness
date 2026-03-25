package com.example.wellnessapp

import android.content.Intent
import android.net.Uri
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
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
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun HelpScreen() {
    val context = LocalContext.current
    val scrollState = rememberScrollState()

    // Web App Colors
    val deepBlue = Color(0xFF063FF8)
    val emergencyRed = Color(0xFFEF4444)
    val lightBlueText = Color(0xFFDBEAFE)
    val communityBlue = Color(0xFFA5D8FF)
    val professionalGreen = Color(0xFFB2F2BB)
    val dividerColor = Color(0x33FFFFFF) // White with 20% opacity

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(deepBlue)
            .verticalScroll(scrollState)
            .padding(24.dp)
    ) {
        // --- Emergency Support Section ---
        SectionHeader(
            title = "Immediate Help",
            icon = Icons.Default.Favorite, // Closest to FaHeartbeat
            titleColor = Color(0xFFFF8787)
        )
        Text(
            text = "If you or someone you know is in immediate danger, please contact emergency services or use these hotlines:",
            color = lightBlueText,
            fontSize = 14.sp,
            lineHeight = 20.sp,
            modifier = Modifier.padding(bottom = 16.dp)
        )

        // Emergency Buttons
        Button(
            onClick = {
                val intent = Intent(Intent.ACTION_DIAL, Uri.parse("tel:988"))
                context.startActivity(intent)
            },
            modifier = Modifier.fillMaxWidth().height(50.dp),
            colors = ButtonDefaults.buttonColors(containerColor = emergencyRed),
            shape = RoundedCornerShape(8.dp)
        ) {
            Icon(Icons.Default.Phone, contentDescription = null, modifier = Modifier.size(18.dp))
            Spacer(Modifier.width(8.dp))
            Text("988 Crisis Lifeline", fontWeight = FontWeight.Bold)
        }

        Spacer(Modifier.height(12.dp))

        OutlinedButton(
            onClick = {
                val intent = Intent(Intent.ACTION_VIEW, Uri.parse("https://www.crisistextline.org/"))
                context.startActivity(intent)
            },
            modifier = Modifier.fillMaxWidth().height(50.dp),
            shape = RoundedCornerShape(8.dp),
            border = androidx.compose.foundation.BorderStroke(1.dp, Color(0x66FFFFFF)),
            colors = ButtonDefaults.outlinedButtonColors(contentColor = Color.White)
        ) {
            Icon(Icons.Default.Email, contentDescription = null, modifier = Modifier.size(18.dp))
            Spacer(Modifier.width(8.dp))
            Text("Text HOME to 741741")
        }

        // --- Community Support Section ---
        Spacer(Modifier.height(40.dp))
        SectionHeader(
            title = "Community Support",
            icon = Icons.Default.Groups,
            titleColor = communityBlue
        )
        HelpLinkItem("Peer Support Groups") { /* Navigate to groups */ }
        HelpLinkItem("Discussion Forums") { /* Navigate to forums */ }
        HelpLinkItem("Wellness Mentors") { /* Navigate to mentors */ }

        // --- Professional Resources Section ---
        Spacer(Modifier.height(40.dp))
        SectionHeader(
            title = "Professional Help",
            icon = Icons.Default.Person,
            titleColor = professionalGreen
        )
        HelpLinkItem("Find a Therapist") {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse("https://www.psychologytoday.com"))
            context.startActivity(intent)
        }
        HelpLinkItem("Telehealth Consult") { /* Navigate */ }
        HelpLinkItem("Mental Health Toolkit") { /* Navigate */ }

        // --- Bottom Bar / Footer ---
        Spacer(Modifier.height(48.dp))
        Divider(color = dividerColor, thickness = 1.dp)
        Spacer(Modifier.height(24.dp))

        Text(
            text = "© 2026 Haven Wellness.\nYou are not alone.",
            color = Color(0xFF93C5FD),
            fontSize = 13.sp,
            textAlign = TextAlign.Center,
            modifier = Modifier.fillMaxWidth()
        )

        Row(
            modifier = Modifier.fillMaxWidth().padding(top = 16.dp, bottom = 40.dp),
            horizontalArrangement = Arrangement.Center,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text("Privacy Policy", color = Color(0xFFBFDBFE), fontSize = 13.sp, modifier = Modifier.clickable {  })
            Text("  •  ", color = dividerColor)
            Text("Terms of Service", color = Color(0xFFBFDBFE), fontSize = 13.sp, modifier = Modifier.clickable {  })
        }
    }
}

@Composable
fun SectionHeader(title: String, icon: ImageVector, titleColor: Color) {
    Row(
        verticalAlignment = Alignment.CenterVertically,
        modifier = Modifier.padding(bottom = 12.dp)
    ) {
        Icon(icon, contentDescription = null, tint = titleColor, modifier = Modifier.size(20.dp))
        Spacer(Modifier.width(8.dp))
        Text(
            text = title,
            color = Color.White,
            fontSize = 18.sp,
            fontWeight = FontWeight.Bold
        )
    }
}

@Composable
fun HelpLinkItem(label: String, onClick: () -> Unit) {
    Text(
        text = label,
        color = Color(0xFFBFDBFE),
        fontSize = 15.sp,
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onClick() }
            .padding(vertical = 8.dp)
    )
}