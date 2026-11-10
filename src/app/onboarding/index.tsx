import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { OnboardingLayout } from '@/components/onboarding/onboarding-layout';
import { Fonts, Palette, Typography } from '@/constants/theme';

/** Figma sizes. */
const LOGO_WIDTH = 263;
const LOGO_HEIGHT = 108;
const BUTTON_WIDTH = 305;
const FOOTER_WIDTH = 299;

/** Figma screen 3: the welcome screen that starts onboarding. */
export default function OnboardingWelcome() {
  const router = useRouter();

  return (
    <OnboardingLayout
      background={require('@/assets/images/onboarding/background-2.png')}
      buttonLabel="Get Started"
      buttonWidth={BUTTON_WIDTH}
      onNext={() => router.push('/onboarding/step-1')}
      footer={
        <Text style={styles.terms}>
          by continuing you agree to our{' '}
          {/* TODO: open the Terms of Use and Class Action Terms once their URLs are known. */}
          <Text style={styles.termsLink}>Terms of Use</Text> and{' '}
          <Text style={styles.termsLink}>Class Action Terms</Text>
        </Text>
      }>
      <Image
        source={require('@/assets/images/onboarding/mode-mobile-logo.png')}
        style={styles.logo}
        contentFit="cover"
        accessible
        accessibilityLabel="Mode Mobile"
      />
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: LOGO_WIDTH,
    height: LOGO_HEIGHT,
  },
  terms: {
    ...Typography.bodyLarge,
    width: FOOTER_WIDTH,
    fontFamily: Fonts.sans,
    fontWeight: 500,
    textAlign: 'center',
    color: Palette.neutral[0],
  },
  termsLink: {
    textDecorationLine: 'underline',
  },
});
