/**
 * Design tokens from the "Design System" page of the MDB Mode Mobile Figma file.
 * https://www.figma.com/design/DcUyknyFD0y3wKuicOvycv/MDB-Mode-Mobile--Copy-?node-id=1-32629
 *
 *   Palette     raw color ramps exactly as defined in Figma
 *   Colors      semantic light/dark colors (what screens should use, via `useTheme()`)
 *   Gradients   background + payout card gradients
 *   Typography  type scale (SF Pro on iOS, Roboto on Android; both are system fonts)
 *   Space       spacing scale, keys mirror Figma's `spacing/*` variables
 *   Radius      corner radii
 */

import '@/global.css';

import { Platform, type TextStyle } from 'react-native';

// ---------------------------------------------------------------------------
// Palette: raw ramps. Steps marked "-" (undefined) in Figma are omitted.
// The outlined swatch in each Figma row is the "key" shade, noted below.
// ---------------------------------------------------------------------------

export const Palette = {
  /** Primary. Key shade: 400 */
  pink: {
    200: '#FE86B3',
    300: '#FE4F94',
    400: '#FD007C',
    500: '#FC0061',
    600: '#EB005F',
    700: '#D5005B',
  },
  /** Secondary. Key shade: 500 */
  purple: {
    300: '#B26DEB',
    400: '#A04DE5',
    500: '#8E2EDF',
    600: '#7E2DD8',
    700: '#642AD0',
    800: '#4A27C9',
  },
  /** Tertiary. Key shade: 300 */
  blue: {
    200: '#71DEFE',
    300: '#00D0FF',
    400: '#00C5FF',
    500: '#00BAFF',
    600: '#00ABF6',
    700: '#0098E3',
  },
  /** Accent. Key shade: 800 */
  gold: {
    400: '#FBED4A',
    500: '#F8E81F',
    600: '#FFDD25',
    700: '#FFC41B',
    800: '#FFAD10',
    900: '#FD8000',
  },
  /** Error. Key shade: 700 */
  red: {
    400: '#FF5535',
    500: '#FF220C',
    600: '#FF1807',
    700: '#FD0400',
    800: '#EF0000',
    900: '#D80000',
  },
  /** Complementary. Key shade: 500 */
  green: {
    300: '#9EF876',
    400: '#80F450',
    500: '#62F01F',
    600: '#4DDE14',
    700: '#29C800',
    800: '#00B400',
  },
  /** Base. Key shade: 200 */
  neutral: {
    0: '#FFFFFF',
    50: '#FCFAFF', // Figma variable value (swatch label reads #FBF9FE)
    100: '#F6F3F9',
    200: '#EEECF1',
    300: '#E0DEE3',
    400: '#BCBABF',
    500: '#9D9BA0',
    600: '#555970',
    700: '#2A3155',
    800: '#1C2037',
    900: '#110D1B', // swatch fill (label in Figma is truncated to "#201F")
    1000: '#090909',
    9999: '#000000',
  },
} as const;

// ---------------------------------------------------------------------------
// Colors: semantic, per color scheme. Values come from the Wallet mockups
// ("Mode iOS Light" / "Mode iOS Dark") on the same page.
// ---------------------------------------------------------------------------

