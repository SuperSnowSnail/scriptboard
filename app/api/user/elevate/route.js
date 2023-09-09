import { NextResponse } from "next/server";
import prisma from "@/utils/initPrisma";

export async function POST(request) {
  const data = await request.json();
  const roleRequest = await prisma.roleRequest.create({
    data,
  });
  return NextResponse.json(
    { message: "Role request created", roleRequest },
    { status: 201 },
  );
}

export const dynamic = "force-dynamic";
