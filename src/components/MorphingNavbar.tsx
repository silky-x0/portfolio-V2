import React from "react";
import AnimatedText from "./AnimatedText";

const MorphingNavbar: React.FC = () => {
  return (
    <AnimatedText delay={0.1} className="mb-6">
      <div className="inline-flex items-center gap-2 bg-[#14213d]/60 backdrop-blur-md rounded-full px-3 py-2 sm:px-4 sm:py-2 border border-[#fca311]/30">
        <div className="w-2 h-2 bg-[#fca311] rounded-full animate-pulse"></div>
        <span className="text-xs sm:text-sm text-[#e5e5e5]">
          Available for work
        </span>
      </div>
    </AnimatedText>
  );
};

export default MorphingNavbar; 