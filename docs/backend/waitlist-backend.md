# Waitlist Backend - Complete Setup Guide

## 📋 Overview
This document explains the complete backend setup for the Miha waitlist system, including database schema, API endpoints, and data flow. Use this guide to understand and replicate the backend structure in your React Native project.

## 🗄️ Database Schema

### 1. Enum Type for Fitness Goals
```sql
-- Create fitness_goal_type enum
create type fitness_goal_type as enum (
  'Body Positivity', 'Confidence Building', 'Weight Loss', 'Muscle Gain',
  'Strength Training', 'Cardio Fitness', 'Flexibility & Mobility',
  'Sports Performance', 'General Health', 'Body Recomposition',
  'Endurance Training', 'Mental Wellness', 'Community Support',
  'Habit Building', 'Rehabilitation', 'Maintenance', 'Other'
);
```

### 2. Waitlist Table
```sql
-- Create waitlist table
create table if not exists public.waitlist (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  first_name text,
  last_name text,
  fitness_goal fitness_goal_type,
  other_fitness_goal text,
  inserted_at timestamp with time zone default now()
);

-- Enable Row-Level Security (RLS)
alter table public.waitlist enable row level security;
```

### 3. RLS Policies for Security
```sql
-- Allow anon to insert (email only)
create policy "anon_insert_policy"
on public.waitlist
for insert
to anon
with check (true);

-- Allow service_role to update
create policy "service_role_update_policy"
on public.waitlist
for update
to service_role
using (true)
with check (true);

-- Allow service_role to select
create policy "service_role_select_policy"
on public.waitlist
for select
to service_role
using (true);

-- Prevent anon from selecting, updating, deleting
create policy "anon_no_select_policy" on public.waitlist for select to anon using (false);
create policy "anon_no_update_policy" on public.waitlist for update to anon using (false);
create policy "anon_no_delete_policy" on public.waitlist for delete to anon using (false);
```

## 🔄 Two-Stage Waitlist Flow

### Stage 1: Email Collection
**Purpose**: Capture user's email address
**Database Action**: Insert new row with email only
**Fields**: `email` (required), all others `NULL`

### Stage 2: Profile Completion  
**Purpose**: Collect additional user details
**Database Action**: Update existing row with profile data
**Fields**: `first_name`, `last_name`, `fitness_goal`, `other_fitness_goal`

## 🔧 API Endpoints

### 1. Email Submission Endpoint
**Route**: `POST /api/submit`
**Role**: `anon` (client-side)
**Purpose**: Handle initial email registration

```typescript
// Request Body
{
  "email": "user@example.com"
}

// Response (Success)
"Email submitted successfully!"

// Response (Error - Duplicate)
"User already exists" // Status: 409

// Response (Error - Invalid)
"Invalid email address" // Status: 400
```

**Database Operation**:
```sql
INSERT INTO public.waitlist (email) VALUES ('user@example.com');
```

### 2. Profile Completion Endpoint
**Route**: `POST /api/submit-details`
**Role**: `service_role` (server-side)
**Purpose**: Update user profile with additional details

```typescript
// Request Body
{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe", 
  "goals": ["Strength Training"],
  "otherGoalText": ""
}

// Response (Success)
"User details submitted successfully!"

// Response (Error)
"Missing required fields" // Status: 400
```

**Database Operation**:
```sql
UPDATE public.waitlist 
SET 
  first_name = 'John',
  last_name = 'Doe',
  fitness_goal = 'Strength Training',
  other_fitness_goal = NULL
WHERE email = 'user@example.com';
```

## 🔐 Security Model

### Role-Based Access Control
- **`anon` role**: Anonymous users (mobile app clients)
  - ✅ Can INSERT email only
  - ❌ Cannot SELECT, UPDATE, or DELETE data
  
- **`service_role`**: Backend operations with elevated privileges
  - ✅ Can UPDATE any row
  - ✅ Can SELECT data
  - ❌ Cannot DELETE data

### Environment Variables Required
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## 📱 React Native Implementation Guide

### 1. Supabase Client Setup
```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### 2. Stage 1: Email Submission
```typescript
// Submit email to waitlist
const submitEmail = async (email: string) => {
  try {
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email: email.toLowerCase().trim() }])
      // Note: No .select() to avoid RLS issues

    if (error) {
      if (error.code === '23505') {
        throw new Error('User already exists')
      }
      throw new Error('Database error')
    }

    return { success: true, message: 'Email submitted successfully!' }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
