import { useEffect, useRef } from "react";

// Declare UnicornStudio as a global
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

    // Load the UnicornStudio script
    const script = document.createElement('script');
    script.src = '/unicornStudio.umd.js';
    script.async = true;

    script.onload = () => {
      if (!containerRef.current || !window.UnicornStudio) return;

      const config = {
        history: [
          {
            breakpoints: [],
            visible: true,
            aspectRatio: 1,
            userDownsample: 1,
            layerType: "effect",
            type: "gradient",
            usesPingPong: false,
            speed: 0.25,
            trackMouse: 0,
            trackAxes: "xy",
            mouseMomentum: 0,
            texture: false,
            animating: false,
            isMask: 0,
            data: {
              downSample: 0.5,
              depth: false,
              uniforms: {},
              isBackground: true,
            },
            id: "effect",
          },
          {
            breakpoints: [],
            visible: true,
            aspectRatio: 1,
            userDownsample: 1,
            layerType: "effect",
            type: "aurora",
            usesPingPong: false,
            texture: false,
            speed: 0.94,
            trackMouse: 0,
            trackAxes: "xy",
            mouseMomentum: 0.32,
            animating: true,
            isMask: 0,
            data: {
              depth: false,
              uniforms: {},
              isBackground: false,
            },
            id: "effect1",
          },
          {
            breakpoints: [],
            visible: true,
            aspectRatio: 1,
            userDownsample: 1,
            layerType: "effect",
            type: "bloom",
            usesPingPong: false,
            texture: false,
            animating: false,
            mouseMomentum: 0,
            isMask: 0,
            data: {
              downSample: 0.5,
              depth: false,
              uniforms: {},
              isBackground: false,
              passes: [
                { prop: "pass", value: 1, downSample: 0.25 },
                { prop: "pass", value: 2, downSample: 0.25, includeBg: true },
                { prop: "pass", value: 3, downSample: 0.25 },
                { prop: "pass", value: 4, downSample: 0.25, includeBg: true },
                { prop: "pass", value: 5, downSample: 0.5 },
                { prop: "pass", value: 6, downSample: 0.5, includeBg: true },
                { prop: "pass", value: 7, downSample: 1, includeBg: true },
              ],
            },
            id: "effect2",
          },
          {
            breakpoints: [],
            visible: true,
            aspectRatio: 1,
            userDownsample: 1,
            layerType: "effect",
            type: "voronoi",
            usesPingPong: false,
            speed: 0.5,
            trackMouse: 0,
            trackAxes: "xy",
            mouseMomentum: 0,
            texture: false,
            animating: false,
            isMask: 0,
            data: {
              depth: false,
              uniforms: {},
              isBackground: false,
            },
            id: "effect3",
          },
          {
            breakpoints: [],
            visible: true,
            aspectRatio: 1,
            userDownsample: 1,
            layerType: "effect",
            type: "sphere",
            usesPingPong: false,
            radius: 1,
            amount: 1,
            trackMouse: 0,
            trackAxes: "xy",
            mouseMomentum: 0,
            texture: false,
            animating: false,
            isMask: 0,
            states: {
              appear: [
                {
                  type: "appear",
                  id: "4832111a-9095-4c31-b831-3a35bfd9793a",
                  prop: "radius",
                  transition: {
                    ease: "easeInOutExpo",
                    duration: 1538,
                    delay: 1000,
                  },
                  complete: false,
                  progress: 0,
                  value: 0,
                  endValue: 0.94,
                  initialized: false,
                  breakpoints: [],
                  loop: "none",
                  loopDelay: 0,
                  uniformData: {
                    type: "1f",
                    name: "uRadius",
                  },
                },
                {
                  type: "appear",
                  id: "f4347992-7606-4299-b397-fb6d2dd99b11",
                  prop: "amount",
                  transition: {
                    delay: 1375,
                    duration: 1550,
                    ease: "easeInOutExpo",
                  },
                  complete: false,
                  progress: 0,
                  value: 0,
                  endValue: 1,
                  initialized: false,
                  breakpoints: [],
                  loop: "none",
                  loopDelay: 0,
                  uniformData: {
                    type: "1f",
                    name: "uAmount",
                  },
                },
              ],
              scroll: [],
              hover: [],
            },
            data: {
              depth: false,
              uniforms: {},
              isBackground: false,
            },
            id: "effect4",
          },
          {
            breakpoints: [],
            visible: true,
            aspectRatio: 1,
            userDownsample: 1,
            layerType: "effect",
            type: "vignette",
            usesPingPong: false,
            trackMouse: 0,
            trackAxes: "xy",
            mouseMomentum: 0,
            texture: false,
            animating: false,
            isMask: 0,
            data: {
              depth: false,
              uniforms: {},
              isBackground: false,
            },
            id: "effect5",
          },
        ],
        options: {
          name: "Pascal Orb",
          fps: 60,
          dpi: 1.5,
          scale: 1,
          includeLogo: false,
          isProduction: false,
        },
        version: "1.4.34",
        id: "PascalOrbLogo",
      };

      // Create a unique ID for this container
      const uniqueId = `unicorn-${Math.random().toString(36).substr(2, 9)}`;
      containerRef.current.id = uniqueId;

      // Add the scene
      window.UnicornStudio.addScene({
        elementId: uniqueId,
        fps: 60,
        scale: 1,
        dpi: 1.5,
        filePath: JSON.stringify(config), // Pass the config as JSON
        altText: "Pascal AI Logo",
        ariaLabel: "Animated Pascal AI logo with aurora effect",
      }).then((scene) => {
        sceneRef.current = scene;
      }).catch((error) => {
        console.error("Failed to initialize Unicorn Studio scene:", error);
      });
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
