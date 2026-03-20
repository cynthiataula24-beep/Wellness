package com.example.wellnessapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import androidx.navigation.compose.currentBackStackEntryAsState

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme {
                val navController = rememberNavController()
                var userName by remember { mutableStateOf("User") }

                Scaffold(
                    bottomBar = {
                        val navBackStackEntry by navController.currentBackStackEntryAsState()
                        val currentRoute = navBackStackEntry?.destination?.route

                        if (currentRoute != "login") { // hide bottom bar on login
                            NavigationBar(containerColor = Color.White) {
                                NavigationBarItem(
                                    icon = { Icon(Icons.Default.Home, contentDescription = "Home") },
                                    label = { Text("Home") },
                                    selected = currentRoute == "home",
                                    onClick = { navController.navigate("home") }
                                )
                                NavigationBarItem(
                                    icon = { Icon(Icons.Default.Edit, contentDescription = "Journal") },
                                    label = { Text("Journal") },
                                    selected = currentRoute == "journal",
                                    onClick = { navController.navigate("journal") }
                                )
                                NavigationBarItem(
                                    icon = { Icon(Icons.Default.Face, contentDescription = "Mood") },
                                    label = { Text("Mood") },
                                    selected = currentRoute == "mood",
                                    onClick = { navController.navigate("mood") }
                                )
                                NavigationBarItem(
                                    icon = { Icon(Icons.Default.Email, contentDescription = "Chat") },
                                    label = { Text("Chat") },
                                    selected = currentRoute == "chat",
                                    onClick = { navController.navigate("chat") }
                                )
                            }
                        }
                    }
                ) { paddingValues ->
                    NavHost(
                        navController = navController,
                        startDestination = "login",
                        modifier = Modifier.padding(paddingValues)
                    ) {
                        composable("login") {
                            LoginScreen(onLoginSuccess = { name ->
                                userName = name
                                navController.navigate("home") {
                                    popUpTo("login") { inclusive = true }
                                }
                            })
                        }
                        composable("home") {
                            HomeScreen(userName = userName, onNavigate = { route -> navController.navigate(route) })
                        }
                        composable("journal") { JournalScreen() }
                        composable("mood") { MoodScreen() }
                        composable("chat") { ChatScreen() }
                    }
                }
            }
        }
    }
}
