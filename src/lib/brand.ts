/**
 * DNAIT STAGE Brand Colors
 * Source: STAGE_BRANDING_PLAN.md
 *
 * All brand colors are centralized here for consistency.
 * CSS variables are defined in globals.css and mirror these values.
 *
 * TEMA CLARO: Fondo blanco con textos oscuros
 */

export const brand = {
  // Primary colors
  black: '#050505',        // Textos principales, títulos
  lime: '#CDDC39',         // Verde Lima Tennis DNA - Acento primario, CTAs
  green: '#8BC34A',        // Verde Primario - Iconos, secundario
  red: '#C8102E',          // Rojo España - Acento aventura
  white: '#FFFFFF',        // Fondo principal
  gold: '#D4A853',         // Dorado Arena - Tierra batida, premium

  // Background colors (tema claro)
  bg: '#FFFFFF',           // Fondo principal
  bgAlt: '#F8F9FA',        // Fondo alternativo (secciones)
  surface: '#FFFFFF',      // Cards, elevated surfaces
  surfaceHover: '#F3F4F6', // Elevated surfaces on hover

  // Derived colors (for hover states, backgrounds, etc.)
  limeHover: '#B0C033',    // Lime darkened for hover
  greenLight: 'rgba(139, 195, 74, 0.12)',  // Green background
  limeLight: 'rgba(205, 220, 57, 0.15)',   // Lime background
  redLight: 'rgba(200, 16, 46, 0.10)',     // Red background
  goldLight: 'rgba(212, 168, 83, 0.12)',   // Gold background

  // Text colors (tema claro - textos oscuros)
  textPrimary: '#050505',
  textSecondary: '#4B5563',
  textMuted: '#6B7280',
  textDisabled: '#9CA3AF',

  // Border colors (tema claro)
  border: 'rgba(0, 0, 0, 0.10)',
  borderHover: 'rgba(0, 0, 0, 0.20)',

  // Flag colors (USA)
  flagUSBlue: '#002868',
  flagUSRed: '#B22234',
} as const

// Type colors for schedule/activities
export const typeColors = {
  arrival: { color: brand.textSecondary, bg: 'rgba(156, 163, 175, 0.12)' },
  training: { color: brand.lime, bg: brand.limeLight },
  adventure: { color: brand.red, bg: brand.redLight },
  competition: { color: brand.gold, bg: brand.goldLight },
  departure: { color: brand.textSecondary, bg: 'rgba(156, 163, 175, 0.12)' },
} as const

// Team colors for coaches/venues
export const teamColors = {
  tdna: brand.lime,   // Tennis DNA
  ait: brand.red,     // AIT Tenis
} as const

export type BrandColor = keyof typeof brand
