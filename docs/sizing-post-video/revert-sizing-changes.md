# How to Revert Instagram Sizing Changes

## Overview
This guide provides step-by-step instructions to revert the Instagram sizing changes and restore the original dynamic aspect ratio behavior.

## Quick Revert Instructions

### Step 1: Revert Post.js Component

**File:** `/components/home/body/Post.js`

**Find the `PostImage()` function and replace:**

```javascript
// CURRENT (Instagram sizing)
useEffect(() => {
  Image.getSize(post.picturePath, (width, height) => {
    const imageRatio = width / height;
    // Instagram standard ratios
    if (imageRatio >= 1.8) {
      // Landscape: 1.91:1 ratio
      setRatio(1.91);
    } else if (imageRatio <= 0.8) {
      // Portrait: 4:5 ratio
      setRatio(0.8);
    } else {
      // Square: 1:1 ratio
      setRatio(1);
    }
  });
}, [post]);
```

**With:**

```javascript
// ORIGINAL (Dynamic sizing)
useEffect(() => {
  Image.getSize(post.picturePath, (width, height) => {
    const imageRatio = width / height;
    if (imageRatio < 0.9) {
      setRatio(1);
    } else {
      setRatio(imageRatio);
    }
  });
}, [post]);
```

### Step 2: Revert PostAdvance.js Component

**File:** `/components/home/body/PostAdvance.js`

**Find the `PostImage()` function and replace:**

```javascript
// CURRENT (Instagram sizing)
useEffect(() => {
  Image.getSize(post.picturePath, (width, height) => {
    const imageRatio = width / height;
    // Instagram standard ratios
    if (imageRatio >= 1.8) {
      // Landscape: 1.91:1 ratio
      setRatio(1.91);
    } else if (imageRatio <= 0.8) {
      // Portrait: 4:5 ratio
      setRatio(0.8);
    } else {
      // Square: 1:1 ratio
      setRatio(1);
    }
  });
}, [post]);
```

**With:**

```javascript
// ORIGINAL (Dynamic sizing)
useEffect(() => {
  Image.getSize(post.picturePath, (width, height) => {
    const imageRatio = width / height;
    if (imageRatio < 0.9) {
      setRatio(1);
    } else {
      setRatio(imageRatio);
    }
  });
}, [post]);
```

### Step 3: Revert VideoPost.js Component

**File:** `/components/reelsScreen/VideoPost.js`

**Find the styles and replace:**

```javascript
// CURRENT (Instagram sizing)
const styles = StyleSheet.create({
  container: {
    width: GlobalStyles.styles.windowWidth,
    height:
      GlobalStyles.styles.windowHeight - GlobalStyles.styles.tabBarPadding + 25,
    borderRadius: 30,
    overflow: "hidden",
  },
  video: {
    flex: 1,
    // Instagram Reels use 9:16 aspect ratio
    aspectRatio: 9/16,
  },
});
```

**With:**

```javascript
// ORIGINAL (Dynamic sizing)
const styles = StyleSheet.create({
  container: {
    width: GlobalStyles.styles.windowWidth,
    height:
      GlobalStyles.styles.windowHeight - GlobalStyles.styles.tabBarPadding + 25,
    borderRadius: 30,
    overflow: "hidden",
  },
  video: {
    flex: 1,
  },
});
```

## Automated Revert Script

If you prefer, you can use this search and replace pattern:

### For Post.js and PostAdvance.js:
**Search for:**
```javascript
// Instagram standard ratios
if (imageRatio >= 1.8) {
  // Landscape: 1.91:1 ratio
  setRatio(1.91);
} else if (imageRatio <= 0.8) {
  // Portrait: 4:5 ratio
  setRatio(0.8);
} else {
  // Square: 1:1 ratio
  setRatio(1);
}
```

**Replace with:**
```javascript
if (imageRatio < 0.9) {
  setRatio(1);
} else {
  setRatio(imageRatio);
}
```

### For VideoPost.js:
**Search for:**
```javascript
video: {
  flex: 1,
  // Instagram Reels use 9:16 aspect ratio
  aspectRatio: 9/16,
},
```

**Replace with:**
```javascript
video: {
  flex: 1,
},
```

## Verification

After making these changes:

1. **Test the app** to ensure posts display with original dynamic sizing
2. **Check different image orientations** (portrait, landscape, square)
3. **Verify videos** display with original aspect ratios
4. **Confirm styling** remains unchanged

## What This Reverts

- ✅ **Dynamic Aspect Ratios** - Images will use their natural proportions
- ✅ **Original Video Sizing** - Videos will use their natural aspect ratios
- ✅ **Flexible Layout** - Posts will adapt to content dimensions
- ✅ **Preserved Styling** - All visual design elements remain intact

## Notes

- This revert only affects aspect ratios and sizing
- All styling, colors, animations, and functionality remain unchanged
- The app will return to its original dynamic sizing behavior
- No data or configuration changes are required

---

*Use this guide to quickly revert to the original sizing behavior while keeping all other improvements intact.*
