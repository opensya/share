import { execSync } from "node:child_process";
import { consola } from "consola";
import prompts from "prompts";

const registryUrl = "http://localhost:4873";

type VersionChoice =
  | "patch"
  | "minor"
  | "major"
  | "prepatch-alpha"
  | "preminor-alpha"
  | "premajor-alpha"
  | "prepatch-beta"
  | "custom";

function run(command: string): void {
  consola.info(command);
  execSync(command, { stdio: "inherit", env: process.env });
}

const versionChoices = [
  { title: "Patch", value: "patch" },
  { title: "Minor", value: "minor" },
  { title: "Major", value: "major" },
  { title: "Prepatch Alpha", value: "prepatch-alpha" },
  { title: "Preminor Alpha", value: "preminor-alpha" },
  { title: "Premajor Alpha", value: "premajor-alpha" },
  { title: "Prepatch Beta", value: "prepatch-beta" },
  { title: "Custom", value: "custom" },
];

async function main(): Promise<void> {
  consola.start("OpenSya Local Publisher");

  const { versionChoice } = await prompts({
    type: "select",
    name: "versionChoice",
    message: "Select version type",
    choices: versionChoices,
    initial: versionChoices.findIndex(
      (choice) => choice.value === "prepatch-alpha",
    ),
  });
  if (!versionChoice) {
    consola.warn("Annulé.");
    process.exit(0);
  }

  let versionCommand: string;

  if (versionChoice === "custom") {
    const { customVersion } = await prompts({
      type: "text",
      name: "customVersion",
      message: "Enter custom version",
      validate: (value: string) =>
        Boolean(value.trim()) || "Version is required",
    });

    versionCommand = customVersion;
  } else {
    const map: Record<Exclude<VersionChoice, "custom">, string> = {
      patch: "patch",
      minor: "minor",
      major: "major",
      "prepatch-alpha": "prepatch --preid alpha",
      "preminor-alpha": "preminor --preid alpha",
      "premajor-alpha": "premajor --preid alpha",
      "prepatch-beta": "prepatch --preid beta",
    };

    versionCommand = map[versionChoice as Exclude<VersionChoice, "custom">];
  }

  const { confirm } = await prompts({
    type: "confirm",
    name: "confirm",
    message: `Publish to Verdaccio using "${versionCommand}"?`,
    initial: true,
  });

  if (!confirm) {
    consola.warn("Cancelled.");
    process.exit(0);
  }

  try {
    run(`npm whoami --registry ${registryUrl}`);
  } catch {
    consola.error("You are not logged into Verdaccio.");
    consola.info(`npm adduser --registry ${registryUrl} --auth-type=legacy`);
    process.exit(1);
  }

  run("pnpm install --frozen-lockfile");
  run("pnpm build");

  run(`npm version ${versionCommand} --no-git-tag-version`);

  run(`pnpm -r publish --registry ${registryUrl} --no-git-checks`);

  consola.success("Packages successfully published to Verdaccio.");
}

main().catch((error: unknown) => {
  consola.error(error);
  process.exit(1);
});
