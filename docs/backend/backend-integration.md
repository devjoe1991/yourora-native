# Miha App - Feature-by-Feature Supabase Integration

This document maps each existing app feature/component to its Supabase backend requirements. It shows exactly how each screen and component will connect to the database, storage, and realtime features.

---

## 📋 **FEATURE INDEX - Quick Reference**

### **🔐 Authentication Features**
- **LoginScreen** → `auth.users` table via `signInWithPassword()`
- **SignupScreen** → `auth.users` + `profiles` table via `signUp()` + trigger

### **📱 Main App Screens**
- **Homescreen** → `posts`, `profiles`, `post_likes`, `follows` tables with personalized feed query
- **ExploreScreen** → `posts`, `profiles`, `post_likes` tables with discovery feed query
- **ReelsScreen** → `posts` (video content), `profiles`, `post_likes` tables with video filter
- **MessagesScreen** → `profiles`, `follows` tables for chat participants
- **SearchScreen** → `profiles`, `posts` tables with `ilike` search queries
- **NotificationsScreen** → `notifications`, `profiles` tables with user-specific notifications
- **UsersProfileScreen** → `profiles`, `posts`, `follows` tables with user data and posts
- **EditProfileScreen** → `profiles` table with update queries
- **NewPostScreen** → `posts` table with insert queries
- **AddStoryScreen** → `posts` table (stories as posts) with story metadata
- **ViewStoryScreen** → `posts` table filtered for stories from followed users
- **CameraScreen** → No database (camera functionality only)

### **🧩 Post & Social Components**
- **Post.js & PostAdvance.js** → `posts`, `profiles`, `post_likes`, `comments` tables with like/unlike actions
- **CommentCard.js & CommentSheet.js** → `comments`, `profiles`, `comment_likes` tables with comment CRUD
- **ProfileHead.js** → `profiles`, `follows` tables with profile data and follow actions
- **ProfileBody.js** → `posts` table with user's posts and counts
- **Sidebar.js** → `profiles`, `notifications` tables with user data and notification badges
- **ChatCard.js & MessageCard.js** → `profiles` table for chat participant data
- **NotificationCard.js** → `notifications`, `profiles` tables with read status updates
- **Avatar.js (all variants)** → `profiles` table for avatar display and updates
- **VideoPost.js & VideoInfo.js** → `posts`, `profiles`, `post_likes` tables for video content

### **🔄 Realtime Features**
- **Feed Updates** → `posts` table subscription for live feed updates
- **Comments** → `comments` table subscription for real-time comment threads
- **Likes** → `post_likes`, `comment_likes` table subscriptions for instant like counts
- **Notifications** → `notifications` table subscription for live notification badges

### **📁 Storage Features**
- **User Avatars** → `avatars` bucket with user-specific folder structure
- **Post Images** → `post-images` bucket with author-specific folder structure
- **Story Media** → `post-images` bucket with story-specific subfolder structure

### **🔧 Database Tables Used**
- **`auth.users`** → Authentication and user accounts
- **`profiles`** → Public user information and avatars
- **`posts`** → Social feed content, images, and stories
- **`comments`** → Post comment threads
- **`post_likes`** → Post like/unlike actions
- **`comment_likes`** → Comment like/unlike actions
- **`follows`** → User follow relationships
- **`notifications`** → In-app notification system

---

## 🏗️ **Database Schema Overview**

```sql
-- Core tables needed (aligned with existing Supabase schema)
profiles (id, email, full_name, avatar_url, bio, timezone, created_at, updated_at)
posts (id, user_id, media_url, caption, created_at, post_type, streak_day)
streaks (user_id, current_streak, longest_streak, last_posted_at)
follows (follower_id, following_id)
post_likes (post_id, user_id, emoji_type)
comments (id, post_id, user_id, text, created_at)
notifications (id, user_id, type, message, read_at)
messages (id, sender_id, receiver_id, content, created_at)
user_roles (user_id, role, status)
```

---

## 📱 **SCREENS → SUPABASE INTEGRATION**

### **1. Authentication Screens**

#### **LoginScreen.js**
- **Supabase Table**: `auth.users`
- **Integration**: 
  ```ts
  await supabase.auth.signInWithPassword({ email, password })
  ```
- **Realtime**: None needed
- **Storage**: None needed

