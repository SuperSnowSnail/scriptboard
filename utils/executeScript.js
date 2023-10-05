import { spawn } from "node:child_process";
import prisma from "@/utils/initPrisma";
import emitter from "@/utils/emitter";
import getArgs from "@/utils/getArgs";
import getEscapedArgs from "@/utils/escapeArgs";

const executeScript = async (scriptData) => {
  const { id, config, script, startParams } = scriptData;

  const args = getArgs(JSON.parse(config), JSON.parse(startParams));

  const process = spawn(
    `sh -c 'sleep 2\n${script}\nsleep 2' /bin/sh`,
    getEscapedArgs(args),
    { shell: true },
  );

  const updatedRunningScript = await prisma.runningScript.update({
    where: {
      id,
    },
    data: {
      pid: process.pid,
    },
  });

  emitter.emit(`pid-assigned-for-id-${id}`, updatedRunningScript.pid);

  process.stdout.on("data", async (data) => {
    const current = await prisma.runningScript.findFirst({
      where: {
        id,
      },
      select: {
        output: true,
      },
    });
    const updated = await prisma.runningScript.update({
      where: {
        id,
      },
      data: {
        output: `${current.output}\n${data.toString()}`,
      },
    });
    emitter.emit(`stdout-for-id-${id}`, updated.output);
  });

  process.stderr.on("data", async (data) => {
    const current = await prisma.runningScript.findFirst({
      where: {
        id,
      },
      select: {
        output: true,
      },
    });
    const updated = await prisma.runningScript.update({
      where: {
        id,
      },
      data: {
        output: `${current.output}\n${data.toString()}`,
      },
    });
    emitter.emit(`stderr-for-id-${id}`, updated.output);
  });

  process.on("close", async (code, signal) => {
    const current = await prisma.runningScript.findFirst({
      where: {
        id,
      },
    });
    const { launcherId, name, tier, config, script, startParams, output } =
      current;
    const archivedScript = await prisma.archivedScript.create({
      data: {
        launcherId,
        state: code !== 0 || signal !== null ? "TERMINATED" : "FINISHED",
        name,
        tier,
        config,
        script,
        startParams,
        output,
      },
    });
    await prisma.runningScript.delete({
      where: {
        id,
      },
    });
    emitter.emit(`close-for-id-${id}`, archivedScript.id);
    return;
  });
};

export default executeScript;
