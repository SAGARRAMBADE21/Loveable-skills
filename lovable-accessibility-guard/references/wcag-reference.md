# WCAG 2.1 Quick Reference

## Contrast Ratio Requirements

### Level AA
| Element                          | Minimum Ratio |
|----------------------------------|---------------|
| Normal text (< 18pt / < 14pt bold) | 4.5:1       |
| Large text (≥ 18pt / ≥ 14pt bold)  | 3:1         |
| UI components & graphical objects  | 3:1         |

### Level AAA
| Element                          | Minimum Ratio |
|----------------------------------|---------------|
| Normal text                      | 7:1           |
| Large text                       | 4.5:1         |
| UI components & graphical objects  | 3:1         |

## Common Tailwind + Color Contrast Issues

### Problematic Combinations (fail AA)
```
text-gray-400 on bg-white         → 2.6:1  ❌
text-gray-400 on bg-gray-50       → 2.4:1  ❌
text-blue-400 on bg-white         → 3.0:1  ❌
text-purple-400 on bg-white       → 3.1:1  ❌
```

### Safe Combinations (pass AA)
```
text-gray-600 on bg-white         → 5.7:1  ✅
text-gray-700 on bg-white         → 8.6:1  ✅
text-gray-400 on bg-gray-900      → 5.6:1  ✅
text-blue-700 on bg-white         → 5.4:1  ✅
text-purple-700 on bg-white       → 6.1:1  ✅
```

## ARIA Roles Quick Reference

### Landmark Roles (HTML5 equivalents preferred)
| ARIA Role        | HTML5 Element | Usage                    |
|------------------|---------------|--------------------------|
| `role="banner"`  | `<header>`    | Page header              |
| `role="navigation"` | `<nav>`    | Navigation area          |
| `role="main"`    | `<main>`      | Primary content          |
| `role="complementary"` | `<aside>` | Supporting content     |
| `role="contentinfo"` | `<footer>` | Page footer             |

### Widget Roles
| Role             | ARIA States                    | Keyboard              |
|------------------|--------------------------------|------------------------|
| `role="button"`  | `aria-pressed`, `aria-expanded` | Enter, Space          |
| `role="tab"`     | `aria-selected`                 | Arrow L/R, Home, End  |
| `role="tabpanel"` | `aria-labelledby`              | Tab into panel        |
| `role="dialog"`  | `aria-modal`, `aria-labelledby` | Escape to close       |
| `role="alert"`   | `aria-live="assertive"`         | Auto-announced        |
| `role="status"`  | `aria-live="polite"`            | Polite announcement   |

## shadcn/ui + Radix Accessibility Built-ins

Components that already include accessibility features:

| Component       | Built-in a11y                                        |
|-----------------|------------------------------------------------------|
| Dialog          | Focus trap, Escape close, aria-modal, portal          |
| DropdownMenu    | Arrow key navigation, typeahead, Escape close         |
| Select          | Arrow keys, typeahead, screen reader announcements    |
| Tabs            | Arrow key navigation, aria-selected, tabpanel linking |
| Switch          | aria-checked, keyboard toggle                        |
| Checkbox        | aria-checked, label association                      |
| Tooltip         | Keyboard accessible, proper role                     |
| AlertDialog     | Focus trap, required action, aria-describedby         |

**Common mistake**: Overriding Radix defaults breaks accessibility. Never replace Dialog with a custom modal div. Never replace Select with a styled div dropdown.

## Skip Link Implementation

```tsx
// Add as first element inside <body> or root layout
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded focus:shadow-lg"
>
  Skip to main content
</a>

// Add id to main content area
<main id="main-content">
  {/* page content */}
</main>
```

## Focus Style Pattern

```css
/* Global focus style */
:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

/* Never do this without replacement */
/* ❌ :focus { outline: none; } */
```

## Reduced Motion CSS Pattern

```css
@media (prefers-reduced-motion: no-preference) {
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Testing Checklist

- [ ] Tab through entire page — all interactive elements reachable
- [ ] Focus indicator visible on every element
- [ ] Screen reader announces all content meaningfully
- [ ] Color contrast passes (use browser DevTools audit)
- [ ] Page usable at 200% zoom
- [ ] No keyboard traps
- [ ] Modals trap focus and close with Escape
- [ ] Images have appropriate alt text
- [ ] Forms have proper labels and error messages
- [ ] Animations respect prefers-reduced-motion
