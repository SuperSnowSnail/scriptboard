import Link from "next/link";
import { redirect } from "next/navigation";
import "flowbite";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ThemeToggle from "@/components/ThemeToggle";
import GithubLink from "@/components/GithubLink";
import SignInButton from "@/components/SignInButton";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("scripts/catalog");
  }

  return (
    <div className="flex h-screen flex-col items-center justify-start">
      <div className="flex w-full max-w-7xl justify-end gap-4 p-6">
        <Link href={"/docs"} className="p-2">
          Docs
        </Link>
        <Link href={"/pricing"} className="p-2">
          Pricing
        </Link>
        <GithubLink />
        <ThemeToggle />
      </div>

      <section className="flex h-full w-full items-center justify-center">
        <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:py-16">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            Scripts made easy
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:px-48 lg:text-xl">
            <span className="font-medium text-black underline decoration-red-500 decoration-wavy underline-offset-2 dark:text-white">
              Scriptboard
            </span>{" "}
            is a platform that allows you to run pre-configured shell scripts
            through user-friendly web-interface. Sign in with your GitHub
            account to give it a try!
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-lg bg-blue-700 px-5 py-3 text-center text-base font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              Quickstart
              <svg
                className="ml-2 h-3.5 w-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
            <SignInButton />
          </div>
        </div>
      </section>
    </div>
  );
}
