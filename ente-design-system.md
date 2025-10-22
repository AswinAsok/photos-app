# Ente.io System Design Document

## 1. Brand Overview
**Brand Name:** Ente  
**Tagline:** "Store and share your photos with absolute privacy"  
**Brand Personality:** Privacy-focused, minimalist, trustworthy, modern

---

## 2. Color Palette

### Primary Colors
```css
:root {
  /* Core Brand Colors */
  --primary-green: #00A86B;      /* Main brand green */
  --primary-dark: #000000;       /* Pure black for text */
  --primary-white: #FFFFFF;      /* Pure white background */
  
  /* Dark Mode Primary */
  --dark-bg: #0A0A0A;            /* Near-black background */
  --dark-surface: #141414;       /* Elevated surfaces */
  --dark-surface-2: #1F1F1F;     /* Secondary surfaces */
}
```

### Secondary Colors
```css
:root {
  /* Grayscale */
  --gray-50: #FAFAFA;
  --gray-100: #F4F4F5;
  --gray-200: #E4E4E7;
  --gray-300: #D4D4D8;
  --gray-400: #A1A1AA;
  --gray-500: #71717A;
  --gray-600: #52525B;
  --gray-700: #3F3F46;
  --gray-800: #27272A;
  --gray-900: #18181B;
  
  /* Accent Colors */
  --accent-blue: #3B82F6;        /* Links and CTAs */
  --accent-purple: #8B5CF6;      /* Premium features */
  --accent-amber: #F59E0B;       /* Warnings */
  --accent-red: #EF4444;         /* Errors/Destructive actions */
  
  /* Semantic Colors */
  --success: #10B981;
  --warning: #F59E0B;
  --error: #EF4444;
  --info: #3B82F6;
}
```

### Text Colors
```css
:root {
  /* Light Mode Text */
  --text-primary: #0A0A0A;
  --text-secondary: #52525B;
  --text-tertiary: #A1A1AA;
  --text-disabled: #D4D4D8;
  
  /* Dark Mode Text */
  --text-primary-dark: #FFFFFF;
  --text-secondary-dark: #A1A1AA;
  --text-tertiary-dark: #71717A;
  --text-disabled-dark: #3F3F46;
}
```

---

## 3. Typography

### Font Families
```css
:root {
  /* Primary Font Stack */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 
               'Roboto', 'Helvetica Neue', 'Arial', sans-serif;
  
  /* Monospace for Code/Technical */
  --font-mono: 'JetBrains Mono', 'SF Mono', 'Monaco', 'Inconsolata', 
               'Courier New', monospace;
  
  /* Display Font for Headlines */
  --font-display: 'Inter Display', var(--font-sans);
}
```

### Font Sizes & Line Heights
```css
:root {
  /* Type Scale - Minor Third (1.2) */
  --text-xs: 0.75rem;      /* 12px */
  --text-sm: 0.875rem;     /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg: 1.125rem;     /* 18px */
  --text-xl: 1.25rem;      /* 20px */
  --text-2xl: 1.5rem;      /* 24px */
  --text-3xl: 1.875rem;    /* 30px */
  --text-4xl: 2.25rem;     /* 36px */
  --text-5xl: 3rem;        /* 48px */
  --text-6xl: 3.75rem;     /* 60px */
  --text-7xl: 4.5rem;      /* 72px */
  
  /* Line Heights */
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;
}
```

### Font Weights
```css
:root {
  --font-thin: 100;
  --font-light: 300;
  --font-regular: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;
  --font-black: 900;
}
```

