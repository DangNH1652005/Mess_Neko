import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-base-100/70 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3 p-5 bg-base-200 rounded-xl shadow-lg border border-base-300">
        {/* daisyUI Spinner */}
        <span className="loading loading-spinner loading-lg text-primary"></span>

        {/* Animated text */}
        <span className="text-sm font-medium text-base-content/80 animate-pulse tracking-wide">
          Processing...
        </span>
      </div>
    </div>
  );
};

export default Loading;
