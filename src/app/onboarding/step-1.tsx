import { useRouter } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { OnboardingLayout, onboardingText } from '@/components/onboarding/onboarding-layout';

/** Figma: the filled segment is 30 of the 365pt track on screen 1. */
const PROGRESS = 30 / 365;

export default function OnboardingStep1() {
  const router = useRouter();

  return (
    <OnboardingLayout
      background={require('@/assets/images/onboarding/background.png')}
      progress={PROGRESS}
      onNext={() => router.push('/onboarding/step-2')}>
      <Text style={onboardingText.emoji} accessible={false}>
        👩‍⚖️
      </Text>
      <Text style={onboardingText.title} accessibilityRole="header">
        Class Action Settlements
      </Text>
      <Text style={[onboardingText.body, styles.body]}>
        Are when companies have to pay money to customers because they may have done
        something wrong or illegal.
      </Text>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  /** Screen 1 uses Figma's "normal" line height rather than the body-large token. */
  body: {
    lineHeight: 20,
  },
});
