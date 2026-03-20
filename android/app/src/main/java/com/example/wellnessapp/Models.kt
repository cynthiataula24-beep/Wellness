package com.example.wellnessapp


// Data sent TO Flask
data class LoginRequest(val email: String, val password: String)
data class RegisterRequest(val email: String, val password: String, val display_name: String)
data class JournalEntry(val id: Int, val text: String, val date: String)

// Data received FROM Flask
data class UserData(
    val id: Int,
    val email: String,
    val display_name: String?,
    val profile_pic: String?
)

data class AuthResponse(
    val access_token: String,
    val user: UserData
)