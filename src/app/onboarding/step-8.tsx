import { useRouter } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { OnboardingLayout, onboardingText } from '@/components/onboarding/onboarding-layout';
import { OutlinedText } from '@/components/onboarding/outlined-text';
import { Space } from '@/constants/theme';

/** Figma: the filled segment is 222 of the 365pt track on screen 8. */
const PROGRESS = 222 / 365;

/** Figma sizes. */
const INTRO_WIDTH = 285;
const STARS_MAX_WIDTH = 343;

export default function OnboardingStep8() {
  const router = useRouter();

  return (
    <OnboardingLayout
      background={require('@/assets/images/onboarding/background-2.png')}
      progress={PROGRESS}
      onNext={() => router.push('/onboarding/step-9')}>
      <Text style={[onboardingText.body, styles.intro]}>{'Class Action\nPayout App'}</Text>
      <OutlinedText style={[onboardingText.bigNumber, styles.rank]} outlineWidth={3} accessibilityRole="header">
        #1
      </OutlinedText>
      <Text
        style={[onboardingText.bigNumber, styles.stars]}
        numberOfLines={1}
        adjustsFontSizeToFit
        accessibilityLabel="5 stars">
        ⭐️⭐⭐⭐⭐
      </Text>
      <Text style={[onboardingText.body, styles.trusted]}>Trusted by thousands of users</Text>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  intro: {
    width: INTRO_WIDTH,
  },
  /** Figma leaves a larger gap above "#1" than the shared gap. */
  rank: {
    marginTop: Space[2],
  },
  /** Five 64pt stars; shrink to fit rather than wrap on narrower phones. */
  stars: {
    maxWidth: STARS_MAX_WIDTH,
    fontSize: 64,
    lineHeight: 76,
    marginTop: Space[2.5],
  },
  trusted: {
    width: INTRO_WIDTH,
  },
});
