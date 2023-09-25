import { NextResponse } from "next/server";
import prisma from "@/utils/initPrisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized!" }, { status: 401 });
  }
  const query = {};

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

  const scripts = await prisma.script.findMany({
    where: query,
    select: {
      id: true,
      updatedAt: true,
      state: true,
      authorId: true,
      name: true,
      tier: true,
    },
  });

  return NextResponse.json({ scripts }, { status: 200 });
}

export const dynamic = "force-dynamic";
