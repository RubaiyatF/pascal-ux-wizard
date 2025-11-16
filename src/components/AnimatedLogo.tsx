import { useEffect, useRef, useState } from "react";
import pascalLogo from "@/assets/pascal-logo.png";

interface UnicornStudioConfig {
  elementId: string;
  fps: number;
  scale: number;
  dpi: number;
  filePath: string;
  altText: string;
  ariaLabel: string;
}

interface UnicornStudioScene {
  destroy?: () => void;
}

declare global {
  interface Window {
    UnicornStudio: {
      addScene: (config: UnicornStudioConfig) => Promise<UnicornStudioScene>;
    };
  }
}

export const AnimatedLogo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<UnicornStudioScene | null>(null);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement('script');
    script.src = '/unicornStudio.umd.js';
    script.async = true;

    script.onload = () => {
      console.log("Unicorn Studio library loaded");
      
      if (!containerRef.current) {
        console.error("Container ref is null");
        setHasError(true);
        setIsLoading(false);
        return;
      }
      
      if (!window.UnicornStudio) {
        console.error("UnicornStudio not found on window");
        setHasError(true);
        setIsLoading(false);
        return;
      }

      const uniqueId = `unicorn-${Math.random().toString(36).substr(2, 9)}`;
      containerRef.current.id = uniqueId;
      
      console.log("Initializing WebGL scene with ID:", uniqueId);

      window.UnicornStudio.addScene({
        elementId: uniqueId,
        fps: 60,
        scale: 1,
        dpi: 1.5,
        filePath: '/pascal-orb.json',
        altText: "Pascal AI Logo",
        ariaLabel: "Animated Pascal AI logo with aurora orb effect",
      }).then((scene) => {
        console.log("WebGL scene initialized successfully", scene);
        sceneRef.current = scene;
        setIsLoading(false);
      }).catch((error) => {
        console.error("Failed to initialize Unicorn Studio scene:", error);
        setHasError(true);
        setIsLoading(false);
      });
    };

    script.onerror = () => {
      console.error("Failed to load Unicorn Studio library");
      setHasError(true);
      setIsLoading(false);
    };

    document.head.appendChild(script);

    return () => {
      if (sceneRef.current && sceneRef.current.destroy) {
        sceneRef.current.destroy();
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <img src={pascalLogo} alt="Pascal Logo" className="w-3/4 h-3/4 object-contain" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-card rounded-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <div ref={containerRef} className="w-full h-full rounded-full overflow-hidden" />
    </div>
  );
};