### Typography Components
```css
/* Headings */
.h1 {
  font-size: var(--text-5xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  letter-spacing: -0.02em;
}

.h2 {
  font-size: var(--text-4xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-tight);
  letter-spacing: -0.01em;
}

.h3 {
  font-size: var(--text-3xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-snug);
}

.h4 {
  font-size: var(--text-2xl);
  font-weight: var(--font-medium);
  line-height: var(--leading-snug);
}

.h5 {
  font-size: var(--text-xl);
  font-weight: var(--font-medium);
  line-height: var(--leading-normal);
}

.h6 {
  font-size: var(--text-lg);
  font-weight: var(--font-medium);
  line-height: var(--leading-normal);
}

/* Body Text */
.body-large {
  font-size: var(--text-lg);
  font-weight: var(--font-regular);
  line-height: var(--leading-relaxed);
}

.body-regular {
  font-size: var(--text-base);
  font-weight: var(--font-regular);
  line-height: var(--leading-normal);
}

.body-small {
  font-size: var(--text-sm);
  font-weight: var(--font-regular);
  line-height: var(--leading-normal);
}

/* Labels & Captions */
.label {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  line-height: var(--leading-tight);
  letter-spacing: 0.01em;
}

.caption {
  font-size: var(--text-xs);
  font-weight: var(--font-regular);
  line-height: var(--leading-normal);
}
```

---

## 4. Spacing System

### Base Spacing Scale
```css
:root {
  /* 4px Base Unit System */
  --space-0: 0;
  --space-px: 1px;
  --space-0.5: 0.125rem;   /* 2px */
  --space-1: 0.25rem;      /* 4px */
  --space-1.5: 0.375rem;   /* 6px */
  --space-2: 0.5rem;       /* 8px */
  --space-2.5: 0.625rem;   /* 10px */
  --space-3: 0.75rem;      /* 12px */
  --space-3.5: 0.875rem;   /* 14px */
  --space-4: 1rem;         /* 16px */
  --space-5: 1.25rem;      /* 20px */
  --space-6: 1.5rem;       /* 24px */
  --space-7: 1.75rem;      /* 28px */
  --space-8: 2rem;         /* 32px */
  --space-9: 2.25rem;      /* 36px */
  --space-10: 2.5rem;      /* 40px */
  --space-12: 3rem;        /* 48px */
  --space-14: 3.5rem;      /* 56px */
  --space-16: 4rem;        /* 64px */
  --space-20: 5rem;        /* 80px */
  --space-24: 6rem;        /* 96px */
  --space-28: 7rem;        /* 112px */
  --space-32: 8rem;        /* 128px */
  --space-36: 9rem;        /* 144px */
  --space-40: 10rem;       /* 160px */
}
```

---

## 5. Layout System

### Container Widths
```css
:root {
  --container-xs: 20rem;     /* 320px */
  --container-sm: 24rem;     /* 384px */
  --container-md: 28rem;     /* 448px */
  --container-lg: 32rem;     /* 512px */
  --container-xl: 36rem;     /* 576px */
  --container-2xl: 42rem;    /* 672px */
  --container-3xl: 48rem;    /* 768px */
  --container-4xl: 56rem;    /* 896px */
  --container-5xl: 64rem;    /* 1024px */
  --container-6xl: 72rem;    /* 1152px */
  --container-7xl: 80rem;    /* 1280px */
  --container-full: 100%;
}
```

### Breakpoints
```css
:root {
  --screen-xs: 475px;
  --screen-sm: 640px;
  --screen-md: 768px;
  --screen-lg: 1024px;
  --screen-xl: 1280px;
  --screen-2xl: 1536px;
}
```

### Grid System
```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--space-6);
  max-width: var(--container-7xl);
  margin: 0 auto;
  padding: 0 var(--space-4);
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-4);
  }
}
```

---

## 6. Component Styles

### Buttons
```css
/* Primary Button */
.btn-primary {
  background: var(--primary-green);
  color: var(--primary-white);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: #00975F; /* Darker green */
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 168, 107, 0.25);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  border: 1px solid var(--gray-300);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: var(--gray-50);
  border-color: var(--gray-400);
}

/* Ghost Button */
.btn-ghost {
  background: transparent;
  color: var(--text-secondary);
  font-size: var(--text-base);
  font-weight: var(--font-regular);
  padding: var(--space-2) var(--space-4);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-ghost:hover {
  color: var(--text-primary);
  background: var(--gray-50);
}
```

