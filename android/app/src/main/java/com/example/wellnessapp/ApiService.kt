package com.example.wellnessapp

import okhttp3.ResponseBody
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.POST
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.Path

interface ApiService {
    @POST("auth/login")
    fun login(@Body request: LoginRequest): Call<AuthResponse>

    @POST("auth/register")
    fun register(@Body request: RegisterRequest): Call<AuthResponse>

    // ✅ Journal endpoints now require Authorization
    @GET("get_journal")
    fun getJournalEntries(@Header("Authorization") token: String): Call<List<JournalEntry>>

    @POST("save_journal")
    fun saveJournalEntry(@Header("Authorization") token: String, @Body entry: JournalEntry): Call<Void>


    @DELETE("delete_journal/{id}")
        fun deleteJournalEntry(
            @Header("Authorization") token: String,
            @Path("id") id: Int
        ): Call<Void>

        @DELETE("clear_journal")
        fun clearJournal(
            @Header("Authorization") token: String
        ): Call<Void>



    @DELETE("clear_chat")
    fun clearChat(
        @Header("Authorization") token: String
    ): Call<Void>


    // FIXES: Unresolved reference: getAssistantSettings
    @GET("assistant_settings")
    fun getAssistantSettings(
        @Header("Authorization") token: String
    ): Call<AssistantSettingsResponse>

    // FIXES: Unresolved reference: getChatHistory
    @GET("chat_history")
    fun getChatHistory(
        @Header("Authorization") token: String
    ): Call<List<ChatMessage>>

    @POST("chat_history")
    fun saveChatMessage(
        @Header("Authorization") token: String,
        @Body message: ChatMessage
    ): Call<ResponseBody>

    @POST("chat")
    fun sendChat(
        @Header("Authorization") token: String,
        @Body request: ChatRequest
    ): Call<ChatResponse>

    @DELETE("chat_history")
    fun clearChatHistory(
        @Header("Authorization") token: String
    ): Call<ResponseBody>
}


// Matches AssistantSettings.to_dict()
data class AssistantSettingsResponse(
    val assistantName: String?,
    val assistantPic: String?
)

// Matches ChatMessage.to_dict()
data class ChatMessage(
    val text: String,
    val sender: String, // "user" or "ai"
    val timestamp: Long,
    val dateGroup: String
)

// For the POST /chat request
data class ChatRequest(
    val messages: List<ChatMessage>
)

// For the POST /chat response
data class ChatResponse(
    val reply: String
)