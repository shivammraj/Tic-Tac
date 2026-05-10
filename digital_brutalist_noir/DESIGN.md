---
name: Digital Brutalist Noir
colors:
  surface: '#131411'
  surface-dim: '#131411'
  surface-bright: '#3a3936'
  surface-container-lowest: '#0e0e0c'
  surface-container-low: '#1c1c19'
  surface-container: '#20201d'
  surface-container-high: '#2a2a27'
  surface-container-highest: '#353532'
  on-surface: '#e5e2dd'
  on-surface-variant: '#e1bebc'
  inverse-surface: '#e5e2dd'
  inverse-on-surface: '#31302d'
  outline: '#a98987'
  outline-variant: '#59413f'
  surface-tint: '#ffb3ae'
  primary: '#ffb3ae'
  on-primary: '#68000c'
  primary-container: '#f85b58'
  on-primary-container: '#5c0009'
  inverse-primary: '#b3282c'
  secondary: '#a4c9ff'
  on-secondary: '#00315d'
  secondary-container: '#005398'
  on-secondary-container: '#a3c8ff'
  tertiary: '#ffb95d'
  on-tertiary: '#462a00'
  tertiary-container: '#c98100'
  on-tertiary-container: '#3d2400'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad7'
  primary-fixed-dim: '#ffb3ae'
  on-primary-fixed: '#410004'
  on-primary-fixed-variant: '#900a18'
  secondary-fixed: '#d4e3ff'
  secondary-fixed-dim: '#a4c9ff'
  on-secondary-fixed: '#001c39'
  on-secondary-fixed-variant: '#004883'
  tertiary-fixed: '#ffddb7'
  tertiary-fixed-dim: '#ffb95d'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#131411'
  on-background: '#e5e2dd'
  surface-variant: '#353532'
typography:
  display-xl:
    fontFamily: Black Han Sans
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg:
    fontFamily: Black Han Sans
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Space Mono
    fontSize: 20px
    fontWeight: '700'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Space Mono
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Space Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Space Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.1em
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  grid-gap: 12px
  container-padding: 24px
---

## Brand & Style

This design system establishes a high-performance, technical aesthetic for a competitive gaming environment. It blends **Digital Brutalism** with **Modern Minimalism**, utilizing a monochromatic base to allow the primary game tokens (X and O) to serve as the functional highlights of the interface. 

The personality is precise, unsentimental, and focused. By using monospaced typography and sharp, heavy borders, the UI evokes a developer-centric or "terminal" vibe, reimagining a classic childhood game as a sophisticated strategic tool. The emotional response is one of clarity and intentionality—removing all decorative clutter to prioritize the "move."

## Colors

The palette is anchored in a "Pure Black" environment to maximize OLED efficiency and visual depth. 

- **The Void (Background):** Used for the base canvas to ensure elements appear to float or sit deeply recessed.
- **Surface & Borders:** These define the structural grid. Borders are visible but muted, creating a blueprint-like appearance.
- **Functional Accents:** Red (X) and Blue (O) are saturated but balanced for accessibility. Amber is reserved strictly for draws or cautionary states, ensuring high semantic clarity.
- **Typography:** Warm white is used for primary readability to reduce harsh contrast glare, while muted gray handles meta-data and inactive states.

## Typography

This design system utilizes a dual-type approach:
1. **Black Han Sans** acts as the heavy-weight anchor for branding and victory states. Its chunky, geometric forms provide a sense of impact and finality.
2. **Space Mono** provides the functional layer. As a monospaced font, it reinforces the technical, grid-based nature of the game, ensuring that numbers and characters align perfectly in scoreboards and settings.

All labels should default to uppercase to lean into the brutalist aesthetic.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy for the game board, ensuring the 3x3 matrix remains the focal point across all devices. 

- **Mobile:** Elements stack vertically with a 24px side margin. The game board occupies the full width minus margins.
- **Desktop/Tablet:** The board is capped at 480px, centered horizontally.
- **Spacing Rhythm:** Based on a 4px baseline. Most internal padding for components should use 16px (md) to maintain a spacious, minimal feel despite the heavy borders.

## Elevation & Depth

This system avoids shadows entirely, relying on **Tonal Layering** and **High-Contrast Outlines** to communicate hierarchy.

- **Level 0 (Background):** #0D0D0D.
- **Level 1 (Cards/Cells):** #1A1A1A with a 1px solid border of #2A2A2A.
- **Level 2 (Overlays/Modals):** #1A1A1A with a thicker 2px border of #F0EDE8 to signify prominence.

Interactive elements do not "lift" off the page; instead, they change border color or background fill (e.g., a cell becomes #2A2A2A on hover/press) to simulate tactile feedback through color rather than light.

## Shapes

The design system adopts a **Sharp (0px)** philosophy. All cells, buttons, and badges use 90-degree angles. This reinforces the "Terminal" and "Brutalist" influence, suggesting a structural rigidity that aligns with the logic-based nature of Tic-Tac-Toe. 

The only exception to the "sharp" rule is the X and O glyphs themselves, which should retain their inherent geometric forms (lines and circles) to remain recognizable icons.

## Components

### GameCell
A square container (#1A1A1A) with a 1px border (#2A2A2A). When an X or O is placed, the glyph should occupy 60% of the cell's height. An empty cell shows a subtle #2A2A2A plus-sign in the center on hover.

### TurnIndicator
A horizontal bar divided into two halves. The active side is filled with the respective color (Red for X, Blue for O) and uses `label-caps` text. The inactive side remains #1A1A1A with muted gray text.

### ScorePill
A small rectangular badge with a solid background of #2A2A2A. The numeric value uses `headline-md` in the team's respective color (Red or Blue).

### PrimaryButton & OutlineButton
- **Primary:** Background #F0EDE8, Text #0D0D0D. High contrast for critical actions like "Play Again."
- **Outline:** Background transparent, 1px Border #F0EDE8, Text #F0EDE8. Used for secondary actions like "Main Menu."

### SettingsRow
A full-width layout with an icon on the left, `body-lg` label in the center, and a toggle or value-switcher on the right. Separated by a 1px bottom border (#2A2A2A).

### WinResultCard
A full-screen overlay with a 0.9 opacity #0D0D0D background. The central card uses `display-xl` for the result text (e.g., "X WINS") colored in the winner's primary hex.