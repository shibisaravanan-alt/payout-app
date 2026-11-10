import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { OnboardingLayout, onboardingText } from '@/components/onboarding/onboarding-layout';
import { OutlinedText } from '@/components/onboarding/outlined-text';
import { useOnboarding } from '@/components/onboarding/onboarding-provider';
import { BRANDS } from '@/constants/brands';

/** Figma: the progress bar is full on the last screen. */
const PROGRESS = 1;

/** Figma sizes. */
const LOGO_WIDTH = 263;
const LOGO_HEIGHT = 108;
const TEXT_WIDTH = 292;
const GROUP_GAP = 30;

type Brand = (typeof BRANDS)[number];

/** Formats millions as billions with three decimals, e.g. 4822 -> "$4.822 B". */
function formatBillions(millions: number) {
  return `$${(millions / 1000).toFixed(3)} B`;
}

export default function OnboardingStep12() {
  const router = useRouter();
  const { selectedBrandIds } = useOnboarding();

  // If nothing was picked on screen 9, show the total for all brands instead of $0.
  const pickedBrands = BRANDS.filter((brand) => selectedBrandIds.includes(brand.id));
  const brands: readonly Brand[] = pickedBrands.length > 0 ? pickedBrands : BRANDS;
  const totalMillions = brands.reduce((sum, brand) => sum + brand.estimatedPayoutMillions, 0);

  return (
    <OnboardingLayout
      background={require('@/assets/images/onboarding/background-2.png')}
      progress={PROGRESS}
      buttonLabel="Claim My Cash"
      // TODO: go to the real post-onboarding screen once it exists.
      onNext={() => router.replace('/home')}>
      <View style={styles.group}>
        <Image
          source={require('@/assets/images/onboarding/mode-mobile-logo.png')}
          style={styles.logo}
          contentFit="cover"
          accessible
          accessibilityLabel="Mode Mobile"
        />
        <OutlinedText style={[onboardingText.title, styles.amount]} accessibilityRole="header">
          {formatBillions(totalMillions)}
        </OutlinedText>
        <Text style={[onboardingText.body, styles.text]}>
          Brands you selected are estimated to pay this much out to Class Actions
        </Text>
      </View>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  group: {
    alignItems: 'center',
    gap: GROUP_GAP,
  },
  logo: {
    width: LOGO_WIDTH,
    height: LOGO_HEIGHT,
  },
  /** Figma uses SF Pro Black here, not the italic used for other titles. */
  amount: {
    width: '100%',
    maxWidth: TEXT_WIDTH,
    fontStyle: 'normal',
  },
  text: {
    width: '100%',
    maxWidth: TEXT_WIDTH,
  },
});
