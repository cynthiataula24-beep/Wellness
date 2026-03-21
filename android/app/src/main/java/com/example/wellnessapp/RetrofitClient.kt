package com.example.wellnessapp



import retrofit2.Call
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.DELETE
import retrofit2.http.Header
import retrofit2.http.Path


object RetrofitClient {
    // USE YOUR COMPUTER'S IP (e.g., 192.168.1.5) IF ON PHYSICAL PHONE
    // USE 10.0.2.2 IF ON EMULATOR
    private const val BASE_URL = "http://192.168.1.132:5000/"

    val instance: ApiService by lazy {
        val retrofit = Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
        retrofit.create(ApiService::class.java)


    }







}