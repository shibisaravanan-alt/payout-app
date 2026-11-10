import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { OnboardingLayout } from '@/components/onboarding/onboarding-layout';
import { useOnboarding } from '@/components/onboarding/onboarding-provider';
import { OnboardingQuestion } from '@/components/onboarding/onboarding-question';
import { PAYOUT_METHODS } from '@/constants/payout-methods';
import { Fonts, Palette, Radius, Space } from '@/constants/theme';

/** Figma: the filled segment is 274 of the 365pt track on screen 10. */
const PROGRESS = 274 / 365;

/** Figma sizes. */
const HINT_WIDTH = 260;
const LIST_MAX_WIDTH = 345;

/** Option border from Figma that isn't in the theme (Material 3 scheme color). */
const OPTION_BORDER_COLOR = '#D0BCFF';

export default function OnboardingStep10() {
  const router = useRouter();
  const { payoutMethodId, setPayoutMethodId } = useOnboarding();

  return (
    <OnboardingLayout
      background={require('@/assets/images/onboarding/background-2.png')}
      progress={PROGRESS}
      nextDisabled={payoutMethodId === null}
      onNext={() => router.push('/onboarding/step-11')}>
      <OnboardingQuestion
        question="How would you like to receive payouts?"
        hint="This will be set as the default payout method when claims are filled"
        hintWidth={HINT_WIDTH}
      />

      <View style={styles.options} accessibilityRole="radiogroup">
        {PAYOUT_METHODS.map((method) => {
          const selected = payoutMethodId === method.id;
          return (
            <Pressable
              key={method.id}
              accessibilityRole="radio"
              accessibilityState={{ checked: selected }}
              onPress={() => setPayoutMethodId(method.id)}
              style={({ pressed }) => [
                styles.option,
                selected && styles.optionSelected,
                pressed && styles.optionPressed,
              ]}>
              <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
                {method.name}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  /** Takes the rest of the space so the list stays at the top, under the question. */
  options: {
    flex: 1,
    width: '100%',
    maxWidth: LIST_MAX_WIDTH,
    gap: Space[2.5],
    /** Figma leaves a larger gap between the hint and the list. */
    marginTop: Space[3],
  },
  option: {
    alignItems: 'center',
    paddingVertical: 13,
    borderWidth: 3,
    borderColor: OPTION_BORDER_COLOR,
    borderRadius: Radius.large,
    backgroundColor: Palette.neutral[0],
  },
  /** Not in Figma: the selected method is filled with the theme purple. */
  optionSelected: {
    backgroundColor: Palette.purple[600],
  },
  optionPressed: {
    opacity: 0.8,
  },
  optionText: {
    fontFamily: Fonts.sans,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 700,
    color: Palette.neutral[9999],
  },
  optionTextSelected: {
    color: Palette.neutral[0],
  },
});
