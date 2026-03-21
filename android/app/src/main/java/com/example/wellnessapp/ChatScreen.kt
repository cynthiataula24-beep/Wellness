package com.example.wellnessapp

import android.content.Context
import android.net.Uri
import android.widget.Toast
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Check
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material.icons.filled.Send
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import kotlinx.coroutines.launch
import okhttp3.ResponseBody
import retrofit2.Call
import retrofit2.Response
import java.text.SimpleDateFormat
import java.util.*



@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ChatScreen() {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    val prefs = context.getSharedPreferences("auth", Context.MODE_PRIVATE)
    val token = prefs.getString("access_token", null)

    var assistantName by remember { mutableStateOf("Haven") }
    var isEditingName by remember { mutableStateOf(false) }
    var assistantPicUri by remember { mutableStateOf<String?>(null) }
    var messages by remember { mutableStateOf(listOf<ChatMessage>()) }
    var input by remember { mutableStateOf("") }
    var isTyping by remember { mutableStateOf(false) }

    val scrollState = rememberScrollState()

    // --- Helper: Save Message to DB ---
    fun saveMessageToDb(msg: ChatMessage) {
        if (token == null) return
        RetrofitClient.instance.saveChatMessage("Bearer $token", msg)
            .enqueue(object : retrofit2.Callback<ResponseBody> {
                override fun onResponse(call: Call<ResponseBody>, response: Response<ResponseBody>) {}
                override fun onFailure(call: Call<ResponseBody>, t: Throwable) {
                    println("Failed to sync message: ${t.message}")
                }
            })
    }

    // --- 1. Load Settings & History on Start (Consistency Fix) ---
    LaunchedEffect(token) {
        if (token == null) return@LaunchedEffect

        // Load Assistant Settings
        RetrofitClient.instance.getAssistantSettings("Bearer $token")
            .enqueue(object : retrofit2.Callback<AssistantSettingsResponse> {
                override fun onResponse(call: Call<AssistantSettingsResponse>, response: Response<AssistantSettingsResponse>) {
                    if (response.isSuccessful) {
                        response.body()?.let {
                            assistantName = it.assistantName ?: "Haven"
                            assistantPicUri = it.assistantPic
                        }
                    }
                }
                override fun onFailure(call: Call<AssistantSettingsResponse>, t: Throwable) {}
            })

        // Load Chat History
        RetrofitClient.instance.getChatHistory("Bearer $token")
            .enqueue(object : retrofit2.Callback<List<ChatMessage>> {
                override fun onResponse(call: Call<List<ChatMessage>>, response: Response<List<ChatMessage>>) {
                    if (response.isSuccessful) {
                        messages = response.body() ?: emptyList()
                    }
                }
                override fun onFailure(call: Call<List<ChatMessage>>, t: Throwable) {}
            })
    }

    // --- 2. Auto-scroll to bottom ---
    LaunchedEffect(messages.size, isTyping) {
        scrollState.animateScrollTo(scrollState.maxValue)
    }

    val imagePicker = rememberLauncherForActivityResult(ActivityResultContracts.GetContent()) { uri ->
        uri?.let { /* Logic for uploading image to backend should go here */ }
    }

    fun formatDateGroup(date: Long): String =
        SimpleDateFormat("EEE MMM dd yyyy", Locale.getDefault()).format(Date(date))

    fun sendMessage() {
        if (input.isBlank() || token == null) return
        val userMsg = ChatMessage(
            text = input,
            sender = "user",
            timestamp = System.currentTimeMillis(),
            dateGroup = formatDateGroup(System.currentTimeMillis())
        )

        // Update UI & Sync User Message
        val updatedLocal = messages + userMsg
        messages = updatedLocal
        input = ""
        saveMessageToDb(userMsg)

        // Get AI Reply
        isTyping = true
        RetrofitClient.instance.sendChat("Bearer $token", ChatRequest(updatedLocal))
            .enqueue(object : retrofit2.Callback<ChatResponse> {
                override fun onResponse(call: Call<ChatResponse>, response: Response<ChatResponse>) {
                    isTyping = false
                    if (response.isSuccessful) {
                        val aiMsg = ChatMessage(
                            text = response.body()?.reply ?: "I'm here with you.",
                            sender = "ai",
                            timestamp = System.currentTimeMillis(),
                            dateGroup = formatDateGroup(System.currentTimeMillis())
                        )
                        messages = messages + aiMsg
                        saveMessageToDb(aiMsg) // Sync AI Message
                    }
                }
                override fun onFailure(call: Call<ChatResponse>, t: Throwable) {
                    isTyping = false
                }
            })
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        AsyncImage(
                            model = assistantPicUri ?: R.drawable.default_profile,
                            contentDescription = "Avatar",
                            modifier = Modifier.size(40.dp).clip(CircleShape).clickable { imagePicker.launch("image/*") }
                        )
                        Spacer(modifier = Modifier.width(12.dp))
                        if (isEditingName) {
                            TextField(
                                value = assistantName,
                                onValueChange = { assistantName = it },
                                singleLine = true,
                                modifier = Modifier.width(150.dp),
                                colors = TextFieldDefaults.colors(unfocusedContainerColor = Color.Transparent)
                            )
                            IconButton(onClick = { isEditingName = false /* Add API call to update name */ }) {
                                Icon(Icons.Default.Check, "Save", tint = Color.White)
                            }
                        } else {
                            Text(assistantName, color = Color.White, fontWeight = FontWeight.Bold)
                            IconButton(onClick = { isEditingName = true }) {
                                Icon(Icons.Default.Edit, "Edit", tint = Color.White, modifier = Modifier.size(16.dp))
                            }
                        }
                    }
                },
                actions = {
                    IconButton(onClick = { /* Add API call to DELETE /chat_history */ messages = emptyList() }) {
                        Icon(Icons.Default.Delete, "Clear", tint = Color.White)
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = Color(0xFF343A40))
            )
        }
    ) { padding ->
        Column(modifier = Modifier.fillMaxSize().background(Color(0xFFFDFDFD)).padding(padding)) {
            // --- Chat Area ---
            Column(
                modifier = Modifier.weight(1f).verticalScroll(scrollState).padding(horizontal = 16.dp)
            ) {
                val grouped = messages.groupBy { it.dateGroup }
                grouped.forEach { (date, msgs) ->
                    // Date Separator (Web-style)
                    Box(Modifier.fillMaxWidth().padding(vertical = 16.dp), contentAlignment = Alignment.Center) {
                        Surface(color = Color(0xFFF1F1F1), shape = CircleShape) {
                            Text(date, modifier = Modifier.padding(horizontal = 12.dp, vertical = 4.dp), fontSize = 11.sp, color = Color.Gray)
                        }
                    }

                    msgs.forEach { msg ->
                        val isUser = msg.sender == "user"
                        Column(
                            modifier = Modifier.fillMaxWidth().padding(vertical = 4.dp),
                            horizontalAlignment = if (isUser) Alignment.End else Alignment.Start
                        ) {
                            Surface(
                                color = if (isUser) Color(0xFF007BFF) else Color.White,
                                shape = androidx.compose.foundation.shape.RoundedCornerShape(
                                    topStart = 15.dp, topEnd = 15.dp,
                                    bottomStart = if (isUser) 15.dp else 0.dp,
                                    bottomEnd = if (isUser) 0.dp else 15.dp
                                ),
                                shadowElevation = 1.dp,
                                border = if (isUser) null else androidx.compose.foundation.BorderStroke(1.dp, Color(0xFFEEEEEE))
                            ) {
                                Column(modifier = Modifier.padding(12.dp).widthIn(max = 280.dp)) {
                                    Text(msg.text, color = if (isUser) Color.White else Color.Black, fontSize = 15.sp)
                                    Text(
                                        SimpleDateFormat("HH:mm", Locale.getDefault()).format(Date(msg.timestamp)),
                                        fontSize = 10.sp,
                                        color = if (isUser) Color.White.copy(0.6f) else Color.Gray,
                                        modifier = Modifier.align(Alignment.End).padding(top = 4.dp)
                                    )
                                }
                            }
                        }
                    }
                }
                if (isTyping) {
                    Text("$assistantName is typing...", modifier = Modifier.padding(8.dp), color = Color.Gray, fontSize = 12.sp)
                }
            }

            // --- Input Area ---
            Surface(tonalElevation = 2.dp, modifier = Modifier.fillMaxWidth()) {
                Row(modifier = Modifier.padding(12.dp), verticalAlignment = Alignment.CenterVertically) {
                    OutlinedTextField(
                        value = input,
                        onValueChange = { input = it },
                        placeholder = { Text("Message $assistantName...") },
                        modifier = Modifier.weight(1f),
                        shape = CircleShape,
                        maxLines = 4
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    FloatingActionButton(
                        onClick = { sendMessage() },
                        modifier = Modifier.size(48.dp),
                        containerColor = Color(0xFF007BFF),
                        contentColor = Color.White,
                        shape = CircleShape
                    ) {
                        Icon(Icons.Default.Send, "Send", modifier = Modifier.size(20.dp))
                    }
                }
            }
        }
    }
}