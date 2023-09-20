"use client";

import Image from "next/image";
import Link from "next/link";
import { Tooltip } from "flowbite-react";
import TimeAgo from "react-timeago";
import Icon from "@/components/Icon";

import { useScriptListContext } from "@/context/ScriptListContext";

const tooltipTheme = {
  base: "max-w-[15rem] absolute inline-block z-10 rounded-lg py-2 px-3 text-sm font-medium shadow-sm",
  style: {
    auto: "border border-gray-200 bg-white text-gray-900 dark:border-gray-900 dark:bg-gray-800 dark:text-white",
  },
};

const Indicator = ({ state }) => {
  const { role, scriptGroup } = useScriptListContext();

  switch (scriptGroup) {
    case "catalog": {
      if (role === "USER" || role === "PREMIUM") {
        return null;
      }
      if (state === "UNLISTED") {
        return (
          <Tooltip
            content="Unlisted"
            placement="right"
            style="auto"
            arrow={false}
            theme={tooltipTheme}
          >
            <span className="flex h-3 w-3 rounded-full bg-red-500"></span>
          </Tooltip>
        );
      }
      return (
        <Tooltip
          content="Listed"
          placement="right"
          style="auto"
          arrow={false}
          theme={tooltipTheme}
        >
          <span className="flex h-3 w-3 rounded-full bg-green-500"></span>
        </Tooltip>
      );
    }
    case "running": {
      return (
        <Tooltip
          content="Running"
          placement="right"
          style="auto"
          arrow={false}
          theme={tooltipTheme}
        >
          <span className="flex h-3 w-3 animate-ping rounded-full bg-green-500"></span>
        </Tooltip>
      );
    }
    case "archive": {
      if (state === "TERMINATED") {
        return (
          <Tooltip
            content="Terminated"
            placement="right"
            style="auto"
            arrow={false}
            theme={tooltipTheme}
          >
            <div className="text-yellow-300">
              <Icon name="warning" size={3} />
            </div>
          </Tooltip>
        );
      }
      return (
        <Tooltip
          content="Finished"
          placement="right"
          style="auto"
          arrow={false}
          theme={tooltipTheme}
        >
          <div className="text-green-500">
            <Icon name="checkInCircle" size={3} />
          </div>
        </Tooltip>
      );
    }
    default: {
      return null;
    }
  }
};

const ScriptListItem = ({ data }) => {
  const { userId, scriptGroup, authors } = useScriptListContext();

  const author = authors.find((author) => author.id === data.authorId);

  return (
    <div className="relative flex flex-col rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
      <div className="absolute left-3 top-3">
        <Indicator state={data?.state} />
      </div>
      <div className="my-2 flex items-center justify-center gap-2">
        {data?.tier === "PREMIUM" && (
          <Tooltip
            content="Premium"
            placement="right"
            style="auto"
            arrow={false}
            theme={tooltipTheme}
          >
            <div className="text-yellow-300">
              <Icon name="star" size={4} />
            </div>
          </Tooltip>
        )}
        <h3 className="text-xl">
          <Link
            className="underline-offset-2 hover:underline"
            href={`/scripts/${scriptGroup}/${data.id}`}
          >
            {data.name}
          </Link>
        </h3>
      </div>
      <div className="flex w-full items-center justify-between text-xs text-gray-600 dark:text-gray-300">
        <div className="flex flex-col">
          <div>Updated</div>
          <TimeAgo date={data.updatedAt} />
        </div>
        {author && (
          <div className="flex flex-col items-end">
            <div>Author</div>
            <a
              href={`https://github.com/${author.name}`}
              className="flex gap-2"
            >
              <span className="h-4 w-4">
                <Image
                  src={author.image}
                  width={16}
                  height={16}
                  className="rounded-full"
                  alt="GitHub avatar of the author"
                />
              </span>
              <span className="underline-offset-2 hover:underline">
                {`${data.authorId === userId ? "(you)" : author.name}`}
              </span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScriptListItem;
