import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ProgressBar } from '@/components/onboarding/progress-bar';
import { Fonts, Palette, Radius, Space, Typography } from '@/constants/theme';

/** Figma: the filled segment is 30 of the 365pt track on screen 1. */
const PROGRESS = 30 / 365;
/** Figma text and button widths, so line breaks match the design. */
const TEXT_WIDTH = 282;
const BUTTON_WIDTH = 297;

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Image
        source={require('@/assets/images/onboarding/background.png')}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />

      <SafeAreaView style={styles.safeArea}>
        <ProgressBar progress={PROGRESS} style={styles.progress} />

        <View style={styles.content}>
          <Text style={styles.emoji} accessible={false}>
            👩‍⚖️
          </Text>
          <Text style={styles.title} accessibilityRole="header">
            Class Action Settlements
          </Text>
          <Text style={styles.body}>
            Are when companies have to pay money to customers because they may have done
            something wrong or illegal.
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          // TODO: go to onboarding screen 2 once it exists.
          onPress={() => router.push('/home')}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

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
    lineHeight: 20,
    textAlign: 'center',
    color: Palette.neutral[0],
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