### Cards
```css
.card {
  background: var(--primary-white);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

/* Dark mode card */
.dark .card {
  background: var(--dark-surface);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}
```

### Forms
```css
.input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-base);
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-md);
  background: var(--primary-white);
  transition: all 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--primary-green);
  box-shadow: 0 0 0 3px rgba(0, 168, 107, 0.1);
}

.label {
  display: block;
  margin-bottom: var(--space-2);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-secondary);
}
```

---

## 7. Border Radius

```css
:root {
  --radius-none: 0;
  --radius-sm: 0.125rem;    /* 2px */
  --radius-md: 0.375rem;    /* 6px */
  --radius-lg: 0.5rem;      /* 8px */
  --radius-xl: 0.75rem;     /* 12px */
  --radius-2xl: 1rem;       /* 16px */
  --radius-3xl: 1.5rem;     /* 24px */
  --radius-full: 9999px;
}
```

---

## 8. Shadows

```css
:root {
  /* Light Mode Shadows */
  --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  --shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
  --shadow-none: none;
  
  /* Dark Mode Shadows */
  --shadow-dark-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  --shadow-dark-md: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
  --shadow-dark-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
}
```

---

## 9. Animations & Transitions

```css
:root {
  /* Transition Durations */
  --duration-75: 75ms;
  --duration-100: 100ms;
  --duration-150: 150ms;
  --duration-200: 200ms;
  --duration-300: 300ms;
  --duration-500: 500ms;
  --duration-700: 700ms;
  --duration-1000: 1000ms;
  
  /* Timing Functions */
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Standard Transitions */
.transition-all {
  transition: all var(--duration-200) var(--ease-in-out);
}

.transition-colors {
  transition: background-color var(--duration-200) var(--ease-in-out),
              color var(--duration-200) var(--ease-in-out),
              border-color var(--duration-200) var(--ease-in-out);
}

.transition-opacity {
  transition: opacity var(--duration-200) var(--ease-in-out);
}

.transition-transform {
  transition: transform var(--duration-200) var(--ease-in-out);
}
```

---

## 10. Icons

### Icon System
- **Primary Icon Library:** Lucide Icons (Open source, consistent with Inter font)
- **Icon Sizes:**
  - xs: 12px
  - sm: 16px
  - md: 20px (default)
  - lg: 24px
  - xl: 32px

```css
.icon {
  width: var(--icon-size, 20px);
  height: var(--icon-size, 20px);
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
}

.icon-xs { --icon-size: 12px; }
.icon-sm { --icon-size: 16px; }
.icon-md { --icon-size: 20px; }
.icon-lg { --icon-size: 24px; }
.icon-xl { --icon-size: 32px; }
```

---

## 11. Design Principles

### Visual Hierarchy
1. **Primary Actions:** Green CTA buttons with high contrast
2. **Secondary Actions:** Bordered buttons with subtle hover states
3. **Content:** Clean typography with clear spacing
4. **Navigation:** Minimal, sticky header with essential links

### Accessibility
- **Color Contrast:** All text meets WCAG AA standards
- **Focus States:** Clear visible focus indicators
- **Touch Targets:** Minimum 44x44px for mobile
- **Screen Reader Support:** Semantic HTML and ARIA labels

### Responsive Design
- **Mobile First:** Base styles for mobile, progressive enhancement
- **Fluid Typography:** Scales smoothly between breakpoints
- **Flexible Grids:** 12-column on desktop, 4-column on mobile
- **Touch Optimized:** Larger tap targets on touch devices

---

## 12. Dark Mode Implementation

```css
/* Automatic dark mode based on system preference */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: var(--dark-bg);
    --bg-surface: var(--dark-surface);
    --text-primary: var(--text-primary-dark);
    --text-secondary: var(--text-secondary-dark);
  }
}

/* Manual dark mode toggle */
.dark {
  --bg-primary: var(--dark-bg);
  --bg-surface: var(--dark-surface);
  --text-primary: var(--text-primary-dark);
  --text-secondary: var(--text-secondary-dark);
  --shadow-sm: var(--shadow-dark-sm);
  --shadow-md: var(--shadow-dark-md);
  --shadow-lg: var(--shadow-dark-lg);
}
```

