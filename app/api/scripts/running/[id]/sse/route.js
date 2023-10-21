import { NextResponse } from "next/server";
import prisma from "@/utils/initPrisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import emitter from "@/utils/emitter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
  });

  if (!script) {
    return NextResponse.json({ message: "Forbidden!" }, { status: 403 });
  }

  let responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();

  const intervalId = setInterval(() => {
    writer.write(encoder.encode(`event: keep-alive\ndata: \n\n`));
  }, 120000);

  emitter.on(`pid-assigned-for-id-${id}`, (pid) => {
    writer.write(
      encoder.encode(`event: pid-assigned-for-id-${id}\ndata: ${pid}\n\n`),
    );
  });

  emitter.on(`stdout-for-id-${id}`, (updatedOutput) => {
    writer.write(
      encoder.encode(
        `event: stdout-for-id-${id}\ndata: ${JSON.stringify({
          updatedOutput,
        })}\n\n`,
      ),
    );
  });

  emitter.on(`stderr-for-id-${id}`, (updatedOutput) => {
    writer.write(
      encoder.encode(
        `event: stderr-for-id-${id}\ndata: ${JSON.stringify({
          updatedOutput,
        })}\n\n`,
      ),
    );
  });

  emitter.on(`close-for-id-${id}`, (archivedId) => {
    clearInterval(intervalId);
    writer.write(
      encoder.encode(`event: close-for-id-${id}\ndata: ${archivedId}\n\n`),
    );
  });

  return new Response(responseStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
