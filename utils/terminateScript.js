import { promisify } from "node:util";
import { exec } from "node:child_process";

const execP = promisify(exec);

const terminateScript = async (pid) => {
  const result = await execP(`sh ./utils/terminate.sh ${pid}`);
  return result;
};

export default terminateScript;
