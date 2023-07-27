-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'PREMIUM', 'SUPERUSER', 'ADMIN');

-- CreateEnum
CREATE TYPE "ScriptState" AS ENUM ('UNLISTED', 'LISTED');

-- CreateEnum
CREATE TYPE "ScriptTier" AS ENUM ('BASIC', 'PREMIUM');

-- CreateEnum
CREATE TYPE "ArchivedScriptState" AS ENUM ('TERMINATED', 'FINISHED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "githubId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Script" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "directory" TEXT NOT NULL,
    "state" "ScriptState" NOT NULL DEFAULT 'UNLISTED',
    "authorId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "tier" "ScriptTier" NOT NULL DEFAULT 'BASIC',
    "config" JSONB NOT NULL,
    "script" TEXT NOT NULL,

    CONSTRAINT "Script_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RunningScript" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "launcherId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "tier" "ScriptTier" NOT NULL DEFAULT 'BASIC',
    "config" JSONB NOT NULL,
    "script" TEXT NOT NULL,
    "startParams" JSONB NOT NULL,
    "pid" INTEGER NOT NULL,
    "output" TEXT NOT NULL,

    CONSTRAINT "RunningScript_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArchivedScript" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "launcherId" INTEGER NOT NULL,
    "state" "ArchivedScriptState" NOT NULL DEFAULT 'FINISHED',
    "name" TEXT NOT NULL,
    "tier" "ScriptTier" NOT NULL DEFAULT 'BASIC',
    "config" JSONB NOT NULL,
    "script" TEXT NOT NULL,
    "startParams" JSONB NOT NULL,
    "output" TEXT NOT NULL,

    CONSTRAINT "ArchivedScript_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoleRequest" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "requestedRole" "Role" NOT NULL DEFAULT 'PREMIUM',
    "email" TEXT NOT NULL,

    CONSTRAINT "RoleRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_githubId_key" ON "User"("githubId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_githubId_idx" ON "User"("githubId");

-- CreateIndex
CREATE UNIQUE INDEX "Script_directory_key" ON "Script"("directory");

-- CreateIndex
CREATE UNIQUE INDEX "RoleRequest_email_key" ON "RoleRequest"("email");

-- AddForeignKey
ALTER TABLE "Script" ADD CONSTRAINT "Script_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RunningScript" ADD CONSTRAINT "RunningScript_launcherId_fkey" FOREIGN KEY ("launcherId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArchivedScript" ADD CONSTRAINT "ArchivedScript_launcherId_fkey" FOREIGN KEY ("launcherId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
