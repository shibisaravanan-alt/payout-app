import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { OnboardingLayout } from '@/components/onboarding/onboarding-layout';
import { useOnboarding } from '@/components/onboarding/onboarding-provider';
import { BRANDS } from '@/constants/brands';
import { Fonts, Palette, Space, Typography } from '@/constants/theme';

/** Figma: the filled segment is 222 of the 365pt track (same as screen 8). */
const PROGRESS = 222 / 365;

/** Figma sizes. */
const HEADING_WIDTH = 323;
const SUBTITLE_WIDTH = 221;
const GRID_WIDTH = 275;
const TILE_WIDTH = 125;
const TILE_HEIGHT = 109;
const TILE_RADIUS = 12;
const TILE_TEXT_WIDTH = 83;

export default function OnboardingStep9() {
  const router = useRouter();
  const { selectedBrandIds, toggleBrand } = useOnboarding();

  return (
    <OnboardingLayout
      background={require('@/assets/images/onboarding/background-2.png')}
      progress={PROGRESS}
      // TODO: go to onboarding screen 10 once it exists.
      onNext={() => router.push('/home')}>
      <View style={styles.intro}>
        <Text style={styles.heading} accessibilityRole="header">
          {'Which brands have\nyou purchased from in the past 5 years?'}
        </Text>
        <Text style={styles.subtitle}>Pick the ones you haven’t claimed money from yet</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}>
        {BRANDS.map((brand) => {
          const selected = selectedBrandIds.includes(brand.id);
          return (
            <Pressable
              key={brand.id}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: selected }}
              accessibilityLabel={brand.name}
              onPress={() => toggleBrand(brand.id)}
              style={({ pressed }) => [
                styles.tile,
                selected && styles.tileSelected,
                pressed && styles.tilePressed,
              ]}>
              <Text style={[styles.tileText, selected && styles.tileTextSelected]}>
                {brand.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  intro: {
    alignItems: 'center',
    gap: Space[1.5],
    /** Figma leaves a large gap between the progress bar and the heading. */
    marginTop: Space[4] * 2,
  },
  heading: {
    ...Typography.headlineMedium,
    width: '100%',
    maxWidth: HEADING_WIDTH,
    fontFamily: Fonts.sans,
    textAlign: 'center',
    color: Palette.neutral[0],
  },
  subtitle: {
    ...Typography.bodyMedium,
    width: SUBTITLE_WIDTH,
    fontFamily: Fonts.sans,
    textAlign: 'center',
    color: Palette.neutral[0],
  },
  /** Fills the space down to the button; the grid scrolls inside it. */
  scroll: {
    flex: 1,
    alignSelf: 'stretch',
    marginBottom: Space[4],
  },
  grid: {
    alignSelf: 'center',
    width: GRID_WIDTH,
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 25,
    rowGap: Space[2],
  },
  tile: {
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: TILE_RADIUS,
    backgroundColor: Palette.neutral[0],
  },
  /** Not in Figma: selected tiles are filled with the theme purple. */
  tileSelected: {
    backgroundColor: Palette.purple[600],
  },
  tilePressed: {
    opacity: 0.8,
  },
  tileText: {
    width: TILE_TEXT_WIDTH,
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 19,
    fontWeight: 700,
    letterSpacing: 0.5,
    textAlign: 'center',
    color: Palette.neutral[9999],
  },
  tileTextSelected: {
    color: Palette.neutral[0],
  },
});
