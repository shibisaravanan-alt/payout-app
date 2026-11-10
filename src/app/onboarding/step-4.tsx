import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { OnboardingLayout, onboardingText } from '@/components/onboarding/onboarding-layout';
import { OutlinedText } from '@/components/onboarding/outlined-text';
import { Palette, Radius, Space } from '@/constants/theme';

/** Figma: the filled segment is 96 of the 365pt track on screen 4. */
const PROGRESS = 96 / 365;

/** Figma sizes. */
const CIRCLE_SIZE = 93;
const CLUSTER_WIDTH = 334;
const CLUSTER_HEIGHT = 243;

/**
 * Logo circles at their Figma positions, relative to the cluster's top-left corner.
 * `image` is the logo's size and offset inside its circle (the circle clips it).
 */
const LOGOS = [
  {
    name: 'Apple',
    source: require('@/assets/images/onboarding/logos/apple.png'),
    left: 0,
    top: 47,
    image: { size: 59, left: 17, top: 17 },
  },
  {
    name: 'Spotify',
    source: require('@/assets/images/onboarding/logos/spotify.png'),
    left: 127,
    top: 0,
    image: { size: 126, left: -16, top: -16 },
  },
  {
    name: 'Pepsi',
    source: require('@/assets/images/onboarding/logos/pepsi.png'),
    left: 241,
    top: 38,
    image: { size: 126, left: -16, top: 0 },
  },
  {
    name: 'Instagram',
    source: require('@/assets/images/onboarding/logos/instagram.png'),
    left: 73,
    top: 150,
    image: { size: 101, left: -4, top: -4 },
  },
  {
    name: 'Fortnite',
    source: require('@/assets/images/onboarding/logos/fortnite.png'),
    left: 190,
    top: 146,
    image: { size: 101, left: -4, top: -4 },
  },
];

export default function OnboardingStep4() {
  const router = useRouter();

  return (
    <OnboardingLayout
      background={require('@/assets/images/onboarding/background-2.png')}
      progress={PROGRESS}
      onNext={() => router.push('/onboarding/step-5')}>
      <View
        style={styles.cluster}
        accessible
        accessibilityRole="image"
        accessibilityLabel={`Company logos: ${LOGOS.map((logo) => logo.name).join(', ')}`}>
        {LOGOS.map((logo) => (
          <View key={logo.name} style={[styles.circle, { left: logo.left, top: logo.top }]}>
            <Image
              source={logo.source}
              contentFit="cover"
              style={{
                position: 'absolute',
                width: logo.image.size,
                height: logo.image.size,
                left: logo.image.left,
                top: logo.image.top,
              }}
            />
          </View>
        ))}
      </View>
      <OutlinedText style={onboardingText.titleCompact} accessibilityRole="header">
        New Settlements to claim every week
      </OutlinedText>
      <Text style={onboardingText.bodyCompact}>
        Many of the largest companies often pay penalties for misleading people. ModeMobile
        finds and organizes these opportunities for you to claim your cash.
      </Text>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  cluster: {
    width: CLUSTER_WIDTH,
    height: CLUSTER_HEIGHT,
    /** Figma leaves a larger gap between the logos and the title. */
    marginBottom: Space[4] + Space[3],
  },
  circle: {
    position: 'absolute',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: Radius.full,
    backgroundColor: Palette.neutral[0],
    overflow: 'hidden',
  },
});
