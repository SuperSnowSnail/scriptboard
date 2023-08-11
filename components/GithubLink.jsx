"use client";

import Link from "next/link";
import { Tooltip } from "flowbite-react";
import Icon from "@/components/Icon";

const GithubLink = () => {
  return (
    <Tooltip content="Visit GitHub repo" placement="bottom">
      <Link
        href="https://github.com/SuperSnowSnail/scriptboard"
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
      >
        <Icon name="github" size={4} />
      </Link>
    </Tooltip>
  );
};

export default GithubLink;
