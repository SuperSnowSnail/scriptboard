"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { Tooltip, Dropdown } from "flowbite-react";

const dropdownTheme = {
  floating: {
    style: {
      auto: "border border-gray-200 bg-white text-gray-900 dark:border-gray-900 dark:bg-gray-800 dark:text-white",
    },
  },
};

const tooltipTheme = {
  base: "max-w-[15rem] absolute inline-block z-10 rounded-lg py-2 px-3 text-sm font-medium shadow-sm",
  style: {
    auto: "border border-gray-200 bg-white text-gray-900 dark:border-gray-900 dark:bg-gray-800 dark:text-white",
  },
};

const RoleBadge = ({ role }) => {
  const params = {
    color: "gray",
    letter: "D",
    tooltip: "Default",
  };
  switch (role) {
    case "USER": {
      params.colorTag = "text-gray-400";
      params.letter = "U";
      params.tooltip = "User";
      break;
    }
    case "PREMIUM": {
      params.colorTag = "text-yellow-400";
      params.letter = "P";
      params.tooltip = "Premium";
      break;
    }
    case "SUPERUSER": {
      params.colorTag = "text-green-400";
      params.letter = "SU";
      params.tooltip = "SuperUser";
      break;
    }
    case "ADMIN": {
      params.colorTag = "text-red-400";
      params.letter = "A";
      params.tooltip = "Admin";
      break;
    }
    default: {
      return null;
    }
  }

  return (
    <Tooltip
      content={params.tooltip}
      placement="left"
      style="auto"
      arrow={false}
      theme={tooltipTheme}
    >
      <span className={`text-base font-extrabold ${params.colorTag}`}>
        {params.letter}
      </span>
    </Tooltip>
  );
};

const UserDropdown = ({ session }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <span className="h-8 w-8 animate-pulse rounded-full bg-gray-100 dark:bg-gray-700"></span>
    );
  }

  return (
    <Dropdown
      arrowIcon={false}
      inline
      rounded
      theme={dropdownTheme}
      label={
        <div className="flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
          <span className="sr-only">Open user menu</span>
          <Image
            src={session.user.image}
            width={32}
            height={32}
            className="rounded-full"
            alt="GitHub avatar of the author"
          />
        </div>
      }
    >
      <Dropdown.Header>
        <div className="flex flex-col text-sm">
          <div className="flex items-baseline justify-between gap-4">
            <span>{session.user.name}</span>
            <RoleBadge role={session.user.role} />
          </div>
          <span className="truncate font-medium">{session.user.email}</span>
        </div>
      </Dropdown.Header>
      <Dropdown.Item onClick={() => signOut({ callbackUrl: "/" })}>
        Sign out
      </Dropdown.Item>
    </Dropdown>
  );
};

export default UserDropdown;
