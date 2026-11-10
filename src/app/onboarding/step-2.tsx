import { useRouter } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { OnboardingLayout, onboardingText } from '@/components/onboarding/onboarding-layout';
import { Space } from '@/constants/theme';

/** Figma: the filled segment is 64 of the 365pt track on screen 2. */
const PROGRESS = 64 / 365;
/** Figma width of the intro text box. */
const INTRO_WIDTH = 285;

export default function OnboardingStep2() {
  const router = useRouter();

  return (
    <OnboardingLayout
      background={require('@/assets/images/onboarding/background-2.png')}
      progress={PROGRESS}
      onNext={() => router.push('/onboarding/step-3')}>
      <Text style={[onboardingText.body, styles.intro]}>
        {'Last year people\nlike you were awarded'}
      </Text>
      <Text style={[onboardingText.emoji, styles.emoji]} accessible={false}>
        💰
      </Text>
      <Text style={onboardingText.title} accessibilityRole="header">
        $1.3 Billion
      </Text>
      <Text style={[onboardingText.body, styles.body]}>
        Companies have to pay money to customers, but it is up to the people to claim the
        reward.
      </Text>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  intro: {
    width: INTRO_WIDTH,
  },
  /** Figma places the title closer to the emoji than the shared gap. */
  emoji: {
    marginBottom: -Space[1.5],
  },
  /** Figma leaves a larger gap between the title and description on this screen. */
  body: {
    marginTop: Space[2.5],
  },
});
