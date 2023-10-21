import { NextResponse } from "next/server";
import prisma from "@/utils/initPrisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import terminateScript from "@/utils/terminateScript";

export async function GET(req, context) {
  const id = Number(context.params.id);
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized!" }, { status: 401 });
  }

  const script = await prisma.runningScript.findFirst({
    where: {
      id,
      launcherId: session.user.id,
    },
    select: {
      pid: true,
    },
  });

  if (!script || script.pid <= 0) {
    return NextResponse.json({ message: "Forbidden!" }, { status: 403 });
  }

  await terminateScript(script.pid);

  return NextResponse.json({ message: "Script terminated!" }, { status: 200 });
}

export const dynamic = "force-dynamic";
