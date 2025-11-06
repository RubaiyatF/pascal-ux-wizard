import pascalLogo from "@/assets/pascal-logo.png";

export const AnimatedLogo = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-full">
      {/* Aurora-like animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10 animate-pulse" 
           style={{ animationDuration: '3s' }} />
      
      {/* Rotating glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/30 to-transparent animate-spin" 
           style={{ animationDuration: '8s' }} />
      
      {/* Logo */}
      <img 
        src={pascalLogo} 
        alt="Pascal Logo" 
        className="relative z-10 w-2/3 h-2/3 object-contain drop-shadow-lg"
      />
    </div>
  );
};
