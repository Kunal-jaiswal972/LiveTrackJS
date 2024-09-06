import React from "react";
import { Outlet } from "react-router-dom";
import FloatingShape from "@/components/shared/FloatingShape";
import { floatingShapesConfig } from "@/constants/constants";

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
      {floatingShapesConfig.map((shape, index) => (
        <FloatingShape
          key={index}
          color={shape.color}
          size={shape.size}
          top={shape.top}
          left={shape.left}
          delay={shape.delay}
        />
      ))}
      <Outlet />
    </div>
  );
};

export default PublicLayout;
