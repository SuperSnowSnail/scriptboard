"use client";
import { useEffect, useState } from "react";
import SignInButton from "@/components/SignInButton";
import Icon from "@/components/Icon";

const PricingCardBtn = ({ formik, role, currentRole, scrollToInput }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="animate-pulse cursor-wait rounded-lg bg-gray-300 px-5 py-5 text-center text-sm font-medium hover:bg-gray-400 focus:ring-4 focus:ring-gray-200 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-900" />
    );
  }

  if (!currentRole && role === "USER") {
    return <SignInButton />;
  }

  if (currentRole === role) {
    return (
      <button className="cursor-not-allowed rounded-lg bg-white px-5 py-2.5 text-center text-sm font-medium hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700  dark:focus:ring-gray-900">
        Current plan
      </button>
    );
  }

  if (role === formik.values.requestedRole) {
    return (
      <button className="flex justify-center rounded-lg bg-blue-800 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-900 focus:ring-4 focus:ring-blue-200 dark:text-white  dark:focus:ring-blue-950">
        <div className="mr-2 flex-shrink-0 text-green-500 dark:text-green-400">
          <Icon name="checkmark" size={5} />
        </div>
        <span>Choosen</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => {
        scrollToInput();
        formik.setFieldValue("requestedRole", role);
      }}
      className="rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 dark:text-white  dark:focus:ring-blue-900"
    >
      Choose plan
    </button>
  );
};

export default PricingCardBtn;
