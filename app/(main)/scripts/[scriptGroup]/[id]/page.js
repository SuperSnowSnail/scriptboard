import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import getInitialData from "@/utils/initScriptData";

import { CatalogFormProvider } from "@/context/CatalogFormContext";
import CatalogForm from "@/components/Forms/Catalog/CatalogForm";
import { RunningFormProvider } from "@/context/RunningFormContext";
import RunningForm from "@/components/Forms/Running/RunningForm";
import { ArchiveFormProvider } from "@/context/ArchiveFormContext";
import ArchiveForm from "@/components/Forms/Archive/ArchiveForm";

const ScriptPage = async ({ params }) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  const { scriptGroup, id } = params;

  const data = await getInitialData(scriptGroup, session, Number(id));

  switch (scriptGroup) {
    case "catalog": {
      return (
        <CatalogFormProvider id={id} initialData={data}>
          <CatalogForm />
        </CatalogFormProvider>
      );
    }
    case "running": {
      return (
        <RunningFormProvider id={id} initialData={data}>
          <RunningForm />
        </RunningFormProvider>
      );
    }
    case "archive": {
      return (
        <ArchiveFormProvider id={id} initialData={data}>
          <ArchiveForm />
        </ArchiveFormProvider>
      );
    }
    default: {
      redirect("/scripts/catalog");
    }
  }
};

export default ScriptPage;
