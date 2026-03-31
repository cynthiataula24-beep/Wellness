package com.example.wellnessapp

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ChevronRight
import androidx.compose.material.icons.filled.CloudUpload
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Send
import androidx.compose.material3.*
import androidx.compose.material3.TabRowDefaults.tabIndicatorOffset
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.zIndex
import androidx.compose.material.icons.automirrored.filled.ArrowBack


// --- 2. MAIN ROADMAP SCREEN ---
@Composable
fun SelfLoveScreen(chapters: List<Chapter>, onWeekClick: (Week) -> Unit) {
    var selectedChapterIndex by remember { mutableIntStateOf(0) }
    val currentChapter = chapters[selectedChapterIndex]
    val scrollState = rememberScrollState()

    val deepBlue = Color(0xFF1E3A8A)
    val actionBlue = Color(0xFF3B82F6)
    val surfaceBlue = Color(0xFFF8FAFC)
    val inactiveTabGray = Color(0xFFE2E8F0)

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(surfaceBlue)
            .padding(horizontal = 20.dp)
            .verticalScroll(scrollState)
    ) {
        Spacer(modifier = Modifier.height(32.dp))
        Text(
            text = "Self Love Roadmap",
            fontSize = 26.sp,
            fontWeight = FontWeight.Bold,
            color = deepBlue
        )

        // Tab Bar for Chapters
        Spacer(modifier = Modifier.height(16.dp))
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(44.dp)
                .clip(RoundedCornerShape(50.dp))
                .background(inactiveTabGray.copy(alpha = 0.4f))
                .padding(4.dp)
        ) {
            TabRow(
                selectedTabIndex = selectedChapterIndex,
                containerColor = Color.Transparent,
                divider = {},
                indicator = { tabPositions ->
                    if (selectedChapterIndex < tabPositions.size) {
                        Box(
                            Modifier
                                .tabIndicatorOffset(tabPositions[selectedChapterIndex])
                                .fillMaxHeight()
                                .clip(RoundedCornerShape(50.dp))
                                .background(actionBlue)
                        )
                    }
                }
            ) {
                chapters.forEachIndexed { index, chapter ->
                    val isSelected = selectedChapterIndex == index
                    Tab(
                        selected = isSelected,
                        onClick = { selectedChapterIndex = index },
                        modifier = Modifier
                            .zIndex(1f)
                            .height(36.dp),
                        text = {
                            Text(
                                text = "Chapter ${chapter.id}",
                                fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium,
                                color = if (isSelected) Color.White else Color.DarkGray,
                                fontSize = 12.sp,
                                maxLines = 1
                            )
                        }
                    )
                }
            }
        }

        // Chapter Insight Card
        Spacer(modifier = Modifier.height(16.dp))
        Card(
            modifier = Modifier.fillMaxWidth(),
            colors = CardDefaults.cardColors(containerColor = actionBlue.copy(alpha = 0.05f)),
            shape = RoundedCornerShape(12.dp),
            border = androidx.compose.foundation.BorderStroke(1.dp, actionBlue.copy(alpha = 0.1f))
        ) {
            Row(modifier = Modifier.padding(12.dp), verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Default.Info, contentDescription = null, tint = actionBlue, modifier = Modifier.size(18.dp))
                Spacer(modifier = Modifier.width(10.dp))
                Column {
                    Text(text = currentChapter.title, fontSize = 15.sp, fontWeight = FontWeight.Bold, color = deepBlue)
                    Text(text = currentChapter.description, fontSize = 13.sp, color = Color.Gray)
                }
            }
        }

        // Week List
        Spacer(modifier = Modifier.height(12.dp))
        currentChapter.weeks.forEach { week ->
            WeekBarItem(week = week, onClick = { onWeekClick(week) })
            Spacer(modifier = Modifier.height(8.dp))
        }

        Spacer(modifier = Modifier.height(100.dp))
    }
}

// --- 3. WEEK ITEM COMPONENT ---
@Composable
fun WeekBarItem(week: Week, onClick: () -> Unit) {
    val deepBlue = Color(0xFF1E3A8A)
    val actionBlue = Color(0xFF3B82F6)

    Surface(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onClick() },
        shape = RoundedCornerShape(10.dp),
        color = Color.White,
        shadowElevation = 1.dp
    ) {
        Row(
            modifier = Modifier.padding(vertical = 14.dp, horizontal = 16.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text(text = week.title, fontSize = 16.sp, fontWeight = FontWeight.SemiBold, color = deepBlue)
            Icon(Icons.Default.ChevronRight, contentDescription = null, tint = actionBlue, modifier = Modifier.size(20.dp))
        }
    }
}

