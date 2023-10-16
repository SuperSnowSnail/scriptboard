import { NextResponse } from "next/server";
import prisma from "@/utils/initPrisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { isEqual } from "lodash";
import getArgs from "@/utils/getArgs";
import executeScript from "@/utils/executeScript";
import emitter from "@/utils/emitter";

export async function POST(request, context) {
  const id = Number(context.params.id);
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized!" }, { status: 401 });
  }

  const script = await prisma.script.findFirst({
    where: {
      id,
    },
  });

  if (!script) {
    return NextResponse.json(
      { message: "Script doesn't exist!" },
      { status: 404 },
    );
  }

  if (script.state === "UNLISTED") {
    return NextResponse.json(
      { message: "Cannot execute unlisted script" },
      { status: 409 },
    );
  }

  if (session.user.role === "USER" && script.tier === "PREMIUM") {
    return NextResponse.json(
      { message: "Cannot execute premium script as non-elevated user!" },
      { status: 403 },
    );
  }

  const data = await request.json();
  const { userData, config } = data;

  if (!isEqual(JSON.parse(script.config), config)) {
    return NextResponse.json(
      {
        message:
          "Script's config on client and server doesn't match, refresh page!",
      },
      { status: 409 },
    );
  }

  const runningScript = await prisma.runningScript.create({
    data: {
      launcherId: session.user.id,
      name: script.name,
      tier: script.tier,
      config: script.config,
      script: script.script,
      startParams: JSON.stringify(userData),
      pid: -1,
      output: "",
    },
  });

  executeScript(runningScript);

  /* emitter.on(
    `pid-assigned-for-id-${runningScript.id}`,
    (updatedRunningScript) => {
      redirect(`/scripts/running/${runningScript.id}`);
    },
  ); */

  /* const newScript = await prisma.script.update({
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
  }); */

  return NextResponse.json({ id: runningScript.id }, { status: 201 });
  /* return new Response(JSON.stringify({ message: "keep-alive" }), {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Connection: "keep-alive",
    },
  }); */
}

export const dynamic = "force-dynamic";
