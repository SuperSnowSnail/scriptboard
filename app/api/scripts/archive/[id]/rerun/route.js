import { NextResponse } from "next/server";
import prisma from "@/utils/initPrisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import executeScript from "@/utils/executeScript";

export async function GET(req, context) {
  const id = Number(context.params.id);
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized!" }, { status: 401 });
  }

  const script = await prisma.archivedScript.findFirst({
    where: {
      id,
      launcherId: session.user.id,
    },
  });

  if (!script) {
    return NextResponse.json({ message: "Forbidden!" }, { status: 403 });
  }

  const runningScript = await prisma.runningScript.create({
    data: {
      launcherId: session.user.id,
      name: script.name,
      tier: script.tier,
      config: script.config,
      script: script.script,
      startParams: script.startParams,
      pid: -1,
      output: "",
    },
  });

  executeScript(runningScript);

  return NextResponse.json({ id: runningScript.id }, { status: 201 });
}

export const dynamic = "force-dynamic";
