const PricingTableHeader = ({ children }) => {
  return (
    <div className="mx-auto mb-8 max-w-screen-md text-center lg:mb-12">
      {children}
    </div>
  );
};

const PricingTableTitle = ({ children }) => {
  return (
    <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
      {children}
    </h2>
  );
};

const PricingTableDescription = ({ children }) => {
  return (
    <p className="mb-5 font-light text-gray-500 dark:text-gray-400 sm:text-xl">
      {children}
    </p>
  );
};

const PricingTableContent = ({ children }) => {
  return (
    <div className="space-y-8 sm:gap-6 lg:grid lg:grid-cols-3 lg:space-y-0 xl:gap-10">
      {children}
    </div>
  );
};

const PricingTableWrapper = ({ children }) => {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        {children}
      </div>
    </section>
  );
};

PricingTableWrapper.displayName = "PricingTable";
const PricingTable = Object.assign(PricingTableWrapper, {
  Header: PricingTableHeader,
  Title: PricingTableTitle,
  Description: PricingTableDescription,
  Content: PricingTableContent,
});

export default PricingTable;
