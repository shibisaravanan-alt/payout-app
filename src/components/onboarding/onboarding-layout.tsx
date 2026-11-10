import { Image, type ImageSource } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, type TextStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ProgressBar } from '@/components/onboarding/progress-bar';
import { Fonts, Palette, Radius, Space, Typography } from '@/constants/theme';

/** Figma text and button widths, so line breaks match the design. */
const TEXT_WIDTH = 282;
const BUTTON_WIDTH = 297;

type OnboardingLayoutProps = {
  background: ImageSource | number;
  /** 0 to 1. Omit to hide the progress bar. */
  progress?: number;
  onNext: () => void;
  /** Defaults to "Next". */
  buttonLabel?: string;
  /** Defaults to the Figma "Next" button width. */
  buttonWidth?: number;
  /** Dims the button and ignores taps, e.g. until the user makes a required choice. */
  nextDisabled?: boolean;
  /** Shown under the button, e.g. terms text. */
  footer?: ReactNode;
  children: ReactNode;
};

/** Shared frame for onboarding screens: background, progress bar, content, button, footer. */
export function OnboardingLayout({
  background,
  progress,
  onNext,
  buttonLabel = 'Next',
  buttonWidth = BUTTON_WIDTH,
  nextDisabled = false,
  footer,
  children,
}: OnboardingLayoutProps) {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Image source={background} style={StyleSheet.absoluteFill} contentFit="cover" />

      <SafeAreaView style={styles.safeArea}>
        {progress !== undefined && <ProgressBar progress={progress} style={styles.progress} />}

        <View style={styles.content}>{children}</View>

        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled: nextDisabled }}
          disabled={nextDisabled}
          onPress={onNext}
          style={({ pressed }) => [
            styles.button,
            { width: buttonWidth },
            pressed && styles.buttonPressed,
            nextDisabled && styles.buttonDisabled,
          ]}>
          <Text style={styles.buttonText}>{buttonLabel}</Text>
        </Pressable>

        {/* Always rendered so the button sits at the same height on every screen. */}
        <View style={styles.footer}>{footer}</View>
      </SafeAreaView>
    </View>
  );
}

const title = {
  width: TEXT_WIDTH,
  fontFamily: Fonts.sans,
  fontSize: 40,
  lineHeight: 40,
  fontWeight: 900,
  fontStyle: 'italic',
  letterSpacing: 2,
  textAlign: 'center',
  color: Palette.neutral[0],
} satisfies TextStyle;

const body = {
  ...Typography.bodyLarge,
  width: TEXT_WIDTH,
  fontFamily: Fonts.sans,
  fontWeight: 700,
  textAlign: 'center',
  color: Palette.neutral[0],
} satisfies TextStyle;

/** Text styles shared by the onboarding screens. */
export const onboardingText = StyleSheet.create({
  emoji: {
    fontSize: 120,
    lineHeight: 144,
    textAlign: 'center',
  },
  /** Screens 1–3 style. */
  title,
  body,
  /**
   * Screens 4 onward: smaller title and tighter body. Figma widths are wider than the
   * content area on smaller phones, so these cap the width instead of fixing it.
   */
  titleCompact: {
    ...title,
    width: '100%',
    maxWidth: 343,
    fontSize: 30,
  },
  bodyCompact: {
    ...body,
    width: '100%',
    maxWidth: 348,
    lineHeight: 20,
  },
  /** Huge black-italic figure with a drop shadow, e.g. "$397" and "#1". */
  bigNumber: {
    ...title,
    width: '100%',
    fontSize: 96,
    /** Figma's 40pt line height would clip a 96pt glyph in React Native. */
    lineHeight: 110,
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.neutral[0],
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Space[4] + Space[1],
  },
  progress: {
    marginTop: Space[1],
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Space[3],
  },
  button: {
    alignSelf: 'center',
    paddingVertical: 19,
    borderRadius: Radius.full,
    backgroundColor: Palette.neutral[0],
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontFamily: Fonts.sans,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: 600,
    color: Palette.purple[600],
  },
  footer: {
    minHeight: Space[4] * 2,
    paddingTop: Space[2],
    alignItems: 'center',
  },
});
