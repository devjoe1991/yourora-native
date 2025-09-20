# Component Color Usage Analysis

## Overview
This document provides a comprehensive analysis of all components and their color usage patterns in the YourOra app, as required by Prompt 4.

---

## Components Already Using useTheme Hook ✅

These components are already partially updated and use the theme context:

### Screen Components
1. **Homescreen.js** - Uses `useTheme` hook
2. **ReelsScreen.js** - Uses `useTheme` hook  
3. **ExploreScreen.js** - Uses `useTheme` hook
4. **MessagesScreen.js** - Uses `useTheme` hook
5. **SearchScreen.js** - Uses `useTheme` hook
6. **LoginScreen.js** - Uses `useTheme` hook

### Component Files
1. **TabBar.js** - Uses `useTheme` hook
2. **Header.js** - Uses `useTheme` hook (with isDark property)
3. **InputField.js** - Uses `useTheme` hook
4. **Post.js** - Uses `useTheme` hook
5. **Stories.js** - Uses `useTheme` hook
6. **Button.js** - Uses `useTheme` hook

---

## Components Using GlobalStyles.colors (Need Update) ⚠️

### Screen Components
1. **SignupScreen.js** - Uses `GlobalStyles.colors.primary`
2. **NewPostScreen.js** - Uses multiple GlobalStyles colors
3. **NotificationsScreen.js** - Uses `GlobalStyles.colors.primary`
4. **UsersProfileScreen.js** - Uses `GlobalStyles.colors.primary`
5. **EditProfileScreen.js** - Uses multiple GlobalStyles colors
6. **ChatScreen.js** - Uses `GlobalStyles.colors.primary`
7. **CameraScreen.js** - Uses multiple GlobalStyles colors
8. **AddStoryScreen.js** - Uses `GlobalStyles.colors.primary`
9. **ViewStoryScreen.js** - Uses `GlobalStyles.colors.primary`

### Component Files
1. **SignupForm.js** - Uses `GlobalStyles.colors.gray`
2. **LoginForm.js** - Uses `GlobalStyles.colors.blue100`, `GlobalStyles.colors.gray`
3. **NotificationCard.js** - Uses multiple GlobalStyles colors
4. **MessageCard.js** - Uses `GlobalStyles.colors.gray`, `GlobalStyles.colors.blue`
5. **Video.js** - Uses `GlobalStyles.colors.primary`
6. **PostAdvance.js** - Uses multiple GlobalStyles colors
7. **Feed.js** - Uses `GlobalStyles.colors.primary`
8. **Body.js** - Uses `GlobalStyles.colors.purple`
9. **Loader.js** - Uses `GlobalStyles.colors.purple`
10. **EmojiInput.js** - Uses `GlobalStyles.colors.primary500`, `GlobalStyles.colors.primary600`
11. **ErrorOverlay.js** - Uses `GlobalStyles.colors.blue`
12. **BottomMenu.js** - Uses `GlobalStyles.colors.blue`
13. **NewPostIcon.js** - Uses `GlobalStyles.colors.gray100`
14. **TabBarSvg.js** - Uses `GlobalStyles.colors.primary300`
15. **ProfileHead.js** - Uses multiple GlobalStyles colors
16. **ProfileBody.js** - Uses multiple GlobalStyles colors
17. **HeaderSVG.js** - Uses `GlobalStyles.colors.primary300`
18. **ImageStory.js** - Uses `GlobalStyles.colors.gray`, `GlobalStyles.colors.blue`
19. **ListCard.js** - Uses `GlobalStyles.colors.primary300`, `GlobalStyles.colors.primary`
20. **EmojiSVGShape.js** - Uses `GlobalStyles.colors.primary500`
21. **CardHeader.js** - Uses `GlobalStyles.colors.purple`
22. **VideoPost.js** - Uses `GlobalStyles.colors.primary500`
23. **Avatar.js** (reels) - Uses `GlobalStyles.colors.greenLight`, `GlobalStyles.colors.primary300`, `GlobalStyles.colors.gray`
24. **ActionButtons.js** - Uses `GlobalStyles.colors.primary300`
25. **ChatCard.js** - Uses `GlobalStyles.colors.gray`, `GlobalStyles.colors.primary600`
26. **StorySvg.js** - Uses `GlobalStyles.colors.primary200`, `GlobalStyles.colors.primary`
27. **Stories copy.js** - Uses multiple GlobalStyles colors
28. **Avatar.js** (explore) - Uses multiple GlobalStyles colors
29. **AnimatedRing.js** - Uses `GlobalStyles.colors.primary500`
30. **RenderStory.js** - Uses `GlobalStyles.colors.gray`, `GlobalStyles.colors.primary500`, `GlobalStyles.colors.primary600`
31. **ProgressBar.js** - Uses `GlobalStyles.colors.primary500`, `GlobalStyles.colors.purple`
32. **CommentSheet.js** - Uses `GlobalStyles.colors.primary500`
33. **CommentCard.js** - Uses `GlobalStyles.colors.gray`
34. **Post.js** (userProfile) - Uses `GlobalStyles.colors.primary500`
35. **Header.js** (userProfile) - Uses hard-coded `#fff`
36. **CollectionCard.js** - Uses `GlobalStyles.colors.primary500`
37. **CardFooter.js** - Uses `GlobalStyles.colors.primary500`
38. **ProgressOverlay.js** - Uses `GlobalStyles.colors.primary500`

