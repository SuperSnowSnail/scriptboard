"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

const RunningFormContext = createContext();

const RunningFormProvider = ({ children, id, initialData }) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [pid, setPid] = useState(initialData.pid);
  const [lines, setLines] = useState(initialData.output.split("\n"));
  const scriptData = {
    initialValues: JSON.parse(initialData.startParams),
    config: JSON.parse(initialData.config),
  };

  useEffect(() => {
    const eventSource = new EventSource(`/api/scripts/running/${id}/sse`);

    eventSource.addEventListener(`pid-assigned-for-id-${id}`, (event) => {
      const { data: pid } = event;
      setPid(Number(pid));
    });

    eventSource.addEventListener(`stdout-for-id-${id}`, (event) => {
      const { data } = event;
      const updated = JSON.parse(data);
      setLines(updated.updatedOutput.split("\n"));
    });

    eventSource.addEventListener(`stderr-for-id-${id}`, (event) => {
      const { data } = event;
      const updated = JSON.parse(data);
      setLines(updated.updatedOutput.split("\n"));
    });

    eventSource.addEventListener(`close-for-id-${id}`, (event) => {
      const { data: archivedId } = event;
      eventSource.close();
      router.push(`/scripts/archive/${archivedId}`);
    });

    setMounted(true);

    return () => {
      eventSource.close();
    };
  }, [id, router]);

  const formik = useFormik({
    initialValues: scriptData.initialValues,
    validateOnChange: false,
    validateOnBlur: false,
  });

  const terminateScript = async () => {
    const response = await fetch(`/api/scripts/running/${id}/terminate`);
    const result = await response.json();
    /* router.push(`/scripts/running/${result.id}`); */
  };

  const context = {
    config: JSON.parse(initialData.config),
    terminateScript,
    mounted,
    formik,
    pid,
    lines,
  };

  return (
    <RunningFormContext.Provider value={context}>
      {children}
    </RunningFormContext.Provider>
  );
};

const useRunningFormContext = () => {
  const context = useContext(RunningFormContext);

  if (!context) {
    throw new Error(
      "useRunningFormContext should be used within the RunningFormContext provider!",
    );
  }

  return context;
};

export { RunningFormProvider, useRunningFormContext };
