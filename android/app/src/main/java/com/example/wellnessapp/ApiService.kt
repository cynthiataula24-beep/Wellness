package com.example.wellnessapp

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
    }

