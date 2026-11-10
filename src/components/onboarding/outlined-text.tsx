import {
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

/** Figma: onboarding headline text has an outside stroke in this blue. */
const OUTLINE_COLOR = '#2232E1';

/** Layout props that position the whole outlined block, so they go on the wrapper. */
const WRAPPER_KEYS = [
  'margin',
  'marginTop',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginHorizontal',
  'marginVertical',
  'alignSelf',
] as const;

type OutlinedTextProps = TextProps & {
  style?: StyleProp<TextStyle>;
  /** Stroke thickness in points, like Figma's outside stroke weight. */
  outlineWidth?: number;
  children: string;
};

/**
 * Text with an outside stroke. React Native can't stroke text, so this draws copies of the
 * text in the outline color, shifted around a circle, behind the real text.
 */
export function OutlinedText({ style, outlineWidth = 1, children, ...rest }: OutlinedTextProps) {
  const { wrapperStyle, textStyle } = splitStyle(style);
  const outlineStyle = {
    ...textStyle,
    color: OUTLINE_COLOR,
    textShadowColor: 'transparent',
  };
  // More copies for thicker strokes keep the outline smooth.
  const steps = outlineWidth > 1 ? 16 : 8;
  const offsets = Array.from({ length: steps }, (_, i) => {
    const angle = (i / steps) * 2 * Math.PI;
    return { left: Math.cos(angle) * outlineWidth, top: Math.sin(angle) * outlineWidth };
  });

  return (
    <View style={wrapperStyle}>
      {offsets.map((offset, i) => (
        <Text
          key={i}
          {...rest}
          accessible={false}
          importantForAccessibility="no-hide-descendants"
          aria-hidden
          style={[outlineStyle, styles.copy, offset]}>
          {children}
        </Text>
      ))}
      <Text {...rest} style={textStyle}>
        {children}
      </Text>
    </View>
  );
}

function splitStyle(style: StyleProp<TextStyle>) {
  const text: Record<string, unknown> = { ...StyleSheet.flatten(style) };
  const wrapper: Record<string, unknown> = {};
  for (const key of WRAPPER_KEYS) {
    if (text[key] !== undefined) {
      wrapper[key] = text[key];
      delete text[key];
    }
  }
  // A percentage width is relative to the screen's content area, so the wrapper takes it
  // and the text fills the wrapper.
  if (typeof text.width === 'string') {
    wrapper.width = text.width;
    wrapper.maxWidth = text.maxWidth;
    text.width = '100%';
    delete text.maxWidth;
  }
  return { wrapperStyle: wrapper as ViewStyle, textStyle: text as TextStyle };
}

const styles = StyleSheet.create({
  copy: {
    position: 'absolute',
  },
});
