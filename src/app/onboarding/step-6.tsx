import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { OnboardingLayout, onboardingText } from '@/components/onboarding/onboarding-layout';
import { Fonts, Palette, Space } from '@/constants/theme';

/** Figma: the filled segment is 153 of the 365pt track on screen 6. */
const PROGRESS = 153 / 365;

/** Figma sizes. */
const CARD_HEIGHT = 136;
const CARD_RADIUS = 20;
const TILE_WIDTH = 108;
const TILE_HEIGHT = 83;
const TILE_RADIUS = 12;
const LOGO_WIDTH = 41;
const LOGO_HEIGHT = 49;
const BADGE_WIDTH = 75;
const BADGE_HEIGHT = 21;

/** Claim card colors from Figma that aren't in the theme (Material 3 scheme colors). */
const CARD_COLOR = '#D0BCFF';
const CARD_BORDER_COLOR = '#EADDFF';
const TILE_BORDER_COLOR = '#6C757E';

export default function OnboardingStep6() {
  const router = useRouter();

  return (
    <OnboardingLayout
      background={require('@/assets/images/onboarding/background-2.png')}
      progress={PROGRESS}
      onNext={() => router.push('/onboarding/step-7')}>
      <View
        style={styles.card}
        accessible
        accessibilityRole="image"
        accessibilityLabel="Example claim: Apple, No Proof, Claim by Aug 10th 2025">
        <View style={styles.tile}>
          <Image
            source={require('@/assets/images/onboarding/logos/apple-white.png')}
            style={styles.logo}
            contentFit="cover"
          />
        </View>
        <View style={styles.details}>
          <View style={styles.titleRow}>
            <Text style={styles.company}>Apple</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>No Proof</Text>
            </View>
          </View>
          <Text style={styles.deadline}>Claim by Aug 10th 2025</Text>
        </View>
      </View>

      <Text style={onboardingText.titleCompact} accessibilityRole="header">
        {'No proof?\nStill eligible!'}
      </Text>
      <Text style={onboardingText.bodyCompact}>
        You can still file a claim if you lost your receipt. If something requires proof, we’ll
        let you know before you file.
      </Text>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: CARD_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    borderWidth: 3,
    borderColor: CARD_BORDER_COLOR,
    borderRadius: CARD_RADIUS,
    backgroundColor: CARD_COLOR,
    /** Figma leaves a larger gap between the card and the title. */
    marginBottom: Space[4] + Space[1],
  },
  tile: {
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: TILE_BORDER_COLOR,
    borderRadius: TILE_RADIUS,
    backgroundColor: Palette.neutral[9999],
  },
  logo: {
    width: LOGO_WIDTH,
    height: LOGO_HEIGHT,
  },
  details: {
    flex: 1,
    marginLeft: 14,
    gap: 10,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space[1.5],
  },
  company: {
    fontFamily: Fonts.sans,
    fontSize: 28,
    lineHeight: 28,
    fontWeight: 700,
    letterSpacing: 0.5,
    color: Palette.neutral[0],
  },
  badge: {
    width: BADGE_WIDTH,
    height: BADGE_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: TILE_RADIUS,
    backgroundColor: Palette.purple[600],
  },
  badgeText: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    lineHeight: BADGE_HEIGHT,
    fontWeight: 700,
    letterSpacing: 0.5,
    color: Palette.neutral[0],
  },
  deadline: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 700,
    color: Palette.neutral[0],
  },
});
