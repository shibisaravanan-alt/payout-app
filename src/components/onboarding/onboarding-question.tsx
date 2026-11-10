import { StyleSheet, Text, View } from 'react-native';

import { Fonts, Palette, Space, Typography } from '@/constants/theme';

/** Figma sizes. */
const QUESTION_MAX_WIDTH = 323;
/** Figma centers the question in a box three lines tall, so shorter questions sit lower. */
const QUESTION_BOX_HEIGHT = 3 * Typography.headlineMedium.lineHeight;

type OnboardingQuestionProps = {
  question: string;
  hint: string;
  /** Figma width of the hint text, so its line breaks match the design. */
  hintWidth: number;
};

/** Question heading and hint used at the top of the onboarding question screens. */
export function OnboardingQuestion({ question, hint, hintWidth }: OnboardingQuestionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.questionBox}>
        <Text style={styles.question} accessibilityRole="header">
          {question}
        </Text>
      </View>
      <Text style={[styles.hint, { width: hintWidth }]}>{hint}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: Space[1.5],
    /** Figma leaves a large gap between the progress bar and the question. */
    marginTop: Space[4] * 2,
  },
  questionBox: {
    minHeight: QUESTION_BOX_HEIGHT,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  question: {
    ...Typography.headlineMedium,
    width: '100%',
    maxWidth: QUESTION_MAX_WIDTH,
    fontFamily: Fonts.sans,
    textAlign: 'center',
    color: Palette.neutral[0],
  },
  hint: {
    ...Typography.bodyMedium,
    fontFamily: Fonts.sans,
    textAlign: 'center',
    color: Palette.neutral[0],
  },
});
