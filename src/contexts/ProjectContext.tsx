import { createContext, useContext, useState, ReactNode } from "react";

interface ProjectContextType {
  currentProject: string;
  setCurrentProject: (project: string) => void;
  projects: string[];
  setProjects: (projects: string[]) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  // Initialize from localStorage or use defaults
  const [currentProject, setCurrentProjectState] = useState(() => {
    const saved = localStorage.getItem('pascal-current-project');
    return saved || "Pascal Demo";
  });
  
  const [projects, setProjectsState] = useState<string[]>(() => {
    const saved = localStorage.getItem('pascal-projects');
    return saved ? JSON.parse(saved) : ["Pascal Demo"];
  });

  // Persist currentProject to localStorage
  const setCurrentProject = (project: string) => {
    setCurrentProjectState(project);
    localStorage.setItem('pascal-current-project', project);
  };

  // Persist projects to localStorage
  const setProjects = (projectsList: string[]) => {
    setProjectsState(projectsList);
    localStorage.setItem('pascal-projects', JSON.stringify(projectsList));
  };

  return (
    <ProjectContext.Provider value={{ currentProject, setCurrentProject, projects, setProjects }}>
      {children}
    </ProjectContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within ProjectProvider");
  }
  return context;
};
