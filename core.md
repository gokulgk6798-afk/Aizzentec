# Armory AI — React Design System & Component Guide

> Full design system extracted from armory.framer.ai — includes design tokens, component code, micro-animations, Framer Motion configs, and all responsive breakpoints.

---

## 1. Design Tokens

```js
export const tokens = {
  colors: {
    dark:        '#060606',
    darkSection: '#0a0a0a',
    light:       '#ececec',
    white:       '#ffffff',
    black:       '#060606',
    textLight:   '#ffffff',
    textDark:    '#060606',
    textMuted:   'rgba(255,255,255,0.5)',
    textMutedDark: 'rgba(6,6,6,0.5)',
    accent:      '#4ade80',
    border:      'rgba(255,255,255,0.1)',
    borderDark:  'rgba(6,6,6,0.12)',
    overlay:     'rgba(255,255,255,0.06)',
  },
  fonts: {
    display:   '"Inter Display", sans-serif',
    mono:      '"Geist Mono", monospace',
    body:      '"Inter Display", sans-serif',
    display2:  '"Gasoek One", sans-serif',
    orbitron:  'Orbitron, sans-serif',
  },
  spacing: {
    sectionPadY:  '120px',
    sectionPadX:  '40px',
    tabletPadY:   '80px',
    tabletPadX:   '32px',
    mobilePadY:   '60px',
    mobilePadX:   '20px',
    containerMax: '1440px',
    gridGap:      '1px',
  },
  radius: {
    none: '0px',
    sm:   '4px',
    md:   '8px',
    lg:   '16px',
    xl:   '24px',
    full: '9999px',
  },
  transition: {
    fast:   '0.15s ease',
    base:   '0.25s ease',
    slow:   '0.4s ease-out',
    spring: '0.6s cubic-bezier(0.16, 1, 0.3, 1)',
  },
};
```

---

## 2. Typography System

| Role              | Font Family      | Desktop   | Mobile    | Weight | Letter Spacing | Line Height |
|-------------------|-----------------|-----------|-----------|--------|----------------|-------------|
| H1 (Hero)         | Inter Display    | `80px`    | `54px`    | 400    | `-3%`          | `1em`       |
| H2 (Section)      | Inter Display    | `48px`    | `38px`    | 400    | `-3%`          | `1em`       |
| H3 (Sub-heading)  | Inter Display    | `35px`    | `22px`    | 400    | `-3%`          | `1.1em`     |
| H4 (Card Title)   | Inter Display    | `27px`    | `18px`    | 400    | `-3%`          | `1.2em`     |
| Body              | Inter Display    | `18px`    | `16px`    | 400    | `0`            | `1.5em`     |
| Label (ALL CAPS)  | Geist Mono       | `13px`    | `12px`    | 300    | `+2%`          | `1.5em`     |
| Stat Number       | Inter Display    | `64px`    | `42px`    | 400    | `-3%`          | `1em`       |
| Footer Wordmark   | Gasoek One       | `200px+`  | —         | 400    | `-2%`          | `1em`       |

---

## 3. Layout & Grid

4-column equal-width grid at desktop with 1px separator lines as visible gutters.

---

## 4. Responsive Breakpoints

| Breakpoint | Width    | Padding X |
|------------|----------|-----------|
| Mobile     | ≤ 809px  | `20px`    |
| Tablet     | 810–1199px | `32px`  |
| Desktop    | ≥ 1200px | `40px`    |
| Wide       | 1440px   | `40px`    |

---

## 5. Key Component Patterns

- **Navbar**: Fixed, transparent → blur on scroll, hamburger menu with fullscreen overlay
- **Hero**: Full viewport, background image with gradient overlay, fade-up content
- **CTA Button**: White bg, black text, square corners, 40px height, icon box on left
- **Section Label**: `////` diagonal lines + uppercase mono text
- **Service Cards**: 2-col grid, border-separated, transparent bg, icon + title + description
- **Stats Counter**: Count-up animation on scroll, corner bracket decoration
- **Case Study Cards**: Image with grayscale, hover scale, year badge, hover underline
- **Testimonial Cards**: Horizontal scroll, company logo, star rating, comment
- **FAQ Accordion**: + rotates to × on open, smooth height animation
- **Footer**: Large wordmark in Gasoek One, column links, social icons

---

## 6. Animation Config

```js
const EASE = [0.16, 1, 0.3, 1];
const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
```

- Viewport trigger: `once: true, margin: '-80px'`
- Stagger children: `0.06–0.08s` gap
- Hover: `scale: 1.04` or `y: -6`
- Count-up: `ease-out cubic`, `1.8s` duration
