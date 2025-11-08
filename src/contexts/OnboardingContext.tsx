import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "@clerk/clerk-react";

interface OnboardingState {
  currentStep: 1 | 2 | 3 | "complete";
  projectId: string | null;
  apiKey: string | null;
  projectName: string | null;
  website: string | null;
}

interface OnboardingContextType extends OnboardingState {
  setStep: (step: 1 | 2 | 3 | "complete") => void;
  setProjectData: (data: {
    projectId: string;
    apiKey: string;
    projectName: string;
    website: string;
  }) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const { userId } = useAuth();
  const storageKey = `pascal-onboarding-${userId}`;

  const [state, setState] = useState<OnboardingState>(() => {
    if (!userId) {
      return {
        currentStep: 1,
        projectId: null,
        apiKey: null,
        projectName: null,
        website: null,
      };
    }
    const saved = localStorage.getItem(storageKey);
    return saved
      ? JSON.parse(saved)
      : {
          currentStep: 1,
          projectId: null,
          apiKey: null,
          projectName: null,
          website: null,
        };
  });

  // Persist to localStorage on state change
  useEffect(() => {
    if (userId) {
      localStorage.setItem(storageKey, JSON.stringify(state));
    }
  }, [state, storageKey, userId]);

  const setStep = (step: 1 | 2 | 3 | "complete") => {
    setState((prev) => ({ ...prev, currentStep: step }));
  };

  const setProjectData = (data: {
    projectId: string;
    apiKey: string;
    projectName: string;
    website: string;
  }) => {
    setState((prev) => ({
      ...prev,
      projectId: data.projectId,
      apiKey: data.apiKey,
      projectName: data.projectName,
      website: data.website,
      currentStep: 2, // Move to step 2 after project creation
    }));
  };

  const completeOnboarding = () => {
    setState((prev) => ({ ...prev, currentStep: "complete" }));
  };

  const resetOnboarding = () => {
    setState({
      currentStep: 1,
      projectId: null,
      apiKey: null,
      projectName: null,
      website: null,
    });
    if (userId) {
      localStorage.removeItem(storageKey);
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        ...state,
        setStep,
        setProjectData,
        completeOnboarding,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within OnboardingProvider");
  }
  return context;
};
