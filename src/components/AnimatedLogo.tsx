import { useEffect, useRef } from "react";

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

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement('script');
    script.src = '/unicornStudio.umd.js';
    script.async = true;

    script.onload = () => {
      if (!containerRef.current || !window.UnicornStudio) return;

      const uniqueId = `unicorn-${Math.random().toString(36).substr(2, 9)}`;
      containerRef.current.id = uniqueId;

      window.UnicornStudio.addScene({
        elementId: uniqueId,
        fps: 60,
        scale: 0.8,
        dpi: 1.5,
        filePath: '/pascal-orb.json',
        altText: "Pascal AI Logo",
        ariaLabel: "Animated Pascal AI logo with aurora effect",
      }).then((scene) => {
        sceneRef.current = scene;
      }).catch((error) => {
        console.error("Failed to initialize Unicorn Studio scene:", error);
      });
    };

    script.onerror = () => {
      console.error("Failed to load Unicorn Studio library");
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

  return <div ref={containerRef} className="w-full h-full" />;
};