#### **SignupScreen.js**
- **Supabase Table**: `auth.users` + `profiles`
- **Integration**: 
  ```ts
  await supabase.auth.signUp({ email, password })
  // Auto-create profile via trigger
  ```
- **Realtime**: None needed
- **Storage**: None needed

---

### **2. Main App Screens**

#### **Homescreen.js**
- **Supabase Tables**: `posts`, `profiles`, `post_likes`, `follows`
- **Integration**:
  ```ts
  // Fetch personalized feed
  const { data } = await supabase
    .from('posts')
    .select(`
      *, 
      author:user_id(*),
      post_likes(count),
      comments(count)
    `)
    .in('user_id', followedUserIds)
    .order('created_at', { ascending: false })
  ```
- **Realtime**: Subscribe to `posts` table for live feed updates
- **Storage**: Display `author.avatar_url` and `image_url` from storage

#### **ExploreScreen.js**
- **Supabase Tables**: `posts`, `profiles`, `post_likes`
- **Integration**:
  ```ts
  // Fetch all posts for discovery
  const { data } = await supabase
    .from('posts')
    .select('*, author:user_id(*), post_likes(count)')
    .order('created_at', { ascending: false })
  ```
- **Realtime**: Subscribe to `posts` table for new content
- **Storage**: Display post images and user avatars

#### **ReelsScreen.js**
- **Supabase Tables**: `posts` (video content), `profiles`, `post_likes`
- **Integration**: Same as ExploreScreen but filter for video posts
- **Realtime**: Subscribe to video posts only
- **Storage**: Video files in `post-images` bucket

#### **MessagesScreen.js**
- **Supabase Tables**: `profiles` (for chat participants)
- **Integration**: 
  ```ts
  // Fetch followed users for chat
  const { data } = await supabase
    .from('follows')
    .select('following:following_id(*)')
    .eq('follower_id', userId)
  ```
- **Realtime**: Future chat implementation
- **Storage**: User avatars in chat list

#### **SearchScreen.js**
- **Supabase Tables**: `profiles`, `posts`
- **Integration**:
  ```ts
  // Search users
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .ilike('username', `%${searchTerm}%`)
  
  // Search posts
  const { data } = await supabase
    .from('posts')
    .select('*, author:user_id(*)')
    .ilike('caption', `%${searchTerm}%`)
  ```
- **Realtime**: None needed
- **Storage**: User avatars and post images

#### **NotificationsScreen.js**
- **Supabase Tables**: `notifications`, `profiles`
- **Integration**:
  ```ts
  // Fetch user notifications
  const { data } = await supabase
    .from('notifications')
    .select('*, actor:actor_id(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  ```
- **Realtime**: Subscribe to `notifications` table for live updates
- **Storage**: Actor avatars

#### **UsersProfileScreen.js**
- **Supabase Tables**: `profiles`, `posts`, `follows`
- **Integration**:
  ```ts
  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  // Fetch user posts
  const { data: posts } = await supabase
    .from('posts')
    .select('*, post_likes(count), comments(count)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  // Check if current user follows this user
  const { data: follow } = await supabase
    .from('follows')
    .select('*')
    .eq('follower_id', currentUserId)
    .eq('following_id', userId)
    .single()
  ```
- **Realtime**: Subscribe to user's posts for live updates
- **Storage**: User avatar and post images

#### **EditProfileScreen.js**
- **Supabase Tables**: `profiles`
- **Integration**:
  ```ts
  // Update profile
  await supabase
    .from('profiles')
    .update({ display_name, bio })
    .eq('id', userId)
  ```
- **Realtime**: None needed
- **Storage**: Upload new avatar to `avatars` bucket

#### **NewPostScreen.js**
- **Supabase Tables**: `posts`
- **Integration**:
  ```ts
  // Create new post
  const { data } = await supabase
    .from('posts')
    .insert({
      user_id: userId,
      caption,
      media_url: uploadedImageUrl
    })
    .select()
    .single()
  ```
- **Realtime**: None needed (post will appear via feed subscription)
- **Storage**: Upload post image to `post-images` bucket

#### **AddStoryScreen.js**
- **Supabase Tables**: `posts` (stories as posts with story flag)
- **Integration**: Same as NewPostScreen but with story metadata
- **Realtime**: Story appears in feed
- **Storage**: Story image/video to `post-images` bucket

