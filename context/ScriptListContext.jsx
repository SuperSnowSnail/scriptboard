"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { sortBy } from "lodash";

const ScriptListContext = createContext();

const ScriptListProvider = ({ children, initialGroup }) => {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const [scriptGroup, setScriptGroup] = useState(initialGroup);
  const [searchQuery, setSearchQuery] = useState("");
  const [editedId, setEditedId] = useState(null);

  const [catalog, setCatalog] = useState([]);
  const [running, setRunning] = useState([]);
  const [archive, setArchive] = useState([]);
  const [authors, setAuthors] = useState([]);

  const scripts = { catalog, running, archive };

  const role = session?.user.role;
  const userId = session?.user.id;

  useEffect(() => {
    const fetchInitialData = async () => {
      const authorsResponse = await fetch("/api/scripts/authors");
      const authorsData = await authorsResponse.json();

      const catalogResponse = await fetch("/api/scripts/catalog");
      const catalogData = await catalogResponse.json();

      const runningResponse = await fetch("/api/scripts/running");
      const runningData = await runningResponse.json();

      const archiveResponse = await fetch("/api/scripts/archive");
      const archiveData = await archiveResponse.json();

      setCatalog(catalogData.scripts);
      setRunning(runningData.scripts);
      setArchive(archiveData.scripts);
      setAuthors(authorsData.authors);
      setMounted(true);
    };
    fetchInitialData();
  }, []);

  const unsortedQueriedScripts = scripts[scriptGroup].filter((script) =>
    searchQuery === ""
      ? true
      : script.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const queriedScripts = sortBy(unsortedQueriedScripts, "updatedAt").reverse();

  const context = {
    mounted,
    role,
    userId,
    authors,
    scriptGroup,
    setScriptGroup,
    searchQuery,
    setSearchQuery,
    queriedScripts,
    editedId,
    setEditedId,
  };

  return (
    <ScriptListContext.Provider value={context}>
      {children}
    </ScriptListContext.Provider>
  );
};

const useScriptListContext = () => {
  const context = useContext(ScriptListContext);

  if (!context) {
    throw new Error(
      "useScriptListContext should be used within the ScriptListContext provider!",
    );
  }

  return context;
};

export { ScriptListProvider, useScriptListContext };
