# Miha - Product Requirements Document (Enhanced)

---

## 1. Vision & Principles

**Vision:**  
Build the social layer of everyday effort. Miha turns each workout or positive habit into a proud, judgment-free daily post that fuels accountability via streaks and community.

**Product Principles:**
- **Effort > Aesthetics:** We reward showing up, not perfection. A quick selfie after a walk or a screenshot of a finished workout is more valuable than a heavily edited gym photo.  
- **Kind Accountability:** Our community thrives on friendly nudges and genuine support. We're a cheer squad, not a competition.  
- **Daily Ritual:** The core loop is designed to be completed in less than 30 seconds. It's about a quick, satisfying check-in that fits seamlessly into your day.  
- **Privacy-First:** Users have granular control over who sees their posts and personal information. We respect and protect their data.  
- **Zero Friction:** The posting flow is a one-tap process—camera → post → streak—making it incredibly simple to maintain consistency.  

---

## 2. The Problem & The Power of Social Proof

**The Problem:**  
The fitness journey is often a lonely one. Motivation wanes, and without a reliable support system, even the best intentions can fail. Many social platforms focus on aspirational, "finish-line" content, which can feel intimidating and discouraging for people just starting out. There's no dedicated space to share and celebrate the small, daily acts of effort that truly build a consistent habit.

**The Solution:**  
Miha is a streak-driven, fitness-first social app that leverages the power of social accountability and social proof to keep users engaged and consistent. By posting daily proof of effort, users not only track their personal progress but also contribute to a collective environment of positive action.  

Each user's post, no matter how small, serves as a ripple effect—a **"butterfly effect" of motivation**—inspiring their followers and the wider community to show up and keep their own streaks alive.  

---

## 3. Target Users & Their Needs

**Target Users:**  
Our core audience is the "everyday mover" and the "status tracker"—individuals who find satisfaction in tracking their progress and celebrating small wins.

- **Everyday Movers:** Simple daily activities like walks, home workouts, or yoga. Motivated by consistency over intensity.  
- **Lifestyle Changers:** Weight-loss or habit-building journeys, needing a supportive, non-judgmental community.  
- **Beginner to Intermediate Gym-Goers:** Building a habit, wanting to share progress without pressure.  
- **Status Trackers (critical segment):** Love streaks, badges, progress bars. Motivated by visual representation of effort and fear of breaking streaks. Highly responsive to positive reinforcement and visual feedback.  

**Jobs To Be Done (JTBD):**
1. When I finish a workout, I want to quickly log proof and keep my streak so I can stay consistent.  
2. When my motivation dips, I want supportive nudges and accountability from my friends so I don’t fall off.  
3. When I'm curious, I want to see others’ daily efforts to feel part of a collective journey.  

---

## 4. Core Use Cases & Current App Flow

### **Current App Structure (Miha)**
Miha maintains the familiar social media interface while transforming it into a fitness-focused platform:

- **Bottom Tab Navigation:** Home, Explore, Reels, Chat
- **Streak Circles:** Color-coded circles showing fitness journey levels (replacing traditional story avatars)
- **Feed System:** Streak-based content discovery where users see posts from others at their fitness level
- **Social Features:** Maintains existing like, comment, and share functionality

### **Core Use Cases**
- **Daily Check-in:** Capture/upload workout proof → optional caption → post. Foundation of streaks.  
- **Streak Tracking:** Visual streak system with color-coded levels and progress indicators
- **Streak-Based Feeds:** Content discovery based on fitness journey level (Newcomer, Rising, Committed, etc.)
- **Social Interaction:** Emoji reactions, comments, and community support through existing social features

### **Current App Screens**
1. **Home Screen:** Streak circles + feed from users at your fitness level
2. **Explore Screen:** Discover new fitness content and users
3. **Reels Screen:** Workout videos and fitness content
4. **Chat Screen:** Community messaging and support

**Non-goals (MVP):**  
- Complex workout tracking
- Advanced analytics dashboards  
- Heavy comment threads
- Workout plan creation  

---

## 5. Feature Set (Current Implementation)

### 5.1 Current Features (Miha)

- **Authentication:**  
  Login/Signup screens with email validation (currently bypassed for development)

- **Progressive Streak System:**  
  - **Sequential Streak Numbers:** Streak 1, Streak 2, Streak 3, etc. (not activity-specific)
  - **Progressive Unlock System:** Each streak unlocks the next day by completing daily goals
  - **Locked Streaks:** Future streaks are padlocked until user completes daily goal
  - **Color-Coded Progression:** Blue ORA for Streak 1, red for milestone streaks (10, 20, 30, etc.)
  - **Progression Emojis:** Dynamic emoji indicators showing streak progression (🎯🔥💪⚡🚀⭐🌟👑💎🏆🎉🎊🎆🏅)
  - **Interactive Modal:** Tap locked streaks to see unlock requirements and "Complete Daily Goal" button
  - **Premium Streak Unlock:** Pay to unlock future streaks ahead of schedule
  - **Streak Unlock Packages:** Unlock 5 or 10 streaks (£2.49-£4.49)
  - **Miha+ Subscription:** Subscribe for unlimited streak access (£8.99/month)
  - **Premium Modal Design:** Monetization options integrated into locked streak popup

- **Streak Circle Features:**  
  - **Add Story Circle:** First circle for creating new posts
  - **Current Streak Circle:** User's active streak with progression emoji
  - **Locked Streak Circles:** Future streaks with padlock icons and "LOCKED" text
  - **Streak Level Indicators:** Small badges showing streak level numbers
  - **Lock Indicators:** Padlock icons in top-right corner for locked streaks

