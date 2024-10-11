// components/AnimatedRibbonBackground.jsx
import React from "react";

const AnimatedRibbonBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox="0 0 1440 900"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="ribbonGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#0f9d58" />
            <stop offset="50%" stopColor="#34a853" />
            <stop offset="100%" stopColor="#006400" />
          </linearGradient>
        </defs>

        {/* Animated Ribbon Path */}
        <path
          d="M0,300 C150,350 300,250 450,300 C600,350 750,450 900,400 C1050,350 1200,300 1440,350"
          fill="none"
          stroke="url(#ribbonGradient)"
          strokeWidth="30"
          opacity="0.8"
        >
          <animate
            attributeName="d"
            dur="15s"
            repeatCount="indefinite"
            values="
              M0,300 C150,350 300,250 450,300 C600,350 750,450 900,400 C1050,350 1200,300 1440,350;
              M0,350 C150,300 300,350 450,250 C600,300 750,400 900,450 C1050,400 1200,350 1440,300;
              M0,300 C150,350 300,250 450,300 C600,350 750,450 900,400 C1050,350 1200,300 1440,350
            "
          />
        </path>

        <path
          d="M0,500 C200,450 400,550 600,500 C800,450 1000,600 1200,550 C1400,500 1600,450 1800,500"
          fill="none"
          stroke="url(#ribbonGradient)"
          strokeWidth="30"
          opacity="0.6"
        >
          <animate
            attributeName="d"
            dur="20s"
            repeatCount="indefinite"
            values="
              M0,500 C200,450 400,550 600,500 C800,450 1000,600 1200,550 C1400,500 1600,450 1800,500;
              M0,550 C200,500 400,450 600,550 C800,600 1000,550 1200,500 C1400,450 1600,500 1800,450;
              M0,500 C200,450 400,550 600,500 C800,450 1000,600 1200,550 C1400,500 1600,450 1800,500
            "
          />
        </path>

        <path
          d="M0,700 C250,750 500,650 750,700 C1000,750 1250,850 1500,800 C1750,750 2000,700 2250,750"
          fill="none"
          stroke="url(#ribbonGradient)"
          strokeWidth="30"
          opacity="0.4"
        >
          <animate
            attributeName="d"
            dur="25s"
            repeatCount="indefinite"
            values="
              M0,700 C250,750 500,650 750,700 C1000,750 1250,850 1500,800 C1750,750 2000,700 2250,750;
              M0,750 C250,700 500,750 750,650 C1000,700 1250,750 1500,850 C1750,800 2000,750 2250,700;
              M0,700 C250,750 500,650 750,700 C1000,750 1250,850 1500,800 C1750,750 2000,700 2250,750
            "
          />
        </path>
      </svg>
    </div>
  );
};

export default AnimatedRibbonBackground;
