"use client";

import { useArchiveFormContext } from "@/context/ArchiveFormContext";

import Icon from "@/components/Icon";

const Header = () => {
  const { config, rerunScript, mounted } = useArchiveFormContext();

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
          className="flex items-center justify-center rounded-lg border border-green-700 p-2 text-green-700 hover:bg-green-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-300 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-600 dark:hover:text-white dark:focus:ring-green-800"
          type="button"
          onClick={async () => {
            await rerunScript();
          }}
        >
          <Icon name="rerun" size={5} />
        </button>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300">
        {config.description}
      </p>
    </div>
  );
};

export default Header;