---

## Components with Hard-Coded Colors (Need Update) ⚠️

### High Priority (Many hard-coded colors)
1. **Stories.js** - 20+ hard-coded colors including streak colors, rgba values
2. **Post.js** - Multiple rgba values for overlays and text
3. **PostAdvance.js** - Multiple rgba values for overlays
4. **Header.js** - Hard-coded rgba text colors
5. **Body.js** - Hard-coded rgba tab bar colors
6. **InputField.js** - Hard-coded placeholder color `#bdbdbd`
7. **Button.js** - Hard-coded rgba ripple colors
8. **ErrorOverlay.js** - Hard-coded rgba background colors
9. **BottomMenu.js** - Hard-coded rgba ripple color
10. **NewPostIcon.js** - Hard-coded rgba background colors

### Medium Priority (Some hard-coded colors)
1. **ProfileHead.js** - Hard-coded rgba text colors
2. **ProfileBody.js** - Hard-coded rgba tab bar colors
3. **ImageStory.js** - Hard-coded rgba gradient colors
4. **ListCard.js** - Hard-coded rgba colors
5. **CardHeader.js** - Hard-coded rgba text colors
6. **VideoPost.js** - Hard-coded rgba background colors
7. **ChatCard.js** - Hard-coded rgba background colors
8. **RenderStory.js** - Hard-coded rgba gradient colors
9. **CommentSheet.js** - Hard-coded rgba background colors
10. **CommentCard.js** - Hard-coded rgba text colors
11. **CardFooter.js** - Hard-coded rgba background and text colors
12. **ProgressOverlay.js** - Hard-coded rgba background colors

### Low Priority (Few hard-coded colors)
1. **MessageCard.js** - Hard-coded rgba color
2. **SignupForm.js** - Hard-coded hex color `#6BB0F5`
3. **LoginForm.js** - Hard-coded hex color `#6BB0F5`
4. **TabBar.js** - Hard-coded rgba color
5. **Header.js** (userProfile) - Hard-coded hex color `#fff`
6. **CollectionCard.js** - Hard-coded rgba ripple color

---

## Color Usage Patterns

### Most Common Hard-Coded Colors
1. **`rgba(255,255,255,0.5)`** - Secondary text (appears 15+ times)
2. **`rgba(255,255,255,0.3)`** - Muted text (appears 10+ times)
3. **`rgba(0,0,0,0.8)`** - Dark overlays (appears 8+ times)
4. **`rgba(255,255,255,0.1)`** - Light overlays (appears 6+ times)
5. **`#bdbdbd`** - Placeholder text (appears 3+ times)
6. **`#6BB0F5`** - Link colors (appears 2+ times)

### Brand Colors (Should Remain Unchanged)
- `#7A40F8` (blue)
- `#00BFA5` (green/cyan)
- `#ef3e55` (red)
- `#6BB0f5` (blue100)
- `#4cc9f0` (cyan)
- `#C3B1E1` (purple)
- `#C459F4` (purpleDark)
- `#F49AC2` (magenta)
- `#fdac1d` (orange)
- `#00ECCA` (greenLight)
- `#7fff62` (green)
- `#f72585` (pink)
- `#C44536` (persianRed)
- `#297e2b` (darkGreen)
- `#E0FF55` (yellow)

### Streak System Colors (Special Case)
These are hard-coded in Stories.js and should be preserved as they represent specific streak levels:
- `#555555` - Locked streaks
- `#FF6B6B` - Milestone streaks
- `#333333` - Add Story / Creation
- `#45B7D1` - Newcomer (Streak 1)
- `#4ECDC4` - Rising (Streak 2)
- `#96CEB4` - Committed (Streak 3)
- `#FFEAA7` - Dedicated (Streak 4)
- `#DDA0DD` - Elite (Streak 5)
- `#FFD700` - Legendary (Streak 6)
- `#00BFA5` - Blue ORA (Streak 1)
- `#6C5CE7` - Purple (Streak 4)
- `#00B894` - Green (Streak 5)
- `#E17055` - Orange (Streak 6)

---

## Update Priority Order

### Phase 1: Already Using useTheme (Verify & Complete)
1. TabBar.js
2. Header.js
3. Button.js
4. Post.js
5. InputField.js
6. Stories.js

### Phase 2: High Priority GlobalStyles Components
1. PostAdvance.js
2. Feed.js
3. Body.js
4. Loader.js
5. EmojiInput.js
6. ErrorOverlay.js
7. BottomMenu.js
8. NewPostIcon.js

### Phase 3: Screen Components
1. SignupScreen.js
2. NewPostScreen.js
3. NotificationsScreen.js
4. UsersProfileScreen.js
5. EditProfileScreen.js
6. ChatScreen.js
7. CameraScreen.js
8. AddStoryScreen.js
9. ViewStoryScreen.js

### Phase 4: Remaining Components
1. All other components with GlobalStyles.colors
2. All components with hard-coded colors

---

## Expected Result ✅
A comprehensive list of all components and their color usage patterns has been documented, providing a clear roadmap for the theme implementation process.
