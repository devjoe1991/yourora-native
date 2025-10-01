# Miha App - Component Flow Diagram with Supabase Backend

## 🗄️ **SUPABASE TABLES** (Core Tables for Miha)
```
📊 DATABASE SCHEMA
├── auth.users (Supabase Auth)
├── profiles (user_id, email, full_name, avatar_url, bio, timezone)
├── posts (id, user_id, media_url, caption, created_at, post_type, streak_day)
├── streaks (user_id, current_streak, longest_streak, last_posted_at)
├── follows (follower_id, following_id)
├── post_likes (post_id, user_id, emoji_type)
├── comments (id, post_id, user_id, text, created_at)
├── notifications (id, user_id, type, message, read_at)
├── messages (id, sender_id, receiver_id, content, created_at)
└── user_roles (user_id, role, status)
```

## 📱 **SCREENS** (15 components) → **DATABASE MAPPING**
```
App.js → auth.users + profiles
├── AuthNavigation.js → auth.users
├── navigation.js → profiles (user data)
└── Screens/
    ├── AddStoryScreen.js → posts (story_type)
    ├── CameraScreen.js → No DB (camera only)
    ├── ChatScreen.js → messages + profiles
    ├── EditProfileScreen.js → profiles
    ├── ExploreScreen.js → posts + profiles + post_likes
    ├── Homescreen.js → posts + profiles + follows + post_likes
    ├── LoginScreen.js → auth.users
    ├── MessagesScreen.js → messages + profiles
    ├── NewPostScreen.js → posts
    ├── NotificationsScreen.js → notifications + profiles
    ├── ReelsScreen.js → posts (video_type) + profiles
    ├── SearchScreen.js → profiles + posts
    ├── SignupScreen.js → auth.users + profiles
    ├── UsersProfileScreen.js → profiles + posts + follows
    └── ViewStoryScreen.js → posts (story_type) + profiles
```

## 🧩 **COMPONENTS** (67 components) → **DATABASE MAPPING**

### **Core UI Components** → **No DB (UI Only)**
```
components/
├── BottomMenu.js → No DB
├── Button.js → No DB
├── ErrorOverlay.js → No DB
├── InputField.js → No DB
└── ProgressOverlay.js → No DB
```

### **Authentication Components** → **auth.users + profiles**
```
components/loginScreen/
└── LoginForm.js → auth.users (signInWithPassword)

components/signupScreen/
└── SignupForm.js → auth.users + profiles (signUp + trigger)
```

### **Home Screen Components** → **posts + profiles + follows + post_likes**
```
components/home/
├── body/
│   ├── Body.js → posts + profiles
│   ├── Feed.js → posts + profiles + follows + post_likes
│   ├── Post.js → posts + profiles + post_likes + comments
│   ├── PostAdvance.js → posts + profiles + post_likes + comments
│   ├── TopTabBar.js → No DB
│   └── Video.js → posts (video_type) + profiles
└── head/
    ├── Header.js → profiles (user data)
    ├── HeaderSVG.js → No DB
    ├── Stories.js → posts (story_type) + profiles
    ├── Stories copy.js → posts (story_type) + profiles
    ├── StorySvg.js → No DB
    └── Stories (directory) → posts (story_type) + profiles
```

### **Navigation Components** → **profiles + notifications**
```
components/Navigation/
├── Sidebar.js → profiles + notifications (user data + badges)
├── SidebarContainer.js → No DB
├── SidebarItem.js → No DB
└── SidebarOverlay.js → No DB

components/tabBar/
├── NewPostIcon.js → No DB
├── TabBar.js → No DB
└── TabBarSvg.js → No DB
```

### **Explore Screen Components** → **posts + profiles + post_likes**
```
components/exploreScreen/
├── AnimatedRing.js → No DB
├── Avatar.js → profiles
└── BackgroundSVG.js → No DB
```

### **Reels Screen Components** → **posts (video_type) + profiles + post_likes**
```
components/reelsScreen/
├── ActionButtons.js → post_likes + comments
├── Avatar.js → profiles
├── VideoInfo.js → posts + profiles
└── VideoPost.js → posts (video_type) + profiles
```

### **Search Screen Components** → **profiles + posts**
```
components/searchScreen/
├── Card.js → profiles + posts
├── CardFooter.js → post_likes + comments
├── CardHeader.js → profiles
├── EmojisList.js → No DB
├── EmojiSVGShape.js → No DB
├── ListCard.js → profiles + posts
└── PostsList.js → posts + profiles
```

### **Messages Screen Components** → **messages + profiles**
```
components/messagesScreen/
├── ChatCard.js → messages + profiles
└── MessageCard.js → messages + profiles
```

### **Notifications Components** → **notifications + profiles**
```
components/notificationScreen/
└── NotificationCard.js → notifications + profiles
```

### **Comments Components** → **comments + profiles + post_likes**
```
components/Comments/
├── CommentCard.js → comments + profiles
└── CommentSheet.js → comments + profiles + post_likes
```

