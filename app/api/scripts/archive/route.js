import { NextResponse } from "next/server";
import prisma from "@/utils/initPrisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized!" }, { status: 401 });
  }

  const scripts = await prisma.archivedScript.findMany({
    where: {
      launcherId: session.user.id,
    },
    select: {
      id: true,
      updatedAt: true,
      name: true,
      tier: true,
      state: true,
    },
  });

  return NextResponse.json({ scripts }, { status: 200 });
}

export const dynamic = "force-dynamic";
