import { Image, type ImageSource } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ProgressBar } from '@/components/onboarding/progress-bar';
import { Fonts, Palette, Radius, Space, Typography } from '@/constants/theme';

/** Figma text and button widths, so line breaks match the design. */
const TEXT_WIDTH = 282;
const BUTTON_WIDTH = 297;

type OnboardingLayoutProps = {
  background: ImageSource | number;
  /** 0 to 1. */
  progress: number;
  onNext: () => void;
  children: ReactNode;
};

/** Shared frame for onboarding screens: background, progress bar, content, Next button. */
export function OnboardingLayout({ background, progress, onNext, children }: OnboardingLayoutProps) {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Image source={background} style={StyleSheet.absoluteFill} contentFit="cover" />

      <SafeAreaView style={styles.safeArea}>
        <ProgressBar progress={progress} style={styles.progress} />

        <View style={styles.content}>{children}</View>

        <Pressable
          accessibilityRole="button"
          onPress={onNext}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

/** Text styles shared by the onboarding screens. */
export const onboardingText = StyleSheet.create({
  emoji: {
    fontSize: 120,
    lineHeight: 144,
    textAlign: 'center',
  },
  title: {
    width: TEXT_WIDTH,
    fontFamily: Fonts.sans,
    fontSize: 40,
    lineHeight: 40,
    fontWeight: 900,
    fontStyle: 'italic',
    letterSpacing: 2,
    textAlign: 'center',
    color: Palette.neutral[0],
  },
  body: {
    ...Typography.bodyLarge,
    width: TEXT_WIDTH,
    fontFamily: Fonts.sans,
    fontWeight: 700,
    textAlign: 'center',
    color: Palette.neutral[0],
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
    width: BUTTON_WIDTH,
    marginBottom: Space[4] * 2,
    paddingVertical: 19,
    borderRadius: Radius.full,
    backgroundColor: Palette.neutral[0],
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    fontFamily: Fonts.sans,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: 600,
    color: Palette.purple[600],
  },
});
