# Folksagent Design System

## Overview
This document outlines the professional design system implemented for the Folksagent website, ensuring consistency, accessibility, and competitive quality with enterprise-level websites.

## Color Palette

### Primary Colors
- **Primary Blue**: `#2563eb` - Main brand color, used for CTAs, links, and important UI elements
- **Primary Light**: `#60a5fa` - Light variant for hover states and accents
- **Primary Dark**: `#1e40af` - Dark variant for enhanced contrast

### Secondary Colors
- **Secondary Purple**: `#7c3aed` - Creative accent color
- **Accent Amber**: `#f59e0b` - Highlight color for special elements
- **Success Green**: `#10b981` - Success states
- **Info Cyan**: `#0ea5e9` - Informational elements

### Neutral Colors
Comprehensive grayscale palette from `#0f172a` (black) to `#ffffff` (white), with 10 shades for flexibility:
- Gray 900-100 for backgrounds, borders, and text hierarchy
- Maintains WCAG AA accessibility standards

## Typography

### Font Families
- **Headings**: Inter (800, 700, 600 weights)
- **Body Text**: System font stack with Inter fallback
- **Features**: -webkit-font-smoothing for crisp rendering

### Font Sizes & Hierarchy
```scss
h1: 2.5rem - 4rem (responsive)
h2: 2rem - 3.5rem (responsive)
h3: 1.5rem
Body: 16px base (1rem)
Small: 0.875rem - 0.95rem
```

### Line Heights
- Headings: 1.2 - 1.3
- Body text: 1.75 - 1.8
- Optimized for readability

## Components

### Cards (Features & Service Summary)
- **Border Radius**: 16px (modern, rounded)
- **Shadows**: Layered approach
  - Rest: `0 1px 3px rgba(0, 0, 0, 0.05)`
  - Hover: `0 20px 40px rgba(0, 0, 0, 0.08)`
- **Hover Effects**:
  - Transform: translateY(-4px to -6px)
  - Smooth transitions (0.3s cubic-bezier)
  - Border color changes to primary

### Buttons
- **Gradient Background**: Linear gradient from primary to primary-dark
- **Shadow**: Prominent with brand color tint
- **Border Radius**: 10px
- **Height**: 48px
- **Hover**: Elevated with increased shadow
- **Active**: Compressed for tactile feedback

### Navigation
- **Main Menu**:
  - Clean, minimal design
  - Active state: Primary background with white text
  - Hover: Gray background with primary text
- **Mobile Menu**:
  - Full-screen overlay with gradient
  - Staggered animations
  - Backdrop blur effect

### Tables
- **Modern Design**: Rounded corners, subtle shadows
- **Header**: Gradient background, uppercase labels
- **Hover**: Row highlighting for better UX
- **Borders**: Subtle, using border-color variable

## Spacing System

Based on 4px grid:
- 4px, 8px, 12px, 16px, 20px, 24px, 28px, 32px, 36px, 40px, 48px, 64px
- Consistent padding/margin throughout

## Shadows

### Elevation Levels
1. **Level 1** (Subtle): `0 1px 3px rgba(0, 0, 0, 0.05)`
2. **Level 2** (Cards): `0 4px 16px rgba(0, 0, 0, 0.06)`
3. **Level 3** (Elevated): `0 8px 24px rgba(0, 0, 0, 0.1)`
4. **Level 4** (Floating): `0 20px 40px rgba(0, 0, 0, 0.08)`

## Animations & Transitions

### Duration
- Quick: 0.2s
- Standard: 0.3s
- Slow: 0.5s

### Easing
- Standard: `cubic-bezier(0.4, 0, 0.2, 1)`
- Fast: `ease`

### Effects
- Hover: Transform + shadow changes
- Focus: Outline with offset
- Page transitions: Smooth scroll behavior

## Accessibility

### Features Implemented
1. **Focus States**: Clear 2px outline with offset
2. **Focus-Visible**: Modern focus management
3. **Reduced Motion**: Respects user preferences
4. **Color Contrast**: WCAG AA compliant
5. **Semantic HTML**: Proper use of article, section, header, aside tags
6. **Alt Text**: All images have descriptive alt attributes
7. **ARIA Labels**: Where appropriate

### Screen Reader Support
- `.sr-only` class for screen reader only content
- Proper heading hierarchy
- Semantic time elements with datetime attributes

## Responsive Design

### Breakpoints
```scss
sm: 576px
md: 768px
lg: 992px
xl: 1300px
```

### Mobile-First Approach
- Base styles for mobile
- Progressive enhancement for larger screens
- Hamburger menu below 768px
- Responsive typography scaling

## Best Practices

### Performance
1. **Font Loading**: Preconnect to Google Fonts
2. **Font Display**: swap for FOUT prevention
3. **CSS**: Organized, modular SCSS architecture
4. **Smooth Scrolling**: HTML scroll-behavior

### Code Quality
1. **Clean HTML**: Semantic, valid markup
2. **Modular SCSS**: Component-based organization
3. **Consistent Naming**: BEM-inspired conventions
4. **Comments**: Where necessary for clarity

### SEO
1. **Meta Tags**: Proper title, description, OG tags
2. **Semantic HTML**: Correct heading hierarchy
3. **Alt Text**: All images properly described
4. **Valid HTML5**: Proper DOCTYPE and structure

## Competitive Features

### Enterprise-Level Qualities
1. ✅ Modern, professional color palette
2. ✅ Smooth animations and micro-interactions
3. ✅ Consistent design language
4. ✅ Accessibility compliance
5. ✅ Responsive across all devices
6. ✅ Fast, optimized typography
7. ✅ Professional spacing and layout
8. ✅ High-quality shadows and depth
9. ✅ Clean, maintainable code
10. ✅ SEO optimized

### Design Trends Applied
- **Neumorphism-inspired**: Soft shadows and depth
- **Gradient Accents**: Modern color treatments
- **Card-based UI**: Clean, organized content
- **Micro-interactions**: Delightful hover states
- **Typography-focused**: Strong hierarchy
- **Minimalist**: Clean, uncluttered design

## Maintenance

### Adding New Colors
Add to `/assets/css/style.scss` color variables section

### Adding New Components
Create new file in `/_sass/components/` and import in `style.scss`

### Updating Breakpoints
Modify `/_sass/_bootstrap-variables.scss`

## File Structure

```
/assets/css/style.scss          # Main stylesheet
/_sass/
  _bootstrap-variables.scss     # Grid & breakpoints
  /components/                  # UI components
    _header.scss
    _footer.scss
    _buttons.scss
    _feature.scss
    _service-summary.scss
    _content.scss
    _accessibility.scss
    ...
  /pages/                       # Page-specific styles
    _home.scss
    /services/
      _page-services-single.scss
```

---

**Last Updated**: 2026-04-25
**Version**: 2.0
**Competitive Level**: Enterprise-Ready ✨
