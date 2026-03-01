# Animation Timing Reference

## CSS Easing Functions

### Smooth (Natural deceleration)
```css
cubic-bezier(0.4, 0, 0.2, 1)
```
Best for: General purpose fade-in, slide-in, content reveals. Feels natural and unobtrusive.

### Bouncy (Overshoot and settle)
```css
cubic-bezier(0.34, 1.56, 0.64, 1)
```
Best for: Playful UIs, notification badges, achievement unlocks. The overshoot creates a "pop" effect.

### Snappy (Quick and responsive)
```css
cubic-bezier(0.25, 0.1, 0.25, 1)
```
Best for: Responsive feedback, toggles, tabs, dropdowns. Feels immediate and crisp.

### Cinematic (Dramatic entrance)
```css
cubic-bezier(0.16, 1, 0.3, 1)
```
Best for: Hero sections, full-page reveals, product showcases. Slow start with elegant finish.

## Framer Motion Equivalents

```tsx
// Smooth
const smooth = { type: "tween", ease: [0.4, 0, 0.2, 1], duration: 0.5 }

// Bouncy
const bouncy = { type: "spring", stiffness: 300, damping: 15 }

// Snappy
const snappy = { type: "tween", ease: [0.25, 0.1, 0.25, 1], duration: 0.25 }

// Cinematic
const cinematic = { type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.8 }
```

## Duration Guidelines

| Element Type         | Recommended Duration | Notes                            |
|----------------------|----------------------|----------------------------------|
| Hover state          | 150–300ms            | Must feel instant                |
| Button feedback      | 100–200ms            | Press should feel responsive     |
| Dropdown open        | 200–300ms            | Quick but visible                |
| Modal appear         | 250–400ms            | Noticeable entrance              |
| Hero entrance        | 500–1000ms           | Dramatic but not slow            |
| Page transition      | 300–500ms            | Seamless navigation              |
| Scroll reveal        | 400–700ms            | Smooth entrance on scroll        |

## Stagger Patterns

### Row-by-row stagger (cards)
```tsx
// Framer Motion
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 }
  }
}

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0 }
}
```

### Cascade stagger (hero elements)
```tsx
// Title → Subtitle → CTA with increasing delays
<motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }} />
<motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} />
<motion.button initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.32 }} />
```

## Reduced Motion Pattern

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```tsx
// Framer Motion hook
import { useReducedMotion } from "framer-motion"

function Component() {
  const shouldReduceMotion = useReducedMotion()
  return (
    <motion.div
      animate={{ opacity: 1, y: shouldReduceMotion ? 0 : 20 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
    />
  )
}
```

## GPU-Accelerated Properties

**Safe to animate (GPU-composited):**
- `transform` (translate, scale, rotate)
- `opacity`
- `filter` (blur, brightness — use sparingly)

**Avoid animating (triggers layout/paint):**
- `width`, `height`
- `top`, `right`, `bottom`, `left`
- `margin`, `padding`
- `border-width`
- `font-size`

## Intersection Observer Pattern

```tsx
// Framer Motion (preferred in Lovable)
<motion.div
  initial={{ opacity: 0, y: 25 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
>
  {children}
</motion.div>
```

```tsx
// Vanilla Intersection Observer (fallback)
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.2 }
)
```
