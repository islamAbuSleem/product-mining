---
name: Product Mining
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#434655'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#46566c'
  on-tertiary: '#ffffff'
  tertiary-container: '#5e6e85'
  on-tertiary-container: '#e9f0ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  gutter: 20px
  margin-mobile: 16px
  margin-desktop: 40px
  max-width: 1440px
---

## Brand & Style
The design system is engineered for a high-trust, data-intensive environment. The brand personality is professional, precise, and analytical, evoking the reliability of an institutional fintech platform. It employs a **Corporate / Modern** style characterized by functional clarity, a systematic approach to information density, and a rigorous adherence to grid-based alignment. 

The visual language avoids unnecessary decoration, focusing instead on utility and the reduction of cognitive load. Surfaces are clean, interactions are predictable, and the overall aesthetic communicates a "tool-first" philosophy for power users who require speed and accuracy in product discovery and market analysis.

## Colors
The palette is rooted in a foundation of **Deep Slate** (Secondary) and **Crisp White**, providing a high-contrast environment for data readability. 

- **Primary Blue (#2563eb)**: Reserved for primary actions, active states, and critical progress indicators. It signifies intelligence and momentum.
- **Deep Slate (#0f172a)**: Used for primary headings and navigation elements to provide a grounded, authoritative feel.
- **Slate Grays**: A range of neutral grays are used for secondary text, borders, and subtle backgrounds to establish hierarchy without clutter.
- **Data Accents**: Success green, warning amber, and error red are utilized sparingly for status indicators and analytics trend lines.

## Typography
This design system utilizes **Inter** exclusively to ensure maximum legibility across dense data sets. The typographic scale is highly structured:

- **Headlines**: Use tighter letter-spacing and semi-bold weights to maintain a professional, news-like authority.
- **Body Text**: Optimized for long-form reading and data scanning with generous line heights.
- **Labels**: Small-scale labels use increased letter spacing and uppercase styling for "Category" or "Status" metadata to differentiate them from interactive text.
- **Numerical Data**: When displaying analytics, tabular lining figures should be enabled to ensure columns of numbers align perfectly for comparison.

## Layout & Spacing
The layout follows a **8px linear scale** to ensure mathematical consistency. 

- **Grid**: A 12-column fluid grid is used for desktop (breakpoint 1024px+), transitioning to a 4-column grid for mobile devices.
- **Rhythm**: Vertical rhythm is maintained by using the `md (16px)` spacing unit as the default for container padding and component separation. 
- **Data Density**: For analytical views, a "Compact Mode" is supported which reduces vertical spacing from `md` to `sm` to maximize information density above the fold.
- **Containers**: Content is centered within a max-width of 1440px to prevent excessive line lengths on ultra-wide monitors.

## Elevation & Depth
Hierarchy is established through **Tonal Layers** and **Low-Contrast Outlines** rather than aggressive shadows.

1.  **Level 0 (Background)**: The base canvas uses the Neutral color (#f8fafc).
2.  **Level 1 (Cards/Surfaces)**: Primary content containers use white backgrounds with a 1px border in `slate-200`.
3.  **Level 2 (Interactive/Floating)**: Elements like dropdowns or hovered cards utilize a very soft, highly-diffused shadow (`0px 4px 12px rgba(15, 23, 42, 0.08)`) to suggest lift without breaking the clean, flat aesthetic.
4.  **Insets**: Search inputs and data wells use a subtle inner border or a slightly darker background to indicate they are "carved" into the surface.

## Shapes
The shape language is **Soft (0.25rem)**, reflecting precision and efficient use of space. 

- **Components**: Buttons, input fields, and small chips use the base `rounded` (4px) radius.
- **Large Containers**: Cards and modals may use `rounded-lg` (8px) to provide a slightly softer frame for high-density content.
- **Indicators**: Status dots and specific ranking badges may use "Pill" shapes to distinguish them from standard functional buttons.

## Components
Consistent application of components ensures the "Product Mining" platform remains intuitive:

- **Ranked Deal Cards**: Feature a prominent `title-md` for the product name, a `label-sm` badge for the rank (e.g., #1), and a sparkline visualization for price history. The card uses a 1px `slate-200` border that thickens to 2px `primary-blue` on hover.
- **Search Status Indicators**: Located near the search bar, these use a `label-md` font with a pulsing dot icon. Colors: Blue for "Mining...", Green for "Results Synced."
- **Analytics Visualizations**: Charts should use a thin 2px stroke for lines. Area charts use a 10% opacity fill of the primary blue. Tooltips are dark-themed (`slate-900`) with white text to pop against the light UI.
- **Buttons**:
    - *Primary*: Solid #2563eb with white text. No gradient.
    - *Secondary*: White background with 1px `slate-300` border and `slate-700` text.
- **Input Fields**: Crisp 1px borders. Focus state uses a 2px `primary-blue` ring with 0px offset for a "sharp" focus effect.
- **Data Tables**: Use `body-md` for row content. Header rows use `label-sm` with a light slate background and sticky positioning.