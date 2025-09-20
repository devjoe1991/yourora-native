***

## Your Ora Design System

Your Ora's design system is built to reflect the concept of a personal aura: ethereal, calming, and full of life. It's modern, minimalistic, and elegant, prioritizing a clean user experience that feels both intuitive and uplifting.

### **Color Palette**

The color palette is inspired by natural auras, combining calming neutrals with vibrant, life-affirming accents.

#### **Primary Colors**
* **Aura White:** `#F5F5F5` - The primary background color. It provides a clean, breathable canvas that feels light and open.
* **Vapor Cream:** `#FFFDD0` - A soft, off-white used for cards, containers, and highlights. It adds warmth and a subtle tactile feel.
* **Spirit Blue:** `#0077B6` - The main accent color. It represents clarity, focus, and serenity. Use it for primary calls-to-action (CTAs), key icons, and headers.
* **Ember Green:** `#00BFA5` - A secondary accent color. It symbolizes growth, health, and vitality. Use it for "streak" counters, success messages, and positive notifications.
* **Shadow Gray:** `#333333` - A deep, near-black for all body text and secondary labels. It provides excellent readability against the light backgrounds.

#### **Streak System Colors**
* **Blue ORA:** `#00BFA5` - Primary color for Streak 1, represents the beginning of the fitness journey
* **Milestone Red:** `#FF6B6B` - Used for milestone streaks (10, 20, 30, etc.), represents achievement and celebration
* **Locked Gray:** `#555555` - Used for locked streaks, represents unavailable content
* **Progression Teal:** `#4ECDC4` - Used for Streak 2, represents early progress
* **Progression Blue:** `#45B7D1` - Used for Streak 3, represents building momentum
* **Progression Purple:** `#6C5CE7` - Used for Streak 4, represents dedication
* **Progression Green:** `#00B894` - Used for Streak 5, represents commitment
* **Progression Orange:** `#E17055` - Used for Streak 6, represents advanced progress

#### **Monetization Colors**
* **Premium Gold:** `#FFD700` - Used for premium features, subscription highlights, and "BEST VALUE" badges
* **Premium Container:** `rgba(255,255,255,0.1)` - Semi-transparent white for premium option containers
* **Premium Border:** `#FFD700` - Gold border for subscription options

#### **Status & UI Colors**
* **Online Green:** `#00BFA5` - Green dots for online indicators on user avatars
* **Primary 300:** `#333333` - Used for borders and secondary elements
* **Cyan:** `#00BFA5` - Used for story borders and accent elements
* **White:** `#FFFFFF` - Pure white for text on dark backgrounds and icons

---

### **Typography**

Typography is simple, clean, and highly readable, designed to keep the focus on user content and progress.

* **Primary Font:** **Poppins** (Sans-Serif).
    * **Headlines (H1, H2):** Bold or SemiBold for strong, clear titles.
    * **Body Text:** Regular for a clean, professional look.
    * **Streaks & Stats:** Use a slightly heavier weight (e.g., Medium) to give numerical data more visual importance.

---

### **User Interface Components**

All components are designed to feel spacious and uncluttered, with rounded corners to soften the overall aesthetic.

#### **Buttons**

* **Primary Button:** Filled with **Spirit Blue** with white text. Slightly rounded corners.
* **Secondary Button:** Outline in **Spirit Blue** with **Spirit Blue** text.
* **Positive Action Button:** Filled with **Ember Green** with white text. Used for "post streak" or "celebrate" actions.
* **Premium Button (5 Streaks):** Filled with **Blue ORA** (`#00BFA5`) with white text.
* **Premium Button (10 Streaks):** Filled with **Spirit Blue** (`#0077B6`) with white text.
* **Subscription Button:** Semi-transparent with **Premium Gold** border and text.
* **Free Action Button:** Filled with **Premium Gold** with black text.

#### **Cards & Containers**

* **Background:** **Vapor Cream**
* **Borders:** Subtle 1px border in a lighter shade of **Shadow Gray** to separate elements without feeling heavy.
* **Corners:** All cards and containers have a 10px `border-radius` to create a soft, approachable feel.
* **Premium Container:** Semi-transparent white (`rgba(255,255,255,0.1)`) with 15px `border-radius` for premium options.
* **Streak Circles:** Dynamic colors based on streak level and status (unlocked/locked/milestone).

