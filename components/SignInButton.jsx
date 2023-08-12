"use client";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import Icon from "@/components/Icon";

const SignInButton = () => {
  const [mounted, setMounted] = useState(false);
  const { status } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted || status === "loading") {
    return (
      <button
        type="button"
        className="mb-2 mr-2 inline-flex h-12 animate-pulse cursor-wait items-center justify-center rounded-lg bg-[#24292F] hover:bg-[#24292F]/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 dark:hover:bg-[#050708]/30 dark:focus:ring-gray-500 sm:w-[190px]"
      ></button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => signIn("github", { callbackUrl: "/scripts/catalog" })}
      className="mb-2 mr-2 inline-flex items-center justify-center rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-lg font-medium text-white hover:bg-[#24292F]/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 dark:hover:bg-[#050708]/30 dark:focus:ring-gray-500 sm:text-sm"
    >
      <Icon name="github" size={4} />
      <span className="ml-2">Sign in with Github</span>
    </button>
  );
};

export default SignInButton;