```

### 3. Stage 2: Profile Completion
```typescript
// Update user profile (requires backend API)
const updateProfile = async (profileData: {
  email: string
  firstName: string
  lastName: string
  goals: string[]
  otherGoalText?: string
}) => {
  try {
    const response = await fetch('/api/submit-details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(errorText)
    }

    return { success: true, message: 'Profile updated successfully!' }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
```

### 4. Form Validation
```typescript
// Email validation
const validateEmail = (email: string): boolean => {
  return email.includes('@') && email.trim().length > 0
}

// Profile validation
const validateProfile = (data: {
  email: string
  firstName: string
  lastName: string
  goals: string[]
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []
  
  if (!data.email || !data.email.trim()) {
    errors.push('Email is required')
  }
  
  if (!data.firstName || !data.firstName.trim()) {
    errors.push('First name is required')
  }
  
  if (!data.lastName || !data.lastName.trim()) {
    errors.push('Last name is required')
  }
  
  if (!data.goals || data.goals.length === 0) {
    errors.push('Please select at least one fitness goal')
  }
  
  return { isValid: errors.length === 0, errors }
}
```

## 🎯 Complete User Flow

### Step 1: User Enters Email
1. User opens app
2. User enters email address
3. App validates email format
4. App calls `submitEmail()` function
5. Database inserts new row with email only
6. App shows success message

### Step 2: User Completes Profile
1. User fills out profile form:
   - First name (required)
   - Last name (required)
   - Fitness goals (required, multiple selection)
   - Other goal text (if "Other" selected)
2. App validates all fields
3. App calls `updateProfile()` function
4. Backend updates existing row with profile data
5. App shows final success page

## 🔧 Backend API Implementation (Node.js/Express)

### 1. Email Submission Route
```javascript
// routes/waitlist.js
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

app.post('/api/submit', async (req, res) => {
  const { email } = req.body

  try {
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email address' })
    }

    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email: email.toLowerCase().trim() }])

    if (error) {
      if (error.code === '23505') {
        return res.status(409).json({ error: 'User already exists' })
      }
      return res.status(500).json({ error: 'Database error' })
    }

    res.json({ message: 'Email submitted successfully!' })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})
```

### 2. Profile Completion Route
```javascript
// routes/waitlist.js
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

app.post('/api/submit-details', async (req, res) => {
  const { email, firstName, lastName, goals, otherGoalText } = req.body

  try {
    if (!email || !firstName || !lastName) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    let fitnessGoal = null
    let otherFitnessGoal = null

    if (goals && goals.length > 0) {
      const selectedGoal = goals[0]
      fitnessGoal = selectedGoal
      
      if (selectedGoal === 'Other') {
        otherFitnessGoal = otherGoalText || ''
      }
    }

    const { data, error } = await supabaseAdmin
      .from('waitlist')
      .update({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        fitness_goal: fitnessGoal,
        other_fitness_goal: otherFitnessGoal
      })
      .eq('email', email.toLowerCase().trim())

    if (error) {
      return res.status(500).json({ error: 'Database error' })
    }

    res.json({ message: 'User details submitted successfully!' })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})
```

## 🚨 Error Handling

### Common Error Scenarios
1. **Duplicate Email**: User tries to sign up with existing email
   - **Error Code**: `23505` (PostgreSQL unique constraint violation)
   - **Response**: `409 Conflict` with message "User already exists"

2. **Invalid Email**: User enters malformed email
   - **Response**: `400 Bad Request` with message "Invalid email address"

3. **Missing Fields**: User doesn't complete required profile fields
   - **Response**: `400 Bad Request` with message "Missing required fields"

4. **Database Connection Issues**: Supabase is down or unreachable
   - **Response**: `500 Internal Server Error` with message "Database error"

### Error Handling Best Practices
```typescript
// React Native error handling
const handleWaitlistSubmission = async (email: string) => {
  try {
    const result = await submitEmail(email)
    
    if (result.success) {
      // Show success message
      Alert.alert('Success!', result.message)
    } else {
      // Show error message
      Alert.alert('Error', result.error)
    }
  } catch (error) {
    // Handle unexpected errors
    Alert.alert('Error', 'Something went wrong. Please try again.')
  }
}
```

## 📊 Data Flow Diagram

```
User Input → Validation → API Call → Database → Response
    ↓           ↓           ↓          ↓         ↓
  Email     Email Check   Supabase   INSERT   Success
    ↓           ↓           ↓          ↓         ↓
Profile    Field Check   Backend     UPDATE   Success
    ↓           ↓           ↓          ↓         ↓
Complete   All Valid    Service     RLS       Final
           Fields       Role       Policy     Page
```

## 🔧 Environment Setup

### Required Environment Variables
```bash
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### Dependencies Required
```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.57.4"
  }
}
```

## 📝 Key Implementation Notes

1. **No .select() on INSERT**: Always omit `.select()` from insert operations to avoid RLS violations
2. **Service Role for Updates**: Use service_role key for profile updates, never expose it to client
3. **Email Uniqueness**: Database enforces unique emails automatically
4. **RLS Security**: Policies prevent unauthorized data access
5. **Error Handling**: Always handle duplicate emails and validation errors
6. **Two-Stage Process**: Email first, then profile completion

This backend structure provides a secure, scalable waitlist system that can be easily replicated in any React Native project! 🚀
