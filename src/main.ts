import * as path from "path";
import * as context from "./context";
import * as uncomplicated from "./uncomplicated";
import * as core from "@actions/core";
import * as exec from "@actions/exec";

async function run(): Promise<void> {
  try {
    const inputs: context.Inputs = await context.getInputs();
    core.debug(`${uncomplicated.toolName} inputs ${inputs}`);

    const bin = await uncomplicated.install(inputs.version);
    core.info(
      `${uncomplicated.toolName} ${inputs.version} installed successfully`
    );

    const directory = path.dirname(bin);
    core.addPath(directory);
    core.debug(`Added ${directory} to PATH`);

    core.debug(`Running ${uncomplicated.toolName} upload`);
    const out = await exec.getExecOutput(`${bin} upload .`, undefined, {});
    core.setOutput("output", out.stdout);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
