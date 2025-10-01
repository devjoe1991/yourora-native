# Miha Supabase Setup - Using Existing Project

## 🎯 **CURRENT STATUS: EXISTING SUPABASE PROJECT AVAILABLE**

### **✅ What You Already Have:**
- **Existing Supabase project** (from Next.js waitlist)
- **User data** from waitlist signups
- **Complete frontend app** with all components
- **Local server**: `http://192.168.10.4:3001/` (in server.js)
- **Mock data** in `/data` folder
- **All UI components** ready for backend integration

### **❌ What's NOT Set Up Yet:**
- **No Supabase client** installed (`@supabase/supabase-js` not in package.json)
- **No environment variables** configured for this React Native app
- **Additional tables** needed for Miha app features
- **Storage buckets** for media files

---

## 🎯 **BENEFITS OF USING EXISTING PROJECT**

### **✅ User Data Continuity**
- **Waitlist users** → automatically become Miha users
- **Email list** already built for marketing
- **User profiles** can be pre-populated
- **No data migration** needed

### **✅ Cost Efficient**
- **One Supabase project** = one bill
- **Shared resources** (database, storage, auth)
- **No duplicate infrastructure**

### **✅ Seamless Transition**
- **Same authentication** system
- **Same user base** across platforms
- **Easy to contact** waitlist users about app launch

---

## 🎯 **STEP-BY-STEP SETUP**

### **Step 1: Use Your Existing Supabase Project**
1. Go to your existing Supabase dashboard
2. Copy your **Project URL** from Settings → API
3. Copy your **anon public key** from Settings → API
4. **Skip creating new project** - you already have one!

### **Step 2: Install Supabase Client**
```bash
pnpm add @supabase/supabase-js
```

### **Step 3: Set Up Environment Variables**
1. In Supabase dashboard → Settings → API
2. Copy **Project URL**
3. Copy **anon public** key
4. Create `.env` file in project root:

```env
EXPO_PUBLIC_SUPABASE_URL=your_project_url_here
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### **Step 4: Add Additional Tables for Miha App**

#### **Go to Supabase Dashboard → SQL Editor**

#### **Check What Tables Already Exist:**
Your waitlist app probably already has:
- `auth.users` (Supabase Auth)
- `profiles` (user profiles)
- Maybe `user_roles` or similar

#### **Add These New Tables for Miha Features:**

**Note:** Skip `profiles` table if it already exists from your waitlist app!

```sql
-- Only create if profiles table doesn't exist
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  timezone TEXT DEFAULT 'UTC',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### **Table 2: Posts**
```sql
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  media_url TEXT,
  caption TEXT,
  post_type TEXT DEFAULT 'post',
  streak_day INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### **Table 3: Streaks**
```sql
CREATE TABLE IF NOT EXISTS streaks (
  user_id UUID REFERENCES profiles(id) PRIMARY KEY,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_posted_at TIMESTAMP WITH TIME ZONE
);
```

#### **Table 4: Follows**
```sql
CREATE TABLE IF NOT EXISTS follows (
  follower_id UUID REFERENCES profiles(id),
  following_id UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (follower_id, following_id)
);
```

#### **Table 5: Post Likes**
```sql
CREATE TABLE IF NOT EXISTS post_likes (
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),
  emoji_type TEXT DEFAULT '❤️',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (post_id, user_id)
);
```

#### **Table 6: Comments**
```sql
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),
  text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### **Table 7: Notifications**
```sql
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  type TEXT NOT NULL,
  message TEXT NOT NULL,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### **Table 8: Messages**
```sql
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID REFERENCES profiles(id),
  receiver_id UUID REFERENCES profiles(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### **Table 9: User Roles**
```sql
CREATE TABLE IF NOT EXISTS user_roles (
  user_id UUID REFERENCES profiles(id) PRIMARY KEY,
  role TEXT DEFAULT 'user',
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### **Step 5: Set Up Row Level Security (RLS)**

#### **Enable RLS on all tables:**
```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
```

#### **Create RLS Policies:**
```sql
-- Profiles: Users can read all, update own
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Posts: Users can read all, insert own, update own, delete own
CREATE POLICY "Posts are viewable by everyone" ON posts FOR SELECT USING (true);
CREATE POLICY "Users can insert own posts" ON posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own posts" ON posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own posts" ON posts FOR DELETE USING (auth.uid() = user_id);

-- Add similar policies for other tables...
```

### **Step 6: Create Storage Buckets**

#### **Go to Storage → Create Bucket**

1. **avatars** bucket
2. **post-images** bucket

#### **Set up storage policies:**
```sql
-- Users can upload to their own avatar folder
CREATE POLICY "Users can upload own avatar" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can upload to their own post folder
CREATE POLICY "Users can upload own post images" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'post-images' AND auth.uid()::text = (storage.foldername(name))[1]
);
```

---

## 🔧 **IMPLEMENTATION PHASES**

### **Phase 1: Basic Setup (Start Here)**
1. ✅ Create Supabase project
2. ✅ Install Supabase client
3. ✅ Set up environment variables
4. ✅ Create all database tables
5. ✅ Set up RLS policies
6. ✅ Create storage buckets

### **Phase 2: Connect Frontend**
1. Create Supabase client configuration
2. Replace mock data with Supabase queries
3. Implement authentication
4. Test basic CRUD operations

### **Phase 3: Real-time Features**
1. Add realtime subscriptions
2. Implement live feed updates
3. Add notification system
4. Test real-time functionality

### **Phase 4: Advanced Features**
1. Add premium features
2. Implement advanced queries
3. Add performance optimizations
4. Deploy to production

---

## 📱 **SUCCESS CHECKLIST**

### **After Setup, You Should Have:**
- ✅ **Existing Supabase project** connected
- ✅ **Waitlist user data** preserved and accessible
- ✅ **Additional tables** created for Miha features
- ✅ **Storage buckets** configured for media
- ✅ **Environment variables** set for React Native
- ✅ **Supabase client** installed
- ✅ **Ready to connect** frontend to existing backend

### **Next Steps:**
1. Follow the setup steps above
2. **Test connection** to your existing Supabase project
3. **Verify waitlist users** are accessible
4. Start connecting your existing components
5. **Replace mock data** with real Supabase data
6. **Contact waitlist users** about app launch!

---

## 🚀 **READY TO START**

You're using your existing Supabase project, so follow these steps exactly in order. Once you complete Step 6, you'll have your Miha app connected to your existing backend with all your waitlist users ready to go!