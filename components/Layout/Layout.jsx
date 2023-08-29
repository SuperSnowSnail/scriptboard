"use client";

import { useRef } from "react";
import Link from "next/link";
import { Drawer } from "flowbite";
import Icon from "@/components/Icon";
import ThemeToggle from "@/components/ThemeToggle";
import GithubLink from "@/components/GithubLink";
import UserDropdown from "@/components/Layout/UserDropdown";

const SidebarBtn = ({
  href,
  iconName,
  label,
  rightItem: RightItem,
  special,
}) => {
  const renderInner = () => (
    <>
      <div
        className={
          special
            ? "flex-shrink-0 text-orange-400 transition duration-75 group-hover:text-white"
            : "text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
        }
      >
        <Icon name={iconName} size={5} />
      </div>
      <span className="ml-3 flex-1 whitespace-nowrap">{label}</span>
      {RightItem && <RightItem />}
    </>
  );
  return (
    <li>
      <Link
        href={href}
        className={
          special
            ? "group flex items-center rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 text-gray-900 hover:bg-gray-100 hover:text-white focus:outline-none focus:ring-4 focus:ring-pink-200 group-hover:from-pink-500 group-hover:to-orange-400 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-pink-800"
            : "group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        }
      >
        {special ? (
          <span className="flex w-full items-center rounded-md bg-white p-1.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-800">
            {renderInner()}
          </span>
        ) : (
          renderInner()
        )}
      </Link>
    </li>
  );
};

const Layout = ({ session }) => {
  const drawerRef = useRef(null);
  const { role } = session.user;

  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                onClick={() => drawerRef.current?.toggle()}
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 sm:hidden"
              >
                <span className="sr-only">Open sidebar</span>
                <Icon name="hamburger" size={6} />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <GithubLink />
              <ThemeToggle />
              <UserDropdown session={session} />
            </div>
          </div>
        </div>
      </nav>
      <aside
        id="logo-sidebar"
        className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white pt-20 transition-transform dark:border-gray-700 dark:bg-gray-800 sm:translate-x-0"
        aria-label="Sidebar"
        ref={(ref) => {
          if (!drawerRef.current) {
            drawerRef.current = new Drawer(ref, {
              placement: "left",
              backdrop: true,
            });
          }
        }}
      >
        <div className="h-full overflow-y-auto bg-white px-3 pb-4 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {role === "ADMIN" && (
              <>
                <SidebarBtn
                  href="/dashboard"
                  iconName="dashboard"
                  label="Dashboard"
                />
                <SidebarBtn href="/users" iconName="users" label="Users" />
              </>
            )}
            <SidebarBtn
              href="/scripts"
              iconName="scripts"
              label="Scripts"
              rightItem={() => (
                <span className="ml-3 inline-flex h-3 w-3 items-center justify-center rounded-full bg-blue-100 p-3 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  3
                </span>
              )}
            />
            <SidebarBtn href="/docs" iconName="docs" label="Docs" />
            <SidebarBtn
              href="/pricing"
              iconName="fire"
              label="Upgrade plan"
              special
            />
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Layout;
