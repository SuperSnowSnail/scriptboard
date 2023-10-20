"use client";

import { useRunningFormContext } from "@/context/RunningFormContext";

import Icon from "@/components/Icon";

const Header = () => {
  const { config, terminateScript, pid, mounted } = useRunningFormContext();

  if (!mounted) {
    return (
      <div className="flex h-32 animate-pulse flex-col rounded-lg border border-gray-300 bg-white p-4 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white lg:order-2 lg:max-w-[calc(100vw_-_39rem)] lg:flex-none xl:max-w-[calc(100vw_-_43rem)]"></div>
    );
  }

  return (
    <div className="flex flex-col rounded-lg border border-gray-300 bg-white p-4 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white lg:order-2 lg:max-w-[calc(100vw_-_39rem)] lg:flex-none xl:max-w-[calc(100vw_-_43rem)]">
      <div className="mb-4 flex flex-nowrap items-baseline justify-between">
        <h1 className="text-2xl dark:text-white">{config.name}</h1>
        <button
          disabled={pid <= 0}
          className={`${
            pid <= 0 && "cursor-not-allowed opacity-50"
          } flex items-center justify-center rounded-lg border border-red-700 p-2 text-red-700 hover:bg-red-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-800`}
          type="button"
          onClick={async () => {
            if (pid > 0) {
              await terminateScript();
            }
          }}
        >
          <Icon name="stop" size={5} />
        </button>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300">
        {config.description}
      </p>
    </div>
  );
};

export default Header;
