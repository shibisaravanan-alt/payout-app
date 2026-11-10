import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { OnboardingProvider } from '@/components/onboarding/onboarding-provider';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <OnboardingProvider>
        <AnimatedSplashOverlay />
        <Stack screenOptions={{ headerShown: false }} />
      </OnboardingProvider>
    </ThemeProvider>
  );
}
