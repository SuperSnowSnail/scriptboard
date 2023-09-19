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
    setMounted(true);
  }, []);

  useEffect(() => {
    // Imitating fetching data from DB
    setCatalog([
      {
        id: 12345,
        name: "Some name",
        directory: "some_dir",
        state: "LISTED",
        tier: "BASIC",
        authorId: 11,
      },
      {
        id: 12385,
        name: "Soome name",
        directory: "soome_dir",
        state: "UNLISTED",
        tier: "BASIC",
        authorId: 12,
      },
      {
        id: 12399,
        name: "Sooome name",
        directory: "sooome_dir",
        state: "LISTED",
        tier: "PREMIUM",
        authorId: 12,
      },
    ]);
    setRunning([
      {
        id: 103,
        launcherId: 12,
        name: "Other name",
      },
      {
        id: 153,
        launcherId: 11,
        name: "Oother name",
      },
      {
        id: 186,
        launcherId: 12,
        name: "Ooother name",
      },
    ]);
    setArchive([
      {
        id: 123,
        launcherId: 12,
        state: "TERMINATED",
        name: "Another name",
      },
      {
        id: 127,
        launcherId: 11,
        state: "FINISHED",
        name: "Aanother name",
      },
      {
        id: 129,
        launcherId: 12,
        state: "FINISHED",
        name: "Aaanother name",
      },
    ]);
    // role === SUPERUSER || role === ADMIN
    setAuthors([
      {
        id: 11,
        name: "SomeDude",
        image: "https://avatars.githubusercontent.com/u/118603347?v=4",
      },
      {
        id: 12,
        name: "SuperSnowSnail",
        image: "https://avatars.githubusercontent.com/u/118603847?v=4",
      },
    ]);
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
