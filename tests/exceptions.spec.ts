import { execSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

// Temporary test exceptions are marked TODO(M<n>), where <n> is the milestone
// that removes them. This test fails on that milestone's branch until the
// exception is gone, and from milestone 5 on it fails if any remain. The
// milestone comes from the branch name: m2-home is milestone 2.
const branch =
  process.env.GITHUB_HEAD_REF || execSync("git branch --show-current", { encoding: "utf8" }).trim();
const milestone = Number(/^m(\d+)/.exec(branch)?.[1] ?? 0);

test("no temporary test exception outlives its milestone", () => {
  test.skip(milestone === 0, `${branch || "This checkout"} is not a milestone branch`);
  const overdue = readdirSync("tests")
    .filter((file) => file.endsWith(".ts"))
    .flatMap((file) =>
      [...readFileSync(`tests/${file}`, "utf8").matchAll(/TODO\(M(\d+)\)/g)]
        .filter(([, due]) => milestone >= 5 || Number(due) <= milestone)
        .map(([marker]) => `tests/${file}: ${marker}`),
    );
  expect(overdue).toEqual([]);
});
