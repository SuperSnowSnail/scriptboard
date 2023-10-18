"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

const ArchiveFormContext = createContext();

const ArchiveFormProvider = ({ children, id, initialData }) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const scriptData = {
    initialValues: JSON.parse(initialData.startParams),
    config: JSON.parse(initialData.config),
    lines: initialData.output.split("\n"),
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const formik = useFormik({
    initialValues: scriptData.initialValues,
    validateOnChange: false,
    validateOnBlur: false,
  });

  const rerunScript = async () => {
    const response = await fetch(`/api/scripts/archive/${id}/rerun`);
    const result = await response.json();
    router.push(`/scripts/running/${result.id}`);
  };

  const context = {
    config: JSON.parse(initialData.config),
    rerunScript,
    mounted,
    formik,
    lines: scriptData.lines,
  };

  return (
    <ArchiveFormContext.Provider value={context}>
      {children}
    </ArchiveFormContext.Provider>
  );
};

const useArchiveFormContext = () => {
  const context = useContext(ArchiveFormContext);

  if (!context) {
    throw new Error(
      "useArchiveFormContext should be used within the ArchiveFormContext provider!",
    );
  }

  return context;
};

export { ArchiveFormProvider, useArchiveFormContext };
