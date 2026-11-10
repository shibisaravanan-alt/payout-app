import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { OnboardingLayout, onboardingText } from '@/components/onboarding/onboarding-layout';
import { Fonts, Palette, Space } from '@/constants/theme';

/** Figma: the filled segment is 188 of the 365pt track on screen 7. */
const PROGRESS = 188 / 365;

/** Figma sizes. */
const INTRO_WIDTH = 285;
const CARD_MAX_WIDTH = 345;
const CARD_RADIUS = 20;
const AVATAR_SIZE = 54;

/** Testimonial card border from Figma that isn't in the theme (Material 3 scheme color). */
const CARD_BORDER_COLOR = '#EADDFF';

export default function OnboardingStep7() {
  const router = useRouter();

  return (
    <OnboardingLayout
      background={require('@/assets/images/onboarding/background-2.png')}
      progress={PROGRESS}
      // TODO: go to onboarding screen 8 once it exists.
      onNext={() => router.push('/home')}>
      <Text style={[onboardingText.body, styles.intro]}>
        {'On a yearly average\nyou are owed'}
      </Text>
      <Text style={[onboardingText.title, styles.amount]} accessibilityRole="header">
        $397
      </Text>

      <View
        style={styles.card}
        accessible
        accessibilityLabel="Review from John D., 5 stars, claimed $41 last month: “It’s like finding money on the ground every single week!”">
        <View style={styles.header}>
          <View style={styles.avatar} />
          <View style={styles.reviewer}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>John D.</Text>
              <Text style={styles.stars}>⭐️⭐⭐⭐⭐</Text>
            </View>
            <Text style={styles.claimed}>Claimed $41 last month</Text>
          </View>
        </View>
        <Text style={styles.quote}>
          “It’s like finding money on the ground every single week!”
        </Text>
      </View>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  intro: {
    width: INTRO_WIDTH,
  },
  amount: {
    width: '100%',
    fontSize: 96,
    /** Figma's 40pt line height would clip a 96pt glyph in React Native. */
    lineHeight: 110,
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    /** Figma leaves a larger gap between the amount and the card. */
    marginBottom: Space[1.5],
  },
  card: {
    width: '100%',
    maxWidth: CARD_MAX_WIDTH,
    paddingTop: 21,
    paddingLeft: Space[2],
    paddingRight: 25,
    paddingBottom: 29,
    borderWidth: 3,
    borderColor: CARD_BORDER_COLOR,
    borderRadius: CARD_RADIUS,
    backgroundColor: Palette.purple[600],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: Palette.neutral[0],
  },
  reviewer: {
    flex: 1,
    marginLeft: Space[1],
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 800,
    letterSpacing: 0.25,
    color: Palette.neutral[0],
  },
  stars: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.75,
  },
  claimed: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.25,
    color: Palette.neutral[0],
  },
  quote: {
    marginTop: 25,
    marginLeft: 9,
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 700,
    letterSpacing: 0.25,
    color: Palette.neutral[0],
  },
});
