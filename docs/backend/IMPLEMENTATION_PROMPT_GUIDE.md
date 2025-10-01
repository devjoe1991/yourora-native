# Miha Backend Implementation - Prompt-Based Guide

## 🎯 **HOW TO USE THIS GUIDE**

**For each implementation step, use this exact prompt format:**

```
@backend/ [STEP_NAME] - [DESCRIPTION]

Please read through all backend documentation and implement [SPECIFIC_TASK]. 
Follow the security rules, database schema, and component mappings from the docs.
```

---

## 📋 **IMPLEMENTATION STEPS**

### **STEP 1: SUPABASE PROJECT SETUP**
```
@backend/ STEP 1 - Supabase Project Setup

Please read through all backend documentation and set up the Supabase project connection using Supabase CLI. 
Install Supabase CLI, initialize the project, create environment variables, install the Supabase client, and verify the connection to the existing project.
Follow the security rules and database schema from the docs.
```

### **STEP 2: DATABASE SCHEMA CREATION**
```
@backend/ STEP 2 - Database Schema Creation

Please read through all backend documentation and create all the required database tables using Supabase CLI migrations. 
Use the existing waitlist table (DO NOT MODIFY) and create the new Miha app tables with proper RLS policies.
Follow the database schema and security rules from the docs.
```

### **STEP 3: STORAGE BUCKETS SETUP**
```
@backend/ STEP 3 - Storage Buckets Setup

Please read through all backend documentation and create the required storage buckets with proper RLS policies.
Set up avatars, post-images, and story media buckets with user-specific folder structures.
Follow the storage rules and security policies from the docs.
```

### **STEP 4: AUTHENTICATION IMPLEMENTATION**
```
@backend/ STEP 4 - Authentication Implementation

Please read through all backend documentation and implement the authentication system.
Connect LoginScreen and SignupScreen to Supabase Auth with proper user profile creation.
Follow the component mappings and security rules from the docs.
```

### **STEP 5: USER MIGRATION SYSTEM**
```
@backend/ STEP 5 - User Migration System

Please read through all backend documentation and implement the waitlist to Miha app migration.
Create functions to migrate waitlist users to the full app with personalized onboarding.
Follow the migration strategy and data flow from the docs.
```

### **STEP 6: CORE SOCIAL FEATURES**
```
@backend/ STEP 6 - Core Social Features

Please read through all backend documentation and implement the core social features.
Connect Homescreen, ExploreScreen, and ReelsScreen to the database with proper queries.
Follow the component mappings and database schema from the docs.
```

### **STEP 7: CONTENT CREATION FEATURES**
```
@backend/ STEP 7 - Content Creation Features

Please read through all backend documentation and implement content creation features.
Connect NewPostScreen, AddStoryScreen, and Post components to the database.
Follow the component mappings and storage rules from the docs.
```

### **STEP 8: SOCIAL INTERACTIONS**
```
@backend/ STEP 8 - Social Interactions

Please read through all backend documentation and implement social interaction features.
Connect likes, comments, follows, and notifications to the database with real-time updates.
Follow the component mappings and realtime rules from the docs.
```

### **STEP 9: REALTIME SUBSCRIPTIONS**
```
@backend/ STEP 9 - Realtime Subscriptions

Please read through all backend documentation and implement real-time subscriptions.
Add live updates for feeds, comments, likes, and notifications across all components.
Follow the realtime rules and component mappings from the docs.
```

### **STEP 10: PREMIUM FEATURES**
```
@backend/ STEP 10 - Premium Features

Please read through all backend documentation and implement premium features.
Connect MahiPlusTab, subscription modals, and premium components to the database.
Follow the component mappings and user roles from the docs.
```

### **STEP 11: TESTING & VALIDATION**
```
@backend/ STEP 11 - Testing & Validation

Please read through all backend documentation and implement comprehensive testing.
Test all features end-to-end, validate security policies, and ensure data integrity.
Follow the implementation status and success criteria from the docs.
```

### **STEP 12: LAUNCH PREPARATION**
```
@backend/ STEP 12 - Launch Preparation

Please read through all backend documentation and prepare for launch.
Set up monitoring, analytics, and user migration from waitlist to full app.
Follow the launch strategy and marketing integration from the docs.
```

---

## 🔧 **CUSTOM PROMPT TEMPLATES**

### **For Specific Components:**
```
@backend/ [COMPONENT_NAME] Implementation

Please read through all backend documentation and implement [COMPONENT_NAME].
Connect it to the appropriate database tables with proper security and real-time features.
Follow the component mappings and database schema from the docs.
```

### **For Database Operations:**
```
@backend/ [OPERATION_NAME] Database Setup

Please read through all backend documentation and implement [OPERATION_NAME].
Create the required tables, RLS policies, and security rules.
Follow the database schema and security rules from the docs.
```

### **For Feature Implementation:**
```
@backend/ [FEATURE_NAME] Feature Implementation

Please read through all backend documentation and implement [FEATURE_NAME].
Connect all related components to the database with proper queries and real-time updates.
Follow the component mappings and feature requirements from the docs.
```

---

## 📊 **DOCUMENTATION REFERENCE**

### **Key Documents to Reference:**
- `WAITLIST_TO_MIHA_MIGRATION.md` - Migration strategy
- `backend-integration.md` - Component mappings
- `SUPABASE_BACKEND_RULES.md` - Security rules
- `supabase-setup.md` - Setup instructions
- `BACKEND_DOCS_ALIGNMENT.md` - Schema alignment
- `waitlist-backend.md` - Existing backend
- `COMPONENT_FLOW_DIAGRAM.md` - Component structure

### **Implementation Status:**
- ✅ **Frontend**: Complete with all components
- ⏳ **Backend**: Ready for Supabase integration
- ⏳ **Database**: Schema defined, needs implementation
- ⏳ **Storage**: Bucket structure planned
- ⏳ **Realtime**: Rules defined, needs implementation

---

## 🎯 **SUCCESS CRITERIA**

### **After Each Step:**
1. ✅ **Documentation Read** - All backend docs reviewed
2. ✅ **Implementation Complete** - Feature working as specified
3. ✅ **Security Validated** - RLS policies in place
4. ✅ **Testing Passed** - Feature tested end-to-end
5. ✅ **Documentation Updated** - Implementation status updated

### **Final Success:**
- ✅ **All 15 screens** connected to database
- ✅ **All 67 components** working with backend
- ✅ **All 10 tables** created with RLS
- ✅ **All realtime features** working
- ✅ **All security policies** enforced
- ✅ **Waitlist migration** complete
- ✅ **App ready for launch**

---

## 🚀 **READY TO IMPLEMENT**

**Use this guide step by step, Bruv!** Each prompt will ensure I read through all your backend documentation and implement exactly what you need, following your security rules and architecture perfectly! 🎯


ORGANIZED BACKEND ARCHITECTURE

1. Authentication Layer
Existing: auth.users (Supabase Auth)
New: profiles (enhanced user data)
Migration: Waitlist users → profiles with fitness goals

2. Social Layer
Posts: posts table (all content)
Interactions: post_likes, comments, follows
Engagement: streaks (fitness tracking)

3. Communication Layer
Notifications: notifications table
Messages: messages table (future)

4. Storage Layer
Avatars: avatars bucket
Media: post-images bucket
Stories: post-images/stories/ subfolder
