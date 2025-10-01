# Miha Supabase Backend - Implementation Rules

## 🎯 **CORE RULES FOR SUPABASE INTEGRATION**

### **📊 Database Tables (10 Total)**

#### **✅ EXISTING (Keep These)**
```
auth.users (Supabase Auth)
profiles (id, email, full_name, avatar_url, bio, timezone)
user_roles (user_id, role, status)
security_logs, audit_logs, email_logs
```

#### **🆕 CREATE THESE**
```
posts (id, user_id, media_url, caption, created_at, post_type, streak_day)
streaks (user_id, current_streak, longest_streak, last_posted_at)
follows (follower_id, following_id)
post_likes (post_id, user_id, emoji_type)
comments (id, post_id, user_id, text, created_at)
notifications (id, user_id, type, message, read_at)
messages (id, sender_id, receiver_id, content, created_at)
```

---

## 🔗 **COMPONENT → TABLE MAPPING RULES**

### **Authentication**
- **LoginScreen** → `auth.users`
- **SignupScreen** → `auth.users` + `profiles`

### **Social Features**
- **Homescreen** → `posts` + `profiles` + `follows` + `post_likes`
- **ExploreScreen** → `posts` + `profiles` + `post_likes`
- **ReelsScreen** → `posts` (video_type) + `profiles`
- **SearchScreen** → `profiles` + `posts`
- **UsersProfileScreen** → `profiles` + `posts` + `follows`

### **Content Creation**
- **NewPostScreen** → `posts`
- **AddStoryScreen** → `posts` (story_type)
- **Post.js** → `posts` + `profiles` + `post_likes` + `comments`

### **Social Interactions**
- **CommentCard** → `comments` + `profiles`
- **NotificationCard** → `notifications` + `profiles`
- **ChatCard** → `messages` + `profiles`

### **Premium Features**
- **MahiPlusTab** → `user_roles` (premium status)
- **AppleSubscriptionModal** → `user_roles` (subscription status)

---

## 🔄 **REALTIME RULES**

### **Live Feed Updates**
```typescript
// Subscribe to new posts
supabase.channel('posts-feed')
  .on('postgres_changes', { event: 'INSERT', table: 'posts' })
  .subscribe()
```

### **Social Interactions**
```typescript
// Subscribe to likes
supabase.channel(`likes-${postId}`)
  .on('postgres_changes', { event: '*', table: 'post_likes' })
  .subscribe()
```

### **Notifications**
```typescript
// Subscribe to notifications
supabase.channel(`notifications-${userId}`)
  .on('postgres_changes', { event: 'INSERT', table: 'notifications' })
  .subscribe()
```

---

## 📁 **STORAGE RULES**

### **User Avatars**
- **Bucket**: `avatars`
- **Path**: `{user_id}/{timestamp}-avatar.jpg`

### **Post Media**
- **Bucket**: `post-images`
- **Path**: `{user_id}/{post_id}/{filename}`

### **Story Media**
- **Bucket**: `post-images`
- **Path**: `{user_id}/stories/{timestamp}-story.{ext}`

---

## 🏋️ **FITNESS FEATURES RULES**

### **Streak System**
- **Table**: `streaks`
- **Logic**: Update on daily posts
- **Real-time**: Show streak progress live

### **Mixed Media**
- **Images**: JPG, PNG, WebP
- **Videos**: 3-30 seconds, MP4/MOV
- **Auto-play**: Videos start when scrolled into view

### **Content Types**
- **Regular Posts**: `post_type = 'post'`
- **Stories**: `post_type = 'story'`
- **Videos**: `post_type = 'video'`

---

## 🔧 **IMPLEMENTATION RULES**

### **Phase 1: Core (Start Here)**
1. Set up Supabase project
2. Create database schema
3. Implement auth (LoginScreen, SignupScreen)
4. Wire up profiles (UsersProfileScreen, EditProfileScreen)

### **Phase 2: Social**
1. Implement posts (NewPostScreen, Post.js)
2. Add feed (Homescreen, ExploreScreen)
3. Enable likes and comments
4. Add follow system

### **Phase 3: Advanced**
1. Add realtime subscriptions
2. Implement notifications
3. Add stories and videos
4. Enable messaging

### **Phase 4: Premium**
1. Add user_roles table
2. Implement subscription features
3. Add premium content access

---

## 📱 **QUERY PATTERNS**

### **Get User Feed**
```typescript
const { data } = await supabase
  .from('posts')
  .select('*, author:user_id(*), post_likes(count)')
  .in('user_id', followedUserIds)
  .order('created_at', { ascending: false })
```

### **Create Post**
```typescript
const { data } = await supabase
  .from('posts')
  .insert({
    user_id: userId,
    caption: content,
    media_url: uploadedUrl
  })
```

### **Like Post**
```typescript
await supabase
  .from('post_likes')
  .insert({ post_id, user_id })
```

---

## 🎯 **SUCCESS CRITERIA**

### **Working App Must Have**
- ✅ User authentication
- ✅ Profile creation/editing
- ✅ Post creation (images + videos)
- ✅ Feed with real-time updates
- ✅ Like/comment system
- ✅ Follow/unfollow
- ✅ Notifications
- ✅ Streak tracking

### **Performance Requirements**
- ✅ Real-time updates under 1 second
- ✅ Smooth scrolling with mixed media
- ✅ Efficient image/video loading
- ✅ Offline data persistence

---

## 🚀 **READY TO IMPLEMENT**

Follow these rules step by step to create a fully functional Miha fitness social app with Supabase. Each rule maps directly to your existing components and ensures everything works together seamlessly.

**Start with Phase 1, then move through each phase systematically.**