#### **ViewStoryScreen.js**
- **Supabase Tables**: `posts` (filtered for stories)
- **Integration**: Fetch stories from followed users
- **Realtime**: Subscribe to new stories
- **Storage**: Story media files

#### **CameraScreen.js**
- **Supabase Tables**: None (just camera functionality)
- **Integration**: None
- **Realtime**: None
- **Storage**: Upload captured media to appropriate bucket

---

## 🧩 **COMPONENTS → SUPABASE INTEGRATION**

### **Post Components**

#### **Post.js & PostAdvance.js**
- **Supabase Tables**: `posts`, `profiles`, `post_likes`, `comments`
- **Integration**:
  ```ts
  // Like/unlike post
  await supabase.from('post_likes').insert({ post_id, user_id })
  await supabase.from('post_likes').delete().eq('post_id', postId).eq('user_id', userId)
  
  // Get post with author and counts
  const { data } = await supabase
    .from('posts')
    .select(`
      *,
      author:user_id(*),
      post_likes(count),
      comments(count)
    `)
    .eq('id', postId)
    .single()
  ```
- **Realtime**: Subscribe to post updates, likes, comments
- **Storage**: Display post image and author avatar

#### **CommentCard.js & CommentSheet.js**
- **Supabase Tables**: `comments`, `profiles`, `comment_likes`
- **Integration**:
  ```ts
  // Fetch comments for post
  const { data } = await supabase
    .from('comments')
    .select('*, author:user_id(*)')
    .eq('post_id', postId)
    .order('created_at', { ascending: true })
  
  // Add comment
  await supabase.from('comments').insert({
    post_id,
    user_id: userId,
    text: content
  })
  
  // Like comment
  await supabase.from('comment_likes').insert({ comment_id, user_id })
  ```
- **Realtime**: Subscribe to comments for specific post
- **Storage**: Author avatars

### **User Profile Components**

#### **ProfileHead.js**
- **Supabase Tables**: `profiles`, `follows`
- **Integration**:
  ```ts
  // Fetch profile data
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  // Follow/unfollow user
  await supabase.from('follows').insert({ follower_id: currentUserId, following_id: userId })
  await supabase.from('follows').delete().eq('follower_id', currentUserId).eq('following_id', userId)
  ```
- **Realtime**: Subscribe to profile updates
- **Storage**: User avatar

#### **ProfileBody.js**
- **Supabase Tables**: `posts`
- **Integration**: Fetch user's posts with counts
- **Realtime**: Subscribe to user's new posts
- **Storage**: Post images

### **Navigation Components**

#### **Sidebar.js**
- **Supabase Tables**: `profiles`, `notifications`
- **Integration**:
  ```ts
  // Fetch current user profile
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', currentUserId)
    .single()
  
  // Fetch unread notifications count
  const { count } = await supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', currentUserId)
    .eq('read', false)
  ```
- **Realtime**: Subscribe to notifications for badge count
- **Storage**: User avatar

### **Message Components**

#### **ChatCard.js & MessageCard.js**
- **Supabase Tables**: `profiles` (for chat participants)
- **Integration**: Fetch chat participant profiles
- **Realtime**: Future chat implementation
- **Storage**: Participant avatars

### **Notification Components**

#### **NotificationCard.js**
- **Supabase Tables**: `notifications`, `profiles`
- **Integration**:
  ```ts
  // Mark notification as read
  await supabase
    .from('notifications')
    .update({ read: true })
    .eq('id', notificationId)
  ```
- **Realtime**: None needed
- **Storage**: Actor avatars

### **Avatar Components**

#### **Avatar.js (all variants)**
- **Supabase Tables**: `profiles`
- **Integration**: Display user avatar from profile
- **Realtime**: Subscribe to profile updates for avatar changes
- **Storage**: Avatar images from `avatars` bucket

### **Video Components**

#### **VideoPost.js & VideoInfo.js**
- **Supabase Tables**: `posts`, `profiles`, `post_likes`
- **Integration**: Same as Post.js but for video content
- **Realtime**: Subscribe to video post updates
- **Storage**: Video files from `post-images` bucket

---

## 🔄 **REALTIME SUBSCRIPTIONS BY FEATURE**