---

## 13. Performance Guidelines

### Optimization Strategies
1. **Font Loading:** Use `font-display: swap` for web fonts
2. **Image Optimization:** WebP with fallbacks, lazy loading
3. **CSS Bundling:** Minimal critical CSS, defer non-critical
4. **Animation Performance:** Use transform and opacity only

### CSS Architecture
```css
/* Base reset and normalization */
@import 'base/reset.css';
@import 'base/typography.css';

/* Design tokens */
@import 'tokens/colors.css';
@import 'tokens/spacing.css';
@import 'tokens/shadows.css';

/* Components */
@import 'components/buttons.css';
@import 'components/cards.css';
@import 'components/forms.css';

/* Utilities */
@import 'utilities/spacing.css';
@import 'utilities/text.css';
@import 'utilities/flex.css';
```

---

## 14. Implementation Notes

### Technology Stack Recommendations
- **CSS Framework:** Tailwind CSS or custom CSS with CSS Variables
- **Build Tool:** Vite or Next.js
- **Component Library:** React/Vue/Svelte with TypeScript
- **Animation:** Framer Motion or CSS transitions
- **Icons:** Lucide React/Vue/Svelte

### File Structure
```
src/
├── styles/
│   ├── base/
│   │   ├── reset.css
│   │   └── typography.css
│   ├── tokens/
│   │   ├── colors.css
│   │   ├── spacing.css
│   │   └── shadows.css
│   ├── components/
│   │   ├── buttons.css
│   │   ├── cards.css
│   │   └── forms.css
│   └── utilities/
│       ├── spacing.css
│       └── flex.css
├── components/
│   ├── Button/
│   ├── Card/
│   └── Input/
└── assets/
    └── fonts/
```

---

## 15. Component Library

### Button Variants
```javascript
// Button component API
<Button 
  variant="primary" // primary | secondary | ghost | danger
  size="md"        // xs | sm | md | lg | xl
  fullWidth={false}
  disabled={false}
  loading={false}
  icon={<IconName />}
  onClick={() => {}}
>
  Button Text
</Button>
```

### Card Component
```javascript
// Card component API
<Card
  variant="elevated" // flat | elevated | bordered
  padding="md"       // none | sm | md | lg
  interactive={false}
  onClick={() => {}}
>
  <CardContent />
</Card>
```

### Input Component
```javascript
// Input component API
<Input
  type="text"      // text | email | password | number
  size="md"        // sm | md | lg
  variant="outline" // outline | filled | flushed
  label="Label"
  placeholder="Placeholder"
  error="Error message"
  helperText="Helper text"
  disabled={false}
  required={false}
  onChange={() => {}}
/>
```

---

## Appendix: Quick Reference

### Most Used Values
```css
/* Primary Colors */
--primary-green: #00A86B;
--primary-dark: #000000;
--primary-white: #FFFFFF;

/* Font Stack */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

/* Common Spacing */
padding: 12px 24px; /* Button padding */
margin-bottom: 16px; /* Element spacing */
gap: 24px; /* Grid/flex gap */

/* Border Radius */
border-radius: 8px; /* Default radius */
border-radius: 12px; /* Card radius */

/* Transitions */
transition: all 0.2s ease;
```

---

## Resources

### Font Resources
- **Inter Font:** https://fonts.google.com/specimen/Inter
- **Inter Display:** https://rsms.me/inter/

### Icon Resources
- **Lucide Icons:** https://lucide.dev/

### Color Tools
- **Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **Color Palette Generator:** https://coolors.co/

---

*This design system document is based on the analysis of ente.io and modern privacy-focused design principles. Update as needed based on your specific implementation requirements.*
