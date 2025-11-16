import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { mockProjects } from "@/lib/mockData";

interface OnboardingContextType {
  currentStep: string;
  projectId: string | null;
  setCurrentStep: (step: string) => void;
  completeOnboarding: () => void;
  setProjectData: (data: { projectId: string; apiKey: string; projectName: string; website: string }) => void;
  projectData: {
    projectId: string;
    apiKey: string;
    projectName: string;
    website: string;
  } | null;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(() => {
    return localStorage.getItem("pascal-onboarding-step") || "welcome";
  });

  const [projectData, setProjectDataState] = useState(() => {
    const saved = localStorage.getItem("pascal-project-data");
    if (saved) {
      return JSON.parse(saved);
    }
    // Auto-create demo project
    return {
      projectId: mockProjects[0].id,
      apiKey: mockProjects[0].apiKey,
      projectName: mockProjects[0].name,
      website: mockProjects[0].website,
    };
  });

  const projectId = projectData?.projectId || null;

  useEffect(() => {
    localStorage.setItem("pascal-onboarding-step", currentStep);
  }, [currentStep]);

  useEffect(() => {
    if (projectData) {
      localStorage.setItem("pascal-project-data", JSON.stringify(projectData));
    }
  }, [projectData]);

  const setProjectData = (data: { projectId: string; apiKey: string; projectName: string; website: string }) => {
    setProjectDataState(data);
  };

  const completeOnboarding = () => {
    setCurrentStep("complete");
  };

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        projectId,
        setCurrentStep,
        completeOnboarding,
        setProjectData,
        projectData,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within OnboardingProvider");
  }
  return context;
};
