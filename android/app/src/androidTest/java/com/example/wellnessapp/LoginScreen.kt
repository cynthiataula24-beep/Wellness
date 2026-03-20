package com.example.wellnessapp


import android.widget.Toast
import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.animateDpAsState
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

// Define your CSS Colors here
val Blue600 = Color(0xFF3B82F6)
val Blue900 = Color(0xFF1E40AF)
val LightBlue = Color(0xFFDBEAFE)
val BackgroundGradient = Brush.linearGradient(listOf(Color(0xFFDBEAFE), Color(0xFFBFDBFE)))

@Composable
fun LoginScreen() {
    val context = LocalContext.current

    // --- State (Replaces useState) ---
    var isLogin by remember { mutableStateOf(true) }
    var email by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var regEmail by remember { mutableStateOf("") }
    var regPassword by remember { mutableStateOf("") }
    var displayName by remember { mutableStateOf("") }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(BackgroundGradient)
            .padding(20.dp),
        contentAlignment = Alignment.Center
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .background(Color.White, RoundedCornerShape(16.dp))
                .padding(bottom = 16.dp)
        ) {
            // Header Tabs (Replaces the "Split Box" logic for mobile)
            Row(modifier = Modifier.fillMaxWidth().height(60.dp)) {
                TabHeader(
                    text = "Sign Up",
                    isActive = !isLogin,
                    modifier = Modifier.weight(1f).clickable { isLogin = false }
                )
                TabHeader(
                    text = "Sign In",
                    isActive = isLogin,
                    modifier = Modifier.weight(1f).clickable { isLogin = true }
                )
            }

            // Form Content
            Column(
                modifier = Modifier.padding(24.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Text(
                    text = if (isLogin) "Welcome Back" else "Create Account",
                    fontSize = 24.sp,
                    fontWeight = FontWeight.ExtraBold,
                    color = Blue900
                )

                if (isLogin) {
                    // --- SIGN IN FORM ---
                    OutlinedTextField(
                        value = email,
                        onValueChange = { email = it },
                        label = { Text("Email") },
                        modifier = Modifier.fillMaxWidth()
                    )
                    OutlinedTextField(
                        value = password,
                        onValueChange = { password = it },
                        label = { Text("Password") },
                        visualTransformation = PasswordVisualTransformation(),
                        modifier = Modifier.fillMaxWidth()
                    )
                    Button(
                        onClick = { /* Handle Login Action */ },
                        modifier = Modifier.fillMaxWidth().height(50.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = Blue900),
                        shape = RoundedCornerShape(8.dp)
                    ) {
                        Text("Login")
                    }
                } else {
                    // --- SIGN UP FORM ---
                    OutlinedTextField(
                        value = displayName,
                        onValueChange = { displayName = it },
                        label = { Text("Name") },
                        modifier = Modifier.fillMaxWidth()
                    )
                    OutlinedTextField(
                        value = regEmail,
                        onValueChange = { regEmail = it },
                        label = { Text("Email") },
                        modifier = Modifier.fillMaxWidth()
                    )
                    OutlinedTextField(
                        value = regPassword,
                        onValueChange = { regPassword = it },
                        label = { Text("Password") },
                        visualTransformation = PasswordVisualTransformation(),
                        modifier = Modifier.fillMaxWidth()
                    )
                    Button(
                        onClick = { /* Handle Register Action */ },
                        modifier = Modifier.fillMaxWidth().height(50.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = Blue900),
                        shape = RoundedCornerShape(8.dp)
                    ) {
                        Text("Register")
                    }
                }
            }
        }
    }
}

@Composable
fun TabHeader(text: String, isActive: Boolean, modifier: Modifier) {
    val backgroundColor by animateColorAsState(if (isActive) Blue600 else Color.Transparent)
    val textColor by animateColorAsState(if (isActive) Color.White else Blue900)

    Box(
        modifier = modifier
            .fillMaxHeight()
            .background(backgroundColor),
        contentAlignment = Alignment.Center
    ) {
        Text(text = text, color = textColor, fontWeight = FontWeight.Bold)
    }
}