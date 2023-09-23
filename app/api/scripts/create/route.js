import { mkdir, access, constants, writeFile } from "node:fs/promises";
import { NextResponse } from "next/server";
import prisma from "@/utils/initPrisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import * as yup from "yup";

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (
    !session ||
    (session.user.role !== "SUPERUSER" && session.user.role !== "ADMIN")
  ) {
    return NextResponse.json({ message: "Forbidden!" }, { status: 403 });
  }

  const data = await request.json();
  const { directory } = data;

  const script = await prisma.script.findFirst({
    where: {
      directory,
    },
  });

  if (script) {
    return NextResponse.json({ message: "Already exists!" }, { status: 409 });
  }

  const validationSchema = yup.object().shape({
    directory: yup
      .string()
      .strict()
      .trim()
      .required("Required")
      .max(50, "No more than 50 characters")
      .matches(
        /^[^\s^\x00-\x1f\\?*:"";<>|\/.][^\x00-\x1f\\?*:"";<>|\/]*[^\s^\x00-\x1f\\?*:"";<>|\/.]+$/g,
        "Not valid directory name",
      ),
  });

  try {
    await validationSchema.validate({
      directory,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid directory name!" },
      { status: 400 },
    );
  }

  try {
    await mkdir(`./scripts/${directory}/`);
    console.log(`Directory ${directory} has been created!`);
  } catch (error) {
    console.log(`Directory ${directory} already exists!`);
  }

  try {
    await access(`./scripts/${directory}/bin.sh`, constants.F_OK);
    console.log("File bin.sh exists!");
  } catch (error) {
    await writeFile(`./scripts/${directory}/bin.sh`, "", {
      encoding: "utf-8",
    });
    console.log("File bin.sh has been created!");
  }

  try {
    await access(`./scripts/${directory}/config.json`, constants.F_OK);
    console.log("File config.json exists!");
  } catch (error) {
    await writeFile(`./scripts/${directory}/config.json`, "{}", {
      encoding: "utf-8",
    });
    console.log("File config.json has been created!");
  }

  const newScript = await prisma.script.create({
    data: {
      directory,
      state: "UNLISTED",
      authorId: session.user.id,
      name: "New script",
      tier: "BASIC",
      config: "{}",
      script: "",
    },
  });

  return NextResponse.json(
    { message: "New script created", newScript },
    { status: 201 },
  );
}

export const dynamic = "force-dynamic";
