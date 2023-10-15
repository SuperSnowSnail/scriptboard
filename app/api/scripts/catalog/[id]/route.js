import { NextResponse } from "next/server";
import prisma from "@/utils/initPrisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { mkdir, writeFile } from "node:fs/promises";
import getInitialData from "@/utils/initScriptData";

export async function GET(req, context) {
  const id = Number(context.params.id);
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized!" }, { status: 401 });
  }

  const result = await getInitialData("catalog", session, Number(id));

  return NextResponse.json(result, { status: 200 });
}

export async function POST(request, context) {
  const id = Number(context.params.id);
  const session = await getServerSession(authOptions);
  if (
    !session ||
    (session.user.role !== "SUPERUSER" && session.user.role !== "ADMIN")
  ) {
    return NextResponse.json({ message: "Forbidden!" }, { status: 403 });
  }

  const data = await request.json();
  const { config, directory, state, tier, script } = data;

  const newScript = await prisma.script.update({
    where: {
      id,
    },
    data: {
      directory,
      state,
      name: config.name,
      tier,
      config: JSON.stringify(config, null, 2),
      script,
    },
  });

  try {
    await mkdir(`./scripts/${newScript.directory}/`);
    console.log(`Directory ${newScript.directory} has been created!`);
  } catch (error) {
    console.log(`Directory ${newScript.directory} already exists!`);
  }

  try {
    await writeFile(
      `./scripts/${newScript.directory}/bin.sh`,
      newScript.script,
      {
        encoding: "utf-8",
      },
    );
    console.log("File bin.sh has been updated!");
  } catch (error) {
    console.error(error);
  }

  try {
    await writeFile(
      `./scripts/${newScript.directory}/config.json`,
      newScript.config,
      {
        encoding: "utf-8",
      },
    );
    console.log("File config.json has been updated!");
  } catch (error) {
    console.error(error);
  }

  return NextResponse.json({ newScript }, { status: 200 });
}

export const dynamic = "force-dynamic";