- **Modal System:**  
  - **X Close Button:** Top-right corner close button
  - **Swipe-Down Gesture:** Swipe down to close modal
  - **Swipe Indicator:** Visual bar at top showing swipe capability
  - **Locked Streak Messages:** Special messages for locked streaks with unlock instructions
  - **Complete Daily Goal Button:** Direct navigation to AddStoryScreen
  - **Premium Unlock Options:** Pay to unlock future streaks ahead of schedule
  - **Streak Packages:** Unlock 5 or 10 streaks (£2.49-£4.49)
  - **Subscription Integration:** Monthly subscription for unlimited streak access (£8.99/month)

- **Bottom Tab Navigation:**  
  - **Home:** Streak circles + fitness feed
  - **Explore:** Discover fitness content and users
  - **Reels:** Workout videos and fitness content
  - **Chat:** Community messaging

- **Posting Flow:**  
  - Add Story screen for workout proof
  - New Post screen for regular posts
  - Camera integration for quick capture

- **Feed System:**  
  - Streak-based content discovery
  - Posts from users at similar fitness levels
  - Like, comment, and share functionality

- **Social Features:**  
  - User profiles with fitness information
  - Follow/unfollow system
  - Real-time messaging
  - Notification system
  - **Online Indicators:** Green dots on user avatars showing online status
  - **Reaction Bar System:** Long-press heart icon to show 5 common emojis + plus icon for emoji keyboard. Emoji selection acts as a "like" with that emoji, persists until unpress

- **Visual Design:**  
  - Dark theme with fitness-focused colors
  - Smooth animations and transitions
  - London-based location data
  - Miha branding throughout  

---

### 5.2 Future Enhancements (Phase 2)

- **Advanced Streak System:**  
  - 24h window with grace periods
  - Streak insurance (1 manual save / 30 days)
  - Milestone badges and celebrations

- **Enhanced Feeds:**  
  - Algorithm-based content ranking
  - Filter by activity type and streak length
  - Advanced discovery features

- **Integrations:**  
  - Apple Health, Strava, Garmin integration
  - Auto-attach workout summaries
  - Health data synchronization

- **Gamification:**  
  - Advanced badges and achievements
  - Seasonal challenges and events
  - Leaderboards and competitions

- **Monetization Features:**  
  - **Premium Streak Unlock System:** Pay to unlock future streaks ahead
  - **Streak Unlock Packages:** Unlock 5 or 10 streaks (£2.49-£4.49)
  - **Miha+ Subscription:** Monthly subscription for unlimited access (£8.99/month)
  - **Subscription Management:** Monthly/yearly subscription options
  - **Payment Integration:** Stripe/Apple Pay/Google Pay integration
  - **Premium Analytics:** Advanced streak insights for subscribers

### 5.3 Future Scaling (Phase 3)

- **Premium Features:**  
  - Unlimited streak insurance
  - Custom reminders and insights
  - Advanced analytics dashboard

- **Partnerships:**  
  - Sponsored challenges
  - Gym and brand partnerships
  - Creator tools and monetization  

---

## 6. Success Metrics (OKRs)

- **Activation:** ≥70% first post within 24h of sign-up.  
- **Engagement:** DAU/WAU ≥45%. Median time-to-post <30s.  
- **Streak Health:** Day-7 retention ≥40%, Day-30 ≥20%.  
- **Social:** ≥3 reactions/post, ≥30% users with ≥5 friends.  
- **Virality:** K-factor ≥0.2, invite → signup CVR ≥20%.  
- **Monetization (post-MVP):** 3–5% free-to-premium conversion.  

---

## 7. Experience Requirements & Current Implementation

### 7.1 Current App Flow
- **Navigation:** Smooth bottom tab navigation between Home, Explore, Reels, Chat
- **Streak Circles:** Visual representation of fitness journey levels with color coding
- **Posting:** Quick access to Add Story and New Post screens
- **Social Interaction:** Like, comment, share functionality maintained

### 7.2 Progressive Streak System (Current)
- **Sequential Numbering:** Streak 1, Streak 2, Streak 3, etc. (not activity-specific)
- **Progressive Unlock:** Each streak unlocks by completing daily goals
- **Locked State:** Future streaks show padlock icons and "LOCKED" text
- **Color Progression:** Blue ORA for Streak 1, red for milestones (10, 20, 30, etc.)
- **Progression Emojis:** Dynamic emoji indicators (🎯🔥💪⚡🚀⭐🌟👑💎🏆🎉🎊🎆🏅)
- **Interactive Modals:** Tap locked streaks for unlock instructions
- **Daily Goal Integration:** "Complete Daily Goal" button navigates to AddStoryScreen

### 7.3 Social Features (Current)
- **Real-time Updates:** Feed refreshes and updates in real time
- **User Profiles:** Detailed profiles with fitness information
- **Messaging:** Real-time chat functionality
- **Notifications:** Push notifications for social interactions

### 7.4 Future Streak Logic (Phase 2)
- **24h Window:** Streak increments with ≥1 post / 24h
- **Grace Period:** Clear countdown display for grace periods
- **At-risk Alerts:** Banner and email notifications for at-risk streaks
- **Insurance System:** Manual save option (1 per 30 days)  

---

## 8. Information Architecture & Data Model

**Users:**  
`id, username, display_name, email, password, bio, avatar_url, timezone, privacy_setting (Public | Friends-only)`

**Posts:**  
`id, user_id, media_url, caption, created_at, visibility, streak_day`

**Streaks:**  
`user_id (PK), current_streak, longest_streak, last_posted_at, insurance_redeemed_at`

**Follows:**  
`follower_id, following_id`

**Reactions:**  
`post_id, user_id, emoji_type`

**Comments:**  
`id, post_id, user_id, text, created_at`

**Notifications:**  
`id, user_id, type, message, is_read`

---