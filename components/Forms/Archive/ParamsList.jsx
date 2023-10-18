"use client";

import { useArchiveFormContext } from "@/context/ArchiveFormContext";

import Param from "@/components/Forms/Archive/Param";

const ParamsList = () => {
  const { config, mounted } = useArchiveFormContext();

  if (!mounted) {
    return (
      <div className="flex h-[calc(100vh_-_15rem)] w-full animate-pulse flex-col gap-8 rounded-lg border border-gray-300 bg-white p-4 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white lg:order-1 lg:h-[calc(100vh_-_4rem)] lg:max-w-xs lg:overflow-y-auto xl:max-w-sm"></div>
    );
  }

  return (
    <fieldset
      disabled
      className="flex h-full w-full flex-col gap-8 rounded-lg border border-gray-300 bg-white p-4 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white lg:order-1 lg:max-w-xs lg:overflow-y-auto xl:max-w-sm"
    >
      {config.params &&
        config.params.map((param, index) => (
          <Param key={index} param={param} index={index} />
        ))}
    </fieldset>
  );
};

export default ParamsList;
