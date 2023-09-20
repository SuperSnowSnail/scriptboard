"use client";

import { useScriptListContext } from "@/context/ScriptListContext";
import { Select, TextInput } from "flowbite-react";
import ScriptListAddBtn from "@/components/ScriptList/ScriptListAddBtn";
import Icon from "@/components/Icon";

const SearchIcon = () => (
  <div className="text-gray-500 dark:text-gray-300">
    <Icon name="search" size={4} />
  </div>
);

const selectTheme = {
  field: {
    select: {
      base: "block w-full border disabled:cursor-not-allowed disabled:opacity-50",
      colors: {
        gray: "bg-white border-gray-300 text-gray-900 focus:border-blue-700 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-700 dark:focus:ring-blue-700",
      },
      sizes: {
        md: "p-2.5 pl-10 text-sm",
      },
    },
  },
};

const textinputTheme = {
  field: {
    input: {
      colors: {
        gray: "bg-white border-gray-300 text-gray-900 focus:border-blue-700 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-700 dark:focus:ring-blue-700",
      },
    },
  },
};

const ScriptListHeader = () => {
  const {
    role,
    scriptGroup,
    setScriptGroup,
    searchQuery,
    setSearchQuery,
    mounted,
  } = useScriptListContext();

  if (!mounted) {
    return (
      <div className="flex w-full justify-between gap-4">
        <div className="h-[42px] w-[136px] flex-none animate-pulse rounded-lg border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800"></div>
        <div className="h-[42px] w-full max-w-[247px] animate-pulse rounded-lg border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800"></div>
      </div>
    );
  }

  const SelectIcon = () => {
    switch (scriptGroup) {
      case "catalog": {
        return <Icon name="catalog" size={4} />;
      }
      case "running": {
        return <Icon name="run" size={4} />;
      }
      case "archive": {
        return <Icon name="archive" size={4} />;
      }
      default: {
        return null;
      }
    }
  };

  return (
    <div className="flex w-full justify-between gap-4">
      <Select
        id="scripts_select"
        color="gray"
        onChange={(e) => {
          setScriptGroup(e.target.value);
          window.history.replaceState(null, "", `/scripts/${e.target.value}`);
        }}
        value={scriptGroup}
        theme={selectTheme}
        icon={SelectIcon}
        className="flex-none"
      >
        <option value="catalog">Catalog</option>
        <option value="running">Running</option>
        <option value="archive">Archive</option>
      </Select>
      <div className="flex gap-2">
        {scriptGroup === "catalog" && <ScriptListAddBtn role={role} />}
        <TextInput
          id="search"
          placeholder="Search by name"
          color="gray"
          type="text"
          icon={SearchIcon}
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          theme={textinputTheme}
        />
      </div>
    </div>
  );
};

export default ScriptListHeader;
