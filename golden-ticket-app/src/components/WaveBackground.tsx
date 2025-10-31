export const WaveBackground = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
      <svg
        viewBox="0 0 1440 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        preserveAspectRatio="none"
      >
        <path
          d="M0,100 C240,150 480,50 720,100 C960,150 1200,50 1440,100 L1440,200 L0,200 Z"
          fill="url(#wave-gradient)"
          opacity="0.8"
        />
        <path
          d="M0,120 C240,170 480,70 720,120 C960,170 1200,70 1440,120 L1440,200 L0,200 Z"
          fill="url(#wave-gradient-2)"
          opacity="0.6"
        />
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(45, 95%, 50%)" />
            <stop offset="100%" stopColor="hsl(35, 100%, 60%)" />
          </linearGradient>
          <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(35, 100%, 60%)" />
            <stop offset="100%" stopColor="hsl(45, 95%, 50%)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
