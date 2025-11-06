import { createContext, useContext, useState, ReactNode } from "react";

interface ProjectContextType {
  currentProject: string;
  setCurrentProject: (project: string) => void;
  projects: string[];
  setProjects: (projects: string[]) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [currentProject, setCurrentProject] = useState("Pascal Demo");
  const [projects, setProjects] = useState(["Pascal Demo"]);

  return (
    <ProjectContext.Provider value={{ currentProject, setCurrentProject, projects, setProjects }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within ProjectProvider");
  }
  return context;
};