// --- 4. WEEK DETAIL SCREEN ---
@Composable
fun WeekDetailScreen(
    week: Week,
    onBack: () -> Unit,
    onSaveEntry: (Int, String) -> Unit,
    onSubmitReflection: (Map<String, String>) -> Unit
) {
    val scrollState = rememberScrollState()
    val deepBlue = Color(0xFF1E3A8A)
    val actionBlue = Color(0xFF3B82F6)

    val dayEntries = remember { mutableStateMapOf<Int, String>() }
    val reflectionAnswers = remember { mutableStateMapOf<String, String>() }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.White)
            .padding(horizontal = 20.dp)
            .verticalScroll(scrollState)
    ) {
        // --- NEW TOP NAVIGATION ROW ---
        Spacer(modifier = Modifier.height(16.dp))
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(onClick = onBack) {
                Icon(
                    imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                    contentDescription = "Back",
                    tint = deepBlue
                )
            }
            Text(
                text = "All Weeks",
                fontSize = 14.sp,
                color = deepBlue,
                modifier = Modifier.clickable { onBack() }
            )
        }
        // ------------------------------

        Spacer(modifier = Modifier.height(16.dp))
        Text(
            text = week.title,
            fontSize = 24.sp,
            fontWeight = FontWeight.Bold,
            color = deepBlue
        )
        Spacer(modifier = Modifier.height(16.dp))

        // 1. DAILY TASKS
        week.days.forEach { day ->
            Card(
                modifier = Modifier.fillMaxWidth().padding(vertical = 8.dp),
                colors = CardDefaults.cardColors(containerColor = Color(0xFFF8FAFC)),
                border = androidx.compose.foundation.BorderStroke(1.dp, Color(0xFFE2E8F0))
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(text = "Day ${day.day}: ${day.task}", fontWeight = FontWeight.Bold, color = deepBlue)
                    Text(text = day.instruction, fontSize = 13.sp, color = Color.Gray)
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(text = day.prompt, fontSize = 12.sp, fontWeight = FontWeight.SemiBold, color = actionBlue)

                    OutlinedTextField(
                        value = dayEntries[day.day] ?: "",
                        onValueChange = { dayEntries[day.day] = it },
                        modifier = Modifier.fillMaxWidth().padding(vertical = 8.dp),
                        placeholder = { Text("Write your thoughts here...", fontSize = 14.sp) },
                        shape = RoundedCornerShape(12.dp)
                    )

                    Button(
                        onClick = { onSaveEntry(day.day, dayEntries[day.day] ?: "") },
                        modifier = Modifier.align(Alignment.End),
                        colors = ButtonDefaults.buttonColors(containerColor = actionBlue)
                    ) {
                        Icon(Icons.Default.CloudUpload, null, modifier = Modifier.size(16.dp))
                        Spacer(Modifier.width(8.dp))
                        Text("Save & Sync", fontSize = 12.sp)
                    }
                }
            }
        }

        // 2. REFLECTION SECTION
        Spacer(modifier = Modifier.height(24.dp))
        Text("Weekly Reflection", fontSize = 20.sp, fontWeight = FontWeight.Bold, color = deepBlue)

        week.reflection.forEach { question ->
            Column(modifier = Modifier.padding(vertical = 8.dp)) {
                Text(text = question, fontSize = 14.sp, color = Color.DarkGray)
                OutlinedTextField(
                    value = reflectionAnswers[question] ?: "",
                    onValueChange = { reflectionAnswers[question] = it },
                    modifier = Modifier.fillMaxWidth(),
                    shape = RoundedCornerShape(12.dp)
                )
            }
        }

        // 3. SUBMIT TO AI
        Button(
            onClick = { onSubmitReflection(reflectionAnswers.toMap()) },
            modifier = Modifier
                .fillMaxWidth()
                .padding(top = 24.dp, bottom = 60.dp) // Extra bottom padding for breathing room
                .height(50.dp),
            colors = ButtonDefaults.buttonColors(containerColor = deepBlue)
        ) {
            Icon(Icons.Default.Send, null)
            Spacer(Modifier.width(8.dp))
            Text("Submit to AI Assistant")
        }
    }
}