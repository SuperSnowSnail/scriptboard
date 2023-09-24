import { NextResponse } from "next/server";
import prisma from "@/utils/initPrisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized!" }, { status: 401 });
  }

  const authors = await prisma.user.findMany({
    where: {
      role: {
        in: ["SUPERUSER", "ADMIN"],
      },
    },
  });

  return NextResponse.json({ authors }, { status: 200 });
}

export const dynamic = "force-dynamic";
