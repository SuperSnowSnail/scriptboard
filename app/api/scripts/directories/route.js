import { NextResponse } from "next/server";
import prisma from "@/utils/initPrisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (
    !session ||
    (session.user.role !== "SUPERUSER" && session.user.role !== "ADMIN")
  ) {
    return NextResponse.json({ message: "Forbidden!" }, { status: 403 });
  }

  const scriptsWithDirectories = await prisma.script.findMany({
    select: {
      directory: true,
    },
  });
  const directories = scriptsWithDirectories.map((script) => script.directory);

  return NextResponse.json({ directories }, { status: 200 });
}

export const dynamic = "force-dynamic";
