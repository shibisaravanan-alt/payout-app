import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { Palette, Radius } from '@/constants/theme';

const TRACK_HEIGHT = 11;
/** Figma: #D9D9D9 at 50% opacity. */
const TRACK_COLOR = 'rgba(217, 217, 217, 0.5)';

type ProgressBarProps = {
  /** 0 to 1. */
  progress: number;
  style?: StyleProp<ViewStyle>;
};

export function ProgressBar({ progress, style }: ProgressBarProps) {
  const clamped = Math.min(Math.max(progress, 0), 1);

  return (
    <View
      style={[styles.track, style]}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(clamped * 100) }}>
      <View style={[styles.fill, { width: `${clamped * 100}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: TRACK_HEIGHT,
    borderRadius: Radius.full,
    backgroundColor: TRACK_COLOR,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: Radius.full,
    backgroundColor: Palette.neutral[0],
  },
});
