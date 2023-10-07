import prisma from "@/utils/initPrisma";
import { redirect } from "next/navigation";

const getCatalogScript = async (session, id) => {
  const result = {
    script: {},
    isReady: true,
  };
  const query = {
    id,
  };

  if (session.user.role === "USER") {
    query.tier = "BASIC";
  }

  if (session.user.role === "USER" || session.user.role === "PREMIUM") {
    query.state = "LISTED";
  }

  if (session.user.role === "SUPERUSER") {
    query.OR = [
      {
        state: "LISTED",
      },
      {
        state: "UNLISTED",
        authorId: id,
      },
    ];
  }

  const script = await prisma.script.findFirst({
    where: query,
  });

  if (!script) {
    redirect("/scripts/catalog");
  }

  result.script = script;

  const hasEditPermission = () => {
    if (session.user.role === "ADMIN") {
      return true;
    }

    if (
      session.user.role === "SUPERUSER" &&
      session.user.id === script.authorId
    ) {
      return true;
    }

    return false;
  };

  if (!hasEditPermission()) {
    delete result.script.directory;
    delete result.script.script;
  }

  const scriptConfig = JSON.parse(script.config);

  if (
    !scriptConfig.name ||
    !scriptConfig.description ||
    !scriptConfig.outputType
  ) {
    result.isReady = false;
  }

  return result;
};

const getRunningScript = async (session, id) => {
  const script = await prisma.runningScript.findFirst({
    where: {
      id,
      launcherId: session.user.id,
    },
    select: {
      id: true,
      config: true,
      startParams: true,
      pid: true,
      output: true,
    },
  });

  if (!script) {
    redirect("/scripts/catalog");
  }

  return script;
};

const getArchiveScript = async (session, id) => {
  const script = await prisma.archivedScript.findFirst({
    where: {
      id,
      launcherId: session.user.id,
    },
    select: {
      id: true,
      config: true,
      startParams: true,
      output: true,
    },
  });

  if (!script) {
    redirect("/scripts/catalog");
  }

  return script;
};

const getInitialData = async (scriptGroup, session, id) => {
  switch (scriptGroup) {
    case "catalog": {
      return await getCatalogScript(session, id);
    }
    case "running": {
      return await getRunningScript(session, id);
    }
    case "archive": {
      return await getArchiveScript(session, id);
    }
    default: {
      redirect("/scripts/catalog");
    }
  }
};

export default getInitialData;
