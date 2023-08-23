import PricingCardBtn from "@/components/Pricing/PricingCardBtn";
import Icon from "@/components/Icon";

const PricingCardTitle = ({ children }) => {
  return <h3 className="mb-4 text-2xl font-semibold">{children}</h3>;
};

const PricingCardDescription = ({ children }) => {
  return (
    <p className="font-light text-gray-500 dark:text-gray-400 sm:text-lg">
      {children}
    </p>
  );
};

const PricingCardPrice = ({ children }) => {
  return (
    <div className="my-8 flex items-baseline justify-center">{children}</div>
  );
};

const PricingCardList = ({ children }) => {
  return (
    <ul role="list" className="mb-8 space-y-4 text-left">
      {children}
    </ul>
  );
};

const PricingCardPro = ({ children }) => {
  return (
    <li className="flex items-center space-x-3">
      <div className="flex-shrink-0 text-green-500 dark:text-green-400">
        <Icon name="checkmark" size={5} />
      </div>
      <span>{children}</span>
    </li>
  );
};

const PricingCardCon = ({ children }) => {
  return (
    <li className="flex items-center space-x-3 line-through decoration-gray-500">
      <div className="flex-shrink-0 text-gray-400 dark:text-gray-500">
        <Icon name="checkmark" size={5} />
      </div>
      <span className="text-gray-500">{children}</span>
    </li>
  );
};

const PricingCardWrapper = ({ children }) => {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col rounded-lg border border-gray-100 bg-white p-6 text-center text-gray-900 shadow dark:border-gray-600 dark:bg-gray-800 dark:text-white xl:p-8">
      {children}
    </div>
  );
};

PricingCardWrapper.displayName = "PricingCard";
const PricingCard = Object.assign(PricingCardWrapper, {
  Title: PricingCardTitle,
  Description: PricingCardDescription,
  Price: PricingCardPrice,
  List: PricingCardList,
  Pro: PricingCardPro,
  Con: PricingCardCon,
  Btn: PricingCardBtn,
});

export default PricingCard;
