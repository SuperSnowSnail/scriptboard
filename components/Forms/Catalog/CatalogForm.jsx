"use client";

import { useRef, useEffect } from "react";
import { useCatalogFormContext } from "@/context/CatalogFormContext";

import Header from "@/components/Forms/Catalog/Header";
import ParamsList from "@/components/Forms/Catalog/ParamsList";
import Content from "@/components/Forms/Catalog/Content";

const CatalogForm = () => {
  const { editedParamIndex, execFormik, editFormik, editMode, mounted } =
    useCatalogFormContext();

  const contentBlockRef = useRef(null);

  useEffect(() => {
    if (editedParamIndex !== null) {
      contentBlockRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [editedParamIndex]);

  if (!mounted) {
    return (
      <div className="flex w-[calc(100vw_-_2rem)] flex-col gap-4 sm:w-[calc(100vw_-_18rem)] lg:h-[calc(100vh_-_6rem)] lg:flex-wrap">
        <Header />
        <ParamsList />
        <Content ref={contentBlockRef} />
      </div>
    );
  }

  const formik = editMode ? editFormik : execFormik;

  return (
    <form onSubmit={formik.handleSubmit}>
      <fieldset
        disabled={formik.isSubmitting}
        className="flex w-[calc(100vw_-_2rem)] flex-col gap-4 sm:w-[calc(100vw_-_18rem)] lg:h-[calc(100vh_-_6rem)] lg:flex-wrap"
      >
        <Header />
        <ParamsList />
        <Content ref={contentBlockRef} />
      </fieldset>
    </form>
  );
};

export default CatalogForm;
