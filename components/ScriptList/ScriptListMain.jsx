"use client";

import { useScriptListContext } from "@/context/ScriptListContext";
import ScriptListItem from "@/components/ScriptList/ScriptListItem";

const ScriptListMain = () => {
  const { queriedScripts, mounted } = useScriptListContext();

  if (!mounted) {
    return (
      <div className="h-[calc(100vh_-_10rem)] w-full animate-pulse rounded-lg border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800"></div>
    );
  }

  return (
    <div className="flex h-[calc(100vh_-_10rem)] w-full flex-col gap-4 overflow-auto rounded-lg border border-gray-300 bg-white p-4 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white">
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {queriedScripts.length > 0 &&
          queriedScripts.map((scriptData, index) => (
            <ScriptListItem key={index} data={scriptData} />
          ))}
      </div>
    </div>
  );
};

export default ScriptListMain;
