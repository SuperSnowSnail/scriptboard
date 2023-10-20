"use client";

import Terminal from "@/components/Terminal";

import { useRunningFormContext } from "@/context/RunningFormContext";

const Content = () => {
  const { lines, mounted } = useRunningFormContext();

  if (!mounted) {
    return (
      <div className="hidden h-full w-full animate-pulse rounded-lg border border-gray-300 bg-white p-4 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white lg:order-3 lg:block lg:max-w-[calc(100vw_-_39rem)] lg:flex-1 lg:overflow-auto xl:max-w-[calc(100vw_-_43rem)]"></div>
    );
  }

  return (
    <div className="h-96 w-full max-w-[calc(100vw_-_2rem)] rounded-lg border border-gray-300 bg-white p-0 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:max-w-[calc(100vw_-_18rem)] lg:order-3 lg:h-full lg:max-w-[calc(100vw_-_39rem)] lg:flex-1 lg:overflow-auto xl:max-w-[calc(100vw_-_43rem)]">
      <Terminal lines={lines} />
    </div>
  );
};

export default Content;
