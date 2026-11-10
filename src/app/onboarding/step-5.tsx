import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { OnboardingLayout, onboardingText } from '@/components/onboarding/onboarding-layout';
import { OutlinedText } from '@/components/onboarding/outlined-text';
import { Fonts, Palette, Radius, Space } from '@/constants/theme';

/** Figma: the filled segment is 128 of the 365pt track on screen 5. */
const PROGRESS = 128 / 365;

/** Figma sizes. */
const FRONT_CARD_HEIGHT = 75;
const BACK_CARD_HEIGHT = 70;
/** The back card sits 41pt lower and 31pt narrower on each side than the front card. */
const BACK_CARD_OFFSET_Y = 41;
const BACK_CARD_INSET_X = 31;
const LOGO_WIDTH = 44;
const LOGO_HEIGHT = 18;

/** Notification card colors from Figma that aren't in the theme. */
const TIMESTAMP_COLOR = '#6C757E';
const CARD_SHADOW = '0px 4px 4px 0px rgba(0, 0, 0, 0.25)';

const logo = require('@/assets/images/onboarding/mode-mobile-logo.png');

function AppIcon({ size }: { size: { width: number; height: number } }) {
  return (
    <View style={[styles.appIcon, size]}>
      <Image source={logo} style={styles.appIconLogo} contentFit="cover" />
    </View>
  );
}

export default function OnboardingStep5() {
  const router = useRouter();

  return (
    <OnboardingLayout
      background={require('@/assets/images/onboarding/background-2.png')}
      progress={PROGRESS}
      onNext={() => router.push('/onboarding/step-6')}>
      <Text style={[onboardingText.emoji, styles.emoji]} accessible={false}>
        🔔
      </Text>

      <View
        style={styles.cards}
        accessible
        accessibilityRole="image"
        accessibilityLabel="Example notifications: New $10 Claim! We're holding your spot. You just got paid $35.">
        {/* Back card, partly hidden behind the front card. */}
        <View style={[styles.card, styles.backCard]}>
          <AppIcon size={{ width: 51, height: 52 }} />
          <Text style={styles.backCardText}>You just got paid $35</Text>
        </View>

        <View style={[styles.card, styles.frontCard]}>
          <AppIcon size={{ width: 54, height: 54 }} />
          <View style={styles.frontCardText}>
            <Text style={styles.notificationTitle}>New $10 Claim!</Text>
            <Text style={styles.notificationBody}>We’re holding your spot</Text>
          </View>
          <Text style={styles.timestamp}>9:31 AM</Text>
        </View>
      </View>

      <OutlinedText style={onboardingText.titleCompact} accessibilityRole="header">
        We find and track everything for you
      </OutlinedText>
      <Text style={onboardingText.bodyCompact}>
        When a new settlement opens, we’ll let you know. If you’re eligible, you can use
        ModeMobile for easy filing and skip the headache
      </Text>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  emoji: {
    fontSize: 100,
    lineHeight: 120,
  },
  /** Holds both cards; tall enough for the back card peeking out below the front one. */
  cards: {
    width: '100%',
    height: BACK_CARD_OFFSET_Y + BACK_CARD_HEIGHT,
    /** Figma leaves a larger gap between the cards and the title. */
    marginBottom: Space[1.5],
  },
  card: {
    position: 'absolute',
    flexDirection: 'row',
    borderRadius: Radius.large,
    backgroundColor: Palette.neutral[0],
    boxShadow: CARD_SHADOW,
  },
  frontCard: {
    top: 0,
    left: 0,
    right: 0,
    height: FRONT_CARD_HEIGHT,
    alignItems: 'center',
    paddingLeft: 15,
  },
  backCard: {
    top: BACK_CARD_OFFSET_Y,
    left: BACK_CARD_INSET_X,
    right: BACK_CARD_INSET_X,
    height: BACK_CARD_HEIGHT,
    alignItems: 'flex-end',
    paddingLeft: Space[1.5],
    paddingBottom: 10,
  },
  appIcon: {
    borderRadius: Radius.small,
    backgroundColor: Palette.purple[600],
    alignItems: 'center',
    justifyContent: 'center',
  },
  appIconLogo: {
    width: LOGO_WIDTH,
    height: LOGO_HEIGHT,
  },
  frontCardText: {
    flex: 1,
    marginLeft: 13,
    gap: Space[0.5],
  },
  notificationTitle: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 800,
    color: Palette.neutral[9999],
  },
  notificationBody: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 24,
    color: Palette.neutral[9999],
  },
  timestamp: {
    position: 'absolute',
    top: 5,
    right: 21,
    fontFamily: Fonts.sans,
    fontSize: 14,
    lineHeight: 24,
    color: TIMESTAMP_COLOR,
  },
  backCardText: {
    marginLeft: 6,
    fontFamily: Fonts.sans,
    fontSize: 14,
    lineHeight: 24,
    color: Palette.neutral[9999],
  },
});
