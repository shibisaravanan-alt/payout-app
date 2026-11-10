import { createContext, use, useMemo, useState, type ReactNode } from 'react';

/**
 * The user's onboarding choices. Kept in memory for as long as the app is open;
 * persisting them across app restarts would need a storage package.
 */
type OnboardingState = {
  /** IDs of the brands picked on onboarding screen 9. */
  selectedBrandIds: string[];
  toggleBrand: (id: string) => void;
  /** ID of the payout method picked on onboarding screen 10. */
  payoutMethodId: string | null;
  setPayoutMethodId: (id: string) => void;
};

const OnboardingContext = createContext<OnboardingState | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [selectedBrandIds, setSelectedBrandIds] = useState<string[]>([]);
  const [payoutMethodId, setPayoutMethodId] = useState<string | null>(null);

  const value = useMemo<OnboardingState>(
    () => ({
      selectedBrandIds,
      toggleBrand: (id) =>
        setSelectedBrandIds((ids) =>
          ids.includes(id) ? ids.filter((existing) => existing !== id) : [...ids, id]
        ),
      payoutMethodId,
      setPayoutMethodId,
    }),
    [selectedBrandIds, payoutMethodId]
  );

  return <OnboardingContext value={value}>{children}</OnboardingContext>;
}

export function useOnboarding() {
  const context = use(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used inside OnboardingProvider');
  }
  return context;
}
