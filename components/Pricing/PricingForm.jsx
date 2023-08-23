"use client";

import PricingFormContent from "@/components/Pricing/PricingFormContent";

const PricingFormTitle = ({ children }) => {
  return (
    <h3 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">
      {children}
    </h3>
  );
};

const PricingFormDescription = ({ children }) => {
  return (
    <p className="mb-5 text-sm font-medium text-gray-500 dark:text-gray-300">
      {children}
    </p>
  );
};

const PricingFormWrapper = ({ children }) => {
  return (
    <aside
      className="mx-4 my-8 max-w-2xl rounded-lg border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:p-8"
      aria-label="Contact us"
    >
      {children}
    </aside>
  );
};

PricingFormWrapper.displayName = "PricingForm";
const PricingForm = Object.assign(PricingFormWrapper, {
  Title: PricingFormTitle,
  Description: PricingFormDescription,
  Content: PricingFormContent,
});

export default PricingForm;
