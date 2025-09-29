# Mahi+ Tab Documentation

## Overview
The Mahi+ tab is a premium subscription interface designed to showcase Mahi+ features and drive user conversions to the premium subscription service. It features a luxury, Spotify-inspired design with premium visual elements and clear upgrade incentives.

## Tab Structure
The Mahi+ tab is located in the main navigation as "Mahi+" and contains four main sections:

### 1. Premium Banner Container
**Purpose**: Main call-to-action banner for Mahi+ subscription
**Location**: Top of the tab
**Features**:
- **Premium Branding**: Black/silver gradient background with diamond icon
- **Title**: "Mahi+ Premium" with "Unlock the full Mahi experience" subtitle
- **Tagline**: "Track • Analyze • Transform"
- **Pricing Display**: Shows crossed-out £8.99 original price and discounted £4.49 with 50% OFF badge
- **Progress Bar**: "50% before midnight" gamification element
- **Subscription Integration**: Opens Apple subscription modal when tapped
- **Visual Elements**: Gold accent line, corner accent, premium shadows

### 2. Features Grid Container
**Purpose**: Showcase premium features in a carousel format
**Location**: Below the premium banner
**Features**:
- **Title**: "Some Mahi+ benefits"
- **Carousel Layout**: Horizontal scrollable feature cards
- **Navigation Arrows**: Left/right arrows for carousel navigation
- **Feature Cards**: 4 premium features with icons and descriptions:
  - **Streak Analytics**: Deep insights into fitness journey
  - **Health Data Sync**: Apple Health, Strava, Fitbit integration
  - **Premium Insights**: AI-powered fitness recommendations
  - **Exclusive Content**: Premium workouts & nutrition plans
- **Visual Design**: Gradient backgrounds, circular icon containers, premium badges

### 3. Offers Banner Container
**Purpose**: Secondary call-to-action for exclusive offers
**Location**: Below the features grid
**Features**:
- **Title**: "Exclusive Offers"
- **Subtitle**: "Limited time premium deals"
- **Social Proof**: "Join 2,847 users who upgraded this week"
- **Visual Design**: Dark blue gradient background with accent elements

### 4. Offers Grid Container
**Purpose**: Display exclusive offers and partnerships
**Location**: Below the offers banner
**Features**:
- **2x2 Grid Layout**: Four offer squares in two rows
- **Offer Types**:
  - **Gym Partnership**: Exclusive gym discounts & access
  - **Spotify Playlists**: Join Spotify & build workout playlists
  - **Competitions**: Join and compete in local competitions
  - **Mahi Merch**: 10% off to all Mahi+ members
- **Visual Design**: Feature squares with app colorway, curved edges, icons

## Apple Subscription Integration

### Subscription Modal
When users interact with the premium banner, they can access the Apple subscription system:

**Modal Features**:
- **Apple Branding**: Apple logo and "Subscribe through Apple" messaging
- **Premium Design**: Dark theme with gold accents matching Mahi+ branding
- **Pricing Display**: Shows original and discounted pricing with 50% OFF badge
- **Feature List**: Premium features with checkmark icons
- **Apple Terms**: Proper subscription terms and Apple ID account management
- **Subscribe Button**: Blue Apple-style button for subscription

**Subscription Flow**:
1. User sees Mahi+ banner with pricing
2. Taps on the banner to open subscription modal
3. Modal displays full subscription details and features
4. User can proceed to Apple's subscription system
5. Handles cancellation and account management through Apple ID

### Premium Container Integration:
All premium-marked containers on the Mahi+ tab will open the same Apple subscription modal:
- **Premium Banner**: Main subscription call-to-action
- **Feature Squares**: Any feature with "PREMIUM" badge
- **Offer Squares**: Any offer marked as premium
- **Consistent Experience**: Same modal design and flow across all containers

## Design System

### Color Palette
- **Primary Background**: Dark gradients (#0a0a0a, #1a1a1a)
- **Accent Color**: Gold (#FFD700) for premium elements
- **Text Colors**: White with various opacity levels
- **Button Colors**: Blue (#007AFF) for Apple integration

### Typography
- **Titles**: 24-28px, 800 weight, letter spacing
- **Subtitles**: 14-18px, 500-600 weight
- **Body Text**: 12-16px, 500 weight
- **Pricing**: 20-24px, 800 weight, gold color

### Visual Elements
- **Gradients**: Linear gradients for premium feel
- **Shadows**: Enhanced shadows with gold accents
- **Borders**: Gold borders for premium containers
- **Icons**: Ionicons with consistent sizing
- **Progress Bars**: Gold progress indicators

## User Experience

### Gamification Elements
- **Progress Bars**: Visual progress indicators
- **Social Proof**: User count and upgrade statistics
- **Urgency**: "50% before midnight" messaging
- **Achievement Badges**: Premium feature indicators

### Navigation
- **Carousel**: Horizontal scrolling for features
- **Modal System**: Smooth modal transitions
- **Touch Interactions**: Responsive button states
- **Visual Feedback**: Shadow and elevation effects

## Technical Implementation

### Components
- **MahiPlusTab**: Main container component
- **PremiumBanner**: Primary subscription banner
- **FeaturesGrid**: Carousel of premium features
- **OffersBanner**: Secondary offer messaging
- **OffersGrid**: 2x2 grid of exclusive offers
- **AppleSubscriptionModal**: Apple subscription interface

### State Management
- **Modal Visibility**: React hooks for modal control
- **Carousel Position**: Scroll position tracking
- **Theme Integration**: Dynamic theming support

### Integration Points
- **Apple StoreKit**: Ready for subscription processing
- **Theme System**: Consistent with app theming
- **Navigation**: Integrated with main app navigation

## Future Enhancements

### Planned Features
- **Analytics Integration**: Track conversion rates
- **A/B Testing**: Test different messaging and layouts
- **Personalization**: Dynamic content based on user behavior
- **Localization**: Multi-language support

### Technical Improvements
- **Performance**: Optimize carousel rendering
- **Accessibility**: Enhanced screen reader support
- **Animations**: Smooth transitions and micro-interactions
- **Offline Support**: Cached content for offline viewing

## Maintenance

### Regular Updates
- **Pricing**: Update subscription pricing as needed
- **Features**: Add new premium features to showcase
- **Offers**: Rotate exclusive offers and partnerships
- **Content**: Update messaging and copy for optimization

### Monitoring
- **Conversion Rates**: Track banner to subscription conversion
- **User Engagement**: Monitor carousel usage and feature interest
- **Performance**: Monitor modal load times and interactions
- **Feedback**: Collect user feedback on subscription experience
