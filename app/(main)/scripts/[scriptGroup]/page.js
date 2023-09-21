import { redirect } from "next/navigation";
import { ScriptListProvider } from "@/context/ScriptListContext";
import ScriptListHeader from "@/components/ScriptList/ScriptListHeader";
import ScriptListMain from "@/components/ScriptList/ScriptListMain";

const ScriptsPage = ({ params }) => {
  const { scriptGroup } = params;
  const groups = ["catalog", "running", "archive"];
  if (!groups.includes(scriptGroup)) {
    redirect("/scripts/catalog");
  }
  return (
    <ScriptListProvider initialGroup={scriptGroup}>
      <ScriptListHeader />

      <ScriptListMain />
    </ScriptListProvider>
  );
};

export default ScriptsPage;