#### **Icons**

Icons are minimalistic, using simple, clean lines.

* **Color:** Typically **Shadow Gray** for clarity, with **Spirit Blue** or **Ember Green** used for active states or notifications.

#### **Streak System Components**

The streak system uses a progressive color scheme to represent user journey and achievement levels.

* **Streak Circles:** 
  - **Streak 1:** **Blue ORA** (`#00BFA5`) - Beginning of fitness journey
  - **Streak 2:** **Progression Teal** (`#4ECDC4`) - Early progress
  - **Streak 3:** **Progression Blue** (`#45B7D1`) - Building momentum
  - **Streak 4:** **Progression Purple** (`#6C5CE7`) - Dedication
  - **Streak 5:** **Progression Green** (`#00B894`) - Commitment
  - **Streak 6:** **Progression Orange** (`#E17055`) - Advanced progress
  - **Milestones (10, 20, 30+):** **Milestone Red** (`#FF6B6B`) - Achievement celebration
  - **Locked Streaks:** **Locked Gray** (`#555555`) - Unavailable content

* **Progression Emojis:** Dynamic emoji indicators based on streak days
  - 🎯 (Day 0), 🔥 (Day 1), 💪 (Day 2), ⚡ (Day 3), 🚀 (Day 4)
  - ⭐ (Day 5), 🌟 (Day 6), 👑 (Day 7), 💎 (Day 8), 🏆 (Day 9)
  - 🎉 (Day 10), 🎊 (Day 20), 🎆 (Day 30), 🏅 (Day 31+)

#### **Monetization Components**

Premium features use a gold-based color scheme to indicate value and exclusivity.

* **Premium Modal Container:** Semi-transparent white background with rounded corners
* **Premium Buttons:** Color-coded based on package type
  - **5 Streaks:** **Blue ORA** background with white text
  - **10 Streaks:** **Spirit Blue** background with white text
  - **Subscription:** Semi-transparent with **Premium Gold** border
* **Pricing Display:** **Premium Gold** text for subscription pricing
* **Value Badge:** **Premium Gold** "BEST VALUE" badge for subscription option

#### **Status Indicators**

* **Online Indicators:** **Online Green** (`#00BFA5`) dots on user avatars
* **Lock Indicators:** **Locked Gray** (`#555555`) padlock icons for locked streaks
* **Streak Level Badges:** Small numbered badges in **White** with **Shadow Gray** background

#### **Reaction Bar System**

* **Long-Press Heart Icon:** Hold down heart icon to reveal reaction bar
* **Common Emojis:** 5 fitness-themed emojis (❤️, 🔥, 💪, 👏, 🎉)
* **Plus Icon:** Opens emoji keyboard for custom emoji selection
* **Reaction Bar Design:** Short vertical bar with semi-transparent dark background (`rgba(0,0,0,0.8)`)
* **Layout:** Vertical column (50px wide × 200px tall) positioned attached to heart icon
* **Positioning:** Opens directly on top of heart icon (bottom: 50px, right: 0px)
* **Emoji Selection Behavior:** 
  - Tap emoji to react → Acts as a "like" with that specific emoji
  - Selected emoji replaces heart icon and persists until unpress
  - Tap emoji/heart again to remove reaction and return to unliked state
* **Reaction Bar Colors:** 
  - Background: `rgba(0,0,0,0.8)` - Dark semi-transparent overlay
  - Emoji Buttons: `rgba(255,255,255,0.1)` - Subtle white background (35×35px)
  - Plus Icon: White color for visibility
  - Border Radius: 20px for container, 15px for emoji buttons
* **User Interaction Flow:**
  1. Long-press heart → Reaction bar appears
  2. Select emoji → Emoji shows as "liked" reaction (persists)
  3. Tap emoji/heart again → Removes reaction, returns to unliked state
  4. Tap outside bar → Closes bar without changing reaction state

---

### **Imagery & Graphics**

* **Style:** Clean, minimalistic, and often abstract.
* **Aura Visuals:** Subtle, glowing gradients in **Spirit Blue** and **Ember Green** can be used as background effects or in hero sections to reinforce the app's core theme.
* **User Avatars:** Circular with a thin, glowing border that changes color based on the user's current streak level or chosen "aura" color.
