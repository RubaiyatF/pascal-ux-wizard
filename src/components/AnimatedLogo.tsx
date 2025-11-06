import { useEffect, useRef, useState } from "react";
import pascalLogo from "@/assets/pascal-logo.png";

declare global {
  interface Window {
    UnicornStudio: {
      addScene: (config: any) => Promise<any>;
    };
  }
}

export const AnimatedLogo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);
  const [hasError, setHasError] = useState(false);

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
        return;
      }
      
      if (!window.UnicornStudio) {
        console.error("UnicornStudio not found on window");
        setHasError(true);
        return;
      }

      const uniqueId = `unicorn-${Math.random().toString(36).substr(2, 9)}`;
      containerRef.current.id = uniqueId;
      
      console.log("Initializing scene with ID:", uniqueId);

      window.UnicornStudio.addScene({
        elementId: uniqueId,
        fps: 60,
        scale: 0.8,
        dpi: 1.5,
        filePath: '/pascal-orb.json',
        altText: "Pascal AI Logo",
        ariaLabel: "Animated Pascal AI logo with aurora effect",
      }).then((scene) => {
        console.log("Scene initialized successfully", scene);
        sceneRef.current = scene;
      }).catch((error) => {
        console.error("Failed to initialize Unicorn Studio scene:", error);
        setHasError(true);
      });
    };

    script.onerror = () => {
      console.error("Failed to load Unicorn Studio library");
      setHasError(true);
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
      <div className="w-full h-full flex items-center justify-center bg-primary/10 rounded-full">
        <img src={pascalLogo} alt="Pascal Logo" className="w-3/4 h-3/4 object-contain" />
      </div>
    );
  }

  return <div ref={containerRef} className="w-full h-full bg-transparent" />;
};
