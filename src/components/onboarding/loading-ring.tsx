import { useEffect, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

/** Figma: Material 3 circular indeterminate progress indicator, 4dp thick. */
const SIZE = 40;
const THICKNESS = 4;
/** Material 3 kit colors used in Figma (sys/light/primary and secondary-container). */
const ACTIVE_COLOR = '#6750A4';
const TRACK_COLOR = '#E8DEF8';

/** A spinning ring: a light track with a darker arc rotating around it. */
export function LoadingRing() {
  const [rotation] = useState(() => new Animated.Value(0));

  useEffect(() => {
    const spin = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    spin.start();
    return () => spin.stop();
  }, [rotation]);

  const rotate = rotation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <View style={styles.ring} accessibilityRole="progressbar" accessibilityLabel="Loading">
      <Animated.View style={[styles.ring, styles.arc, { transform: [{ rotate }] }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  ring: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: THICKNESS,
    borderColor: TRACK_COLOR,
  },
  /** Quarter arc drawn over the track. */
  arc: {
    position: 'absolute',
    top: -THICKNESS,
    left: -THICKNESS,
    borderColor: 'transparent',
    borderTopColor: ACTIVE_COLOR,
    borderRightColor: ACTIVE_COLOR,
  },
});
