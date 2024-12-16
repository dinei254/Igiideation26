"use client";

import { createContext, useEffect } from "react";
import { useState } from "react";
import React from "react";

export const JudgeContext = createContext<
  | {
      judgeId: string | undefined;
      setJudgeId: React.Dispatch<React.SetStateAction<string | undefined>>;
    }
  | undefined
>(undefined);

const JudgeProvider = ({ children }: { children: React.ReactNode }) => {
  const [judgeId, setJudgeId] = useState<string | undefined>(undefined);
  const handleGetJudge = async () => {
    try {
      const res = await fetch("/api/user");
      if (res.ok) {
        const data = await res.json();
        setJudgeId(data);
      }
    } catch (error: any) {
      console.error(
        `Failed to get judge account information : ${error.message}"`
      );
    }
  };

  useEffect(() => {
    handleGetJudge();
  }, [judgeId]);

  return (
    <JudgeContext.Provider value={{judgeId, setJudgeId}}>{children}</JudgeContext.Provider>
  );
};

export default JudgeProvider;
