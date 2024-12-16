"use client";

import React from "react";
import JudgeProvider from "@/hooks/JudgeProvider";

const JudgeLayout = ({ children }: { children: React.ReactNode }) => {
  return <JudgeProvider>{children}</JudgeProvider>;
};

export default JudgeLayout;
