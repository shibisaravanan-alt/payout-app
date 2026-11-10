import { Redirect } from 'expo-router';

// The app opens to onboarding for now. Later, redirect to /home once the user has onboarded.
export default function Index() {
  return <Redirect href="/onboarding" />;
}
