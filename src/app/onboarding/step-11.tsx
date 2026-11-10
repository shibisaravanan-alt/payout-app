import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';

import { LoadingRing } from '@/components/onboarding/loading-ring';
import { OnboardingLayout, onboardingText } from '@/components/onboarding/onboarding-layout';
import { Space } from '@/constants/theme';

/** Figma: the filled segment is 301 of the 365pt track on screen 11. */
const PROGRESS = 301 / 365;
/** How long the loading screen shows before moving on by itself. */
const LOADING_DURATION_MS = 2500;

/** Figma sizes. */
const LOGO_WIDTH = 263;
const LOGO_HEIGHT = 108;
const MESSAGE_WIDTH = 312;

/** Replace rather than push, so going back from the next screen skips the loading screen. */
function goNext(router: ReturnType<typeof useRouter>) {
  // TODO: go to onboarding screen 12 once it exists.
  router.replace('/home');
}

export default function OnboardingStep11() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => goNext(router), LOADING_DURATION_MS);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <OnboardingLayout
      background={require('@/assets/images/onboarding/background-2.png')}
      progress={PROGRESS}
      onNext={() => goNext(router)}>
      <Image
        source={require('@/assets/images/onboarding/mode-mobile-logo.png')}
        style={styles.logo}
        contentFit="cover"
        accessible
        accessibilityLabel="Mode Mobile"
      />
      <Text style={[onboardingText.body, styles.message]} accessibilityLiveRegion="polite">
        Estimating settlements you can claim now!
      </Text>
      <LoadingRing />
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: LOGO_WIDTH,
    height: LOGO_HEIGHT,
  },
  /** Figma puts the message closer to the logo and further from the spinner. */
  message: {
    width: MESSAGE_WIDTH,
    marginTop: -Space[1],
    marginBottom: Space[4] + Space[1],
  },
});
