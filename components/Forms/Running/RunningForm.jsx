import Header from "@/components/Forms/Running/Header";
import ParamsList from "@/components/Forms/Running/ParamsList";
import Content from "@/components/Forms/Running/Content";

const RunningForm = () => {
  return (
    <div className="flex w-[calc(100vw_-_2rem)] flex-col gap-4 sm:w-[calc(100vw_-_18rem)] lg:h-[calc(100vh_-_6rem)] lg:flex-wrap">
      <Header />
      <ParamsList />
      <Content />
    </div>
  );
};

export default RunningForm;
