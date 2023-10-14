"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import {
  getExecSchema,
  getEditSchema,
  getParamSchema,
} from "@/utils/validation/validationSchemas";
import {
  getExecValues,
  getEditValues,
  getParamValues,
} from "@/utils/validation/initialValues";
import cleanupConfig from "@/utils/cleanupConfig";

const CatalogFormContext = createContext();

const CatalogFormProvider = ({ children, id, initialData }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const isReady = initialData.isReady;
  const scriptData = {
    ...initialData.script,
    config: JSON.parse(initialData.script.config),
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const role = session?.user.role;

  const [editMode, setEditMode] = useState(!isReady);
  const [editedParamIndex, setEditedParamIndex] = useState(null);
  const [scriptCode, setScriptCode] = useState(scriptData.script);

  const initialParam = getParamValues();

  const execFormik = useFormik({
    initialValues: getExecValues(scriptData.config),
    validationSchema: getExecSchema(scriptData.config),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { setSubmitting }) => {
      const data = {
        userData: values,
        config: scriptData.config,
      };
      const response = await fetch(`/api/scripts/catalog/${id}/execute`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result);
      router.push(`/scripts/running/${result.id}`);
      /* redirect(`/scripts/running/${result.id}`); */
      /* setTimeout(() => { */
      setSubmitting(false);
      /* }, 10000); */
    },
  });

  const editFormik = useFormik({
    initialValues: getEditValues(
      scriptData.config,
      scriptData.directory,
      scriptData.state,
      scriptData.tier,
    ),
    validationSchema: getEditSchema(),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { setSubmitting }) => {
      const data = {
        config: cleanupConfig(values),
        directory: values.directory,
        state: values.listed ? "LISTED" : "UNLISTED",
        tier: values.premium ? "PREMIUM" : "BASIC",
        script: scriptCode.replace(/\r\n/g, "\n"),
      };
      const response = await fetch(`/api/scripts/catalog/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      window.location.reload();
      setSubmitting(false);
    },
  });

  const paramFormik = useFormik({
    initialValues: getParamValues(scriptData.config, editedParamIndex),
    validationSchema: getParamSchema(),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { setSubmitting, setValues }) => {
      editFormik.setFieldValue(`params[${editedParamIndex}]`, values);
      setEditedParamIndex(null);
      setValues(initialParam);
      setSubmitting(false);
    },
  });

  const context = {
    config: scriptData.config,
    mounted,
    role,
    isReady,
    execFormik,
    editFormik,
    paramFormik,
    initialParam,
    editMode,
    setEditMode,
    editedParamIndex,
    setEditedParamIndex,
    scriptCode,
    setScriptCode,
  };

  return (
    <CatalogFormContext.Provider value={context}>
      {children}
    </CatalogFormContext.Provider>
  );
};

const useCatalogFormContext = () => {
  const context = useContext(CatalogFormContext);

  if (!context) {
    throw new Error(
      "useCatalogFormContext should be used within the CatalogFormContext provider!",
    );
  }

  return context;
};

export { CatalogFormProvider, useCatalogFormContext };