export const Colors = {
  light: {
    primary: Palette.pink[400],
    secondary: Palette.purple[500],
    tertiary: Palette.blue[300],
    accent: Palette.gold[800],
    error: Palette.red[700],
    success: '#00B451',
    onSuccess: '#FFFFFF',

    /** Flat fallback for the radial background gradient. */
    background: Palette.neutral[50],
    /** Cards / list rows. */
    surface: '#FFFFFF',
    /** Header and tab bar. */
    surfaceHighest: '#FFFFFF',
    outline: '#D5D8E7',

    /** Primary text (on-surface). */
    text: Palette.neutral[900],
    /** Supporting text, e.g. "Due in 49 Days". */
    textSecondary: '#2C3048',
    /** Section headers, inactive tab labels (surface-variant). */
    textMuted: Palette.neutral[600],
    /** Text on the purple payout card. */
    textOnGradient: '#F3F5FF',

    // Kept for the Expo template components until they are replaced.
    backgroundElement: '#FFFFFF',
    backgroundSelected: Palette.neutral[200],
  },
  dark: {
    primary: Palette.pink[400],
    secondary: Palette.purple[500],
    tertiary: Palette.blue[300],
    accent: Palette.gold[800],
    error: Palette.red[700],
    success: '#00B451',
    onSuccess: '#FFFFFF',

    background: Palette.neutral[800],
    surface: '#2C3048',
    surfaceHighest: '#2C3048',
    outline: Palette.neutral[600],

    text: '#F3F5FF',
    /** Not defined separately in the dark mockup; uses surface-variant. */
    textSecondary: '#9195AA',
    textMuted: '#9195AA',
    textOnGradient: '#F3F5FF',

    backgroundElement: '#2C3048',
    backgroundSelected: Palette.neutral[700],
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

// ---------------------------------------------------------------------------
// Gradients: stored as plain data (colors + 0..1 stop locations).
// ---------------------------------------------------------------------------

export const Gradients = {
  /** Screen background. Radial gradient, top-right to bottom-left. */
  background: {
    light: {
      colors: ['#FCFAFF', '#EDF0FF', '#FCFAFF'],
      locations: [0, 0.577, 1],
    },
    dark: {
      colors: ['#1C2037', '#1C2037', '#2C3048'],
      locations: [0, 0.577, 1],
    },
  },
  /** "Estimated Payout" card. Linear, ~121deg (top-left to bottom-right). */
  payoutCard: {
    colors: [Palette.purple[800], Palette.purple[600]],
    locations: [0, 1],
    angle: 120.85,
  },
} as const;

// ---------------------------------------------------------------------------
// Fonts: SF Pro (iOS) and Roboto (Android) are the platform system fonts,
// so nothing needs to be loaded.
// ---------------------------------------------------------------------------

export const Fonts = Platform.select({
  ios: {
    /** SF Pro */
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    /** Roboto */
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

// ---------------------------------------------------------------------------
// Typography: sizes / line heights / letter spacing in pt.
// iOS and Android scales are identical except for Button.
// ---------------------------------------------------------------------------

const typeScale = {
  displayLarge: { fontSize: 56, lineHeight: 64, fontWeight: 400 },
  displayMedium: { fontSize: 48, lineHeight: 56, fontWeight: 400 },
  displaySmall: { fontSize: 36, lineHeight: 48, fontWeight: 400 },

  headlineLarge: { fontSize: 32, lineHeight: 40, fontWeight: 400 },
  headlineMedium: { fontSize: 28, lineHeight: 32, fontWeight: 400 },
  headlineSmall: { fontSize: 24, lineHeight: 32, fontWeight: 400 },

  titleLarge: { fontSize: 24, lineHeight: 28, fontWeight: 400 },
  titleMedium: { fontSize: 16, lineHeight: 24, fontWeight: 400 },
  titleSmall: { fontSize: 14, lineHeight: 16, fontWeight: 400 },

  labelLarge: { fontSize: 14, lineHeight: 20, fontWeight: 400, letterSpacing: 0.1 },
  labelMedium: { fontSize: 12, lineHeight: 16, fontWeight: 400, letterSpacing: 0.5 },
  labelSmall: { fontSize: 10, lineHeight: 14, fontWeight: 400, letterSpacing: 0.5 },

  bodyLarge: { fontSize: 16, lineHeight: 24, fontWeight: 400, letterSpacing: 0.5 },
  bodyMedium: { fontSize: 14, lineHeight: 20, fontWeight: 400, letterSpacing: 0.25 },
  bodySmall: { fontSize: 12, lineHeight: 16, fontWeight: 400, letterSpacing: 0.4 },

  buttonSmall: { fontSize: 12, lineHeight: 16, fontWeight: 400, letterSpacing: 0.5 },
} satisfies Record<string, TextStyle>;

const buttonScale = Platform.select({
  ios: {
    buttonLarge: { fontSize: 15, lineHeight: 24, fontWeight: 600, letterSpacing: 0 },
    buttonMedium: { fontSize: 15, lineHeight: 24, fontWeight: 600, letterSpacing: 0 },
  },
  default: {
    buttonLarge: { fontSize: 16, lineHeight: 24, fontWeight: 400, letterSpacing: 0.5 },
    buttonMedium: { fontSize: 14, lineHeight: 24, fontWeight: 400, letterSpacing: 0.5 },
  },
}) satisfies Record<string, TextStyle>;

export const Typography = { ...typeScale, ...buttonScale };

export type TypographyVariant = keyof typeof Typography;

// ---------------------------------------------------------------------------
// Space: keys match Figma variables, e.g. `spacing/2,5` -> Space[2.5] = 20.
// ---------------------------------------------------------------------------

export const Space = {
  0.5: 4,
  1: 8,
  1.5: 12,
  2: 16,
  2.5: 20,
  3: 24,
  4: 32,
} as const;

export const Radius = {
  /** Thumbnails, buttons, chips. */
  small: 8,
  /** Cards (`border-radiuses/large`). */
  large: 16,
  full: 9999,
} as const;

/** Horizontal padding of screen content in the mockups. */
export const ScreenPadding = Space[3];

/**
 * @deprecated Expo template spacing, kept so the starter screens still compile.
 * Use `Space` for new code.
 */
export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