### **Story Components** → **posts (story_type) + profiles**
```
components/story/
├── component/
│   ├── Footer.js → No DB
│   └── TopDescription.js → No DB
├── helpers/
│   ├── ImageZoom.js → No DB
│   ├── index.js → No DB
│   ├── Scale.js → No DB
│   ├── StateHelpers.js → No DB
│   ├── styles.js → No DB
│   ├── useSwipe.js → No DB
│   └── ValidationHelpers.js → No DB
└── ImageStory.js → posts (story_type) + profiles
```

### **View Story Components** → **posts (story_type) + profiles**
```
components/ViewStoryScreen/
├── ProgressBar.js → No DB
└── RenderStory.js → posts (story_type) + profiles
```

### **User Profile Components** → **profiles + posts + follows**
```
components/userProfileScreen/
├── CollectionCard.js → posts + profiles
├── Header.js → profiles
├── HeaderSVG.js → No DB
├── Post.js → posts + profiles + post_likes
├── ProfileBody.js → posts + profiles
├── ProfileHead.js → profiles + follows
└── RemoteImage.js → No DB
```

### **Mahi Plus Components** → **user_roles + profiles (premium features)**
```
components/mahiPlus/
├── AppleSubscriptionModal.js → user_roles (subscription status)
├── FeaturesGrid.js → No DB
├── FeatureSquare.js → No DB
├── HealthInsights.js → profiles (health data)
├── HuelPartnership.js → No DB
├── MahiPlusTab.js → user_roles (premium status)
├── OffersBanner.js → No DB
├── OffersGrid.js → No DB
└── PremiumBanner.js → user_roles (subscription status)
```

### **UI Components** → **No DB (UI Only)**
```
components/UI/
├── AnimatedHamburgerMenu.js → No DB
├── EmojiInput.js → No DB
├── Loader.js → No DB
├── MahiLogo.js → No DB
├── MahiTextLogo.js → No DB
├── PressEffect.js → No DB
├── ThemeToggleSwitch.js → No DB
├── VideoPlayer.js → No DB
└── MihaTextLogo.js → No DB
```

### **Animated UI Components** → **No DB (UI Only)**
```
components/AnimatedUi/
└── SettingsIcon.js → No DB
```

## 🗄️ **STORE/CONTEXT** (4 components) → **DATABASE MAPPING**
```
store/
├── app-context.js → No DB (app state)
├── auth-context.js → auth.users + profiles
├── sidebar-context.js → No DB (UI state)
└── theme-context.js → No DB (UI state)
```

## 🛠️ **UTILITIES** (5 components) → **DATABASE HELPERS**
```
utils/
├── helperFunctions.js → No DB (helper functions)
├── mediaUtils.js → No DB (media processing)
├── sidebarAnimations.js → No DB (animations)
├── themeValidator.js → No DB (validation)
└── validateEmail.js → No DB (validation)
```

## 📊 **CONSTANTS** (3 components) → **No DB (Configuration)**
```
constants/
├── server.js → Supabase connection config
├── Styles.js → No DB (styling)
└── themes.js → No DB (theme config)
```

## 📁 **DATA** (6 components) → **No DB (Dummy Data)**
```
data/
├── dummyPost.js → No DB (mock data)
├── EMOJIS.js → No DB (emoji data)
├── icons.js → No DB (icon data)
├── posts.js → No DB (mock data)
├── USER.js → No DB (mock data)
└── users.js → No DB (mock data)
```

---

## 🎯 **BACKEND INTEGRATION SUMMARY**

### **📊 DATABASE TABLES NEEDED (10 core tables)**
```
✅ EXISTING TABLES (from current Supabase):
├── auth.users (Supabase Auth)
├── profiles (user_id, email, full_name, avatar_url, bio, timezone)
├── user_roles (user_id, role, status)
├── security_logs (audit trail)
├── audit_logs (user actions)
└── email_logs (email tracking)

🆕 NEW TABLES TO CREATE:
├── posts (id, user_id, media_url, caption, created_at, post_type, streak_day)
├── streaks (user_id, current_streak, longest_streak, last_posted_at)
├── follows (follower_id, following_id)
├── post_likes (post_id, user_id, emoji_type)
├── comments (id, post_id, user_id, text, created_at)
├── notifications (id, user_id, type, message, read_at)
└── messages (id, sender_id, receiver_id, content, created_at)
```

### **🔗 COMPONENT → DATABASE MAPPING**
- **Authentication**: 2 screens → `auth.users` + `profiles`
- **Social Features**: 8 screens → `posts` + `profiles` + `follows` + `post_likes`
- **Messaging**: 2 screens → `messages` + `profiles`
- **Notifications**: 1 screen → `notifications` + `profiles`
- **Premium Features**: 9 components → `user_roles` (subscription status)
- **UI Components**: 35 components → No database (UI only)

---

## 📈 **TOTAL COMPONENT COUNT**
- **Screens**: 15 → **10 tables needed**
- **Components**: 67 → **7 tables needed**
- **Store/Context**: 4 → **2 tables needed**
- **Utilities**: 5 → **No tables**
- **Constants**: 3 → **No tables**
- **Data**: 6 → **No tables**
- **Main Files**: 3 → **2 tables needed**

**🎯 GRAND TOTAL: 103 components → 10 Supabase tables**