### **Feed Updates**
```ts
// HomeScreen, ExploreScreen, ReelsScreen
supabase.channel('posts-feed')
  .on('postgres_changes', { 
    event: '*', 
    schema: 'public', 
    table: 'posts' 
  }, (payload) => {
    // Update feed list
  })
  .subscribe()
```

### **Comments**
```ts
// CommentSheet, Post components
supabase.channel(`comments-${postId}`)
  .on('postgres_changes', { 
    event: '*', 
    schema: 'public', 
    table: 'comments',
    filter: `post_id=eq.${postId}`
  }, (payload) => {
    // Update comments thread
  })
  .subscribe()
```

### **Likes**
```ts
// Post components
supabase.channel(`likes-${postId}`)
  .on('postgres_changes', { 
    event: '*', 
    schema: 'public', 
    table: 'post_likes',
    filter: `post_id=eq.${postId}`
  }, (payload) => {
    // Update like count
  })
  .subscribe()
```

### **Notifications**
```ts
// NotificationsScreen, Sidebar
supabase.channel(`notifications-${userId}`)
  .on('postgres_changes', { 
    event: '*', 
    schema: 'public', 
    table: 'notifications',
    filter: `user_id=eq.${userId}`
  }, (payload) => {
    // Update notification list/badge
  })
  .subscribe()
```

---

## 📁 **STORAGE INTEGRATION BY FEATURE**

### **User Avatars**
- **Bucket**: `avatars`
- **Path**: `{user_id}/{timestamp}-avatar.jpg`
- **Used by**: ProfileHead, Avatar components, Sidebar
- **RLS**: Users can only upload to their own folder

### **Post Images**
- **Bucket**: `post-images`
- **Path**: `{author_id}/{post_id}/{filename}`
- **Used by**: Post components, NewPostScreen, AddStoryScreen
- **RLS**: Users can only upload to their own folder

### **Story Media**
- **Bucket**: `post-images` (same as posts)
- **Path**: `{author_id}/stories/{timestamp}-story.{ext}`
- **Used by**: AddStoryScreen, ViewStoryScreen
- **RLS**: Users can only upload to their own folder

---

## 🚀 **IMPLEMENTATION PRIORITY**

### **Phase 1: Core Features**
1. **Auth**: LoginScreen, SignupScreen
2. **Profiles**: UsersProfileScreen, EditProfileScreen
3. **Posts**: NewPostScreen, Post components
4. **Feed**: Homescreen, ExploreScreen

### **Phase 2: Social Features**
1. **Comments**: CommentSheet, CommentCard
2. **Likes**: Post components
3. **Follows**: ProfileHead, Sidebar
4. **Search**: SearchScreen

### **Phase 3: Advanced Features**
1. **Notifications**: NotificationsScreen, Sidebar
2. **Stories**: AddStoryScreen, ViewStoryScreen
3. **Messages**: MessagesScreen (future)
4. **Reels**: ReelsScreen

### **Phase 4: Optimization**
1. **Realtime**: All screens with live updates
2. **Storage**: Optimized image handling
3. **Performance**: Caching and pagination

---

## 🔧 **ENVIRONMENT SETUP**

```bash
# Install Supabase client
pnpm add @supabase/supabase-js

# Environment variables needed
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

---

## 📋 **IMPLEMENTATION STATUS**

### ✅ **COMPLETED FEATURES**
- **Mixed Media Feed**: ✅ Fully implemented with video/image support
- **Theme Integration**: ✅ All components follow Miha theme system
- **Video Player**: ✅ 3-30 second validation with auto-play
- **Component Architecture**: ✅ Post.js, PostAdvance.js, VideoPlayer.js
- **Performance**: ✅ Lazy loading and memory management

### 🔄 **PENDING BACKEND INTEGRATION**
- [ ] Create Supabase project
- [ ] Set up database schema with RLS
- [ ] Create storage buckets with policies
- [ ] Install Supabase client
- [ ] Implement auth flows
- [ ] Wire up feed components to Supabase
- [ ] Add realtime subscriptions
- [ ] Test all features end-to-end
- [ ] Deploy and monitor

### 📊 **CURRENT STATE**
- **Frontend**: ✅ Complete with mixed media support
- **Backend**: ⏳ Ready for Supabase integration
- **Database**: ⏳ Schema defined, needs implementation
- **Storage**: ⏳ Bucket structure planned


