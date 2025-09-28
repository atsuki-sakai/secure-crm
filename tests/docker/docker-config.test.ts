import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { describe, it, expect, beforeAll } from "vitest";
import path from "node:path";

const projectRoot = path.resolve(fileURLToPath(new URL("../..", import.meta.url)));

const readProjectFile = async (relativePath: string): Promise<string> => {
  const absolutePath = path.join(projectRoot, relativePath);
  return readFile(absolutePath, "utf8");
};

describe("Docker configuration", () => {
  let dockerfileContent: string;
  let composeContent: string;

  beforeAll(async () => {
    dockerfileContent = await readProjectFile("Dockerfile");
    composeContent = await readProjectFile("docker-compose.yml");
  });

  it("includes a multi-stage build using the Node 18 slim image", () => {
    expect(dockerfileContent).toContain("FROM node:18-slim AS base");
    expect(dockerfileContent).toContain("FROM node:18-slim AS runner");
    expect(dockerfileContent).toContain("npm ci");
    expect(dockerfileContent).toContain("npm run build");
    expect(dockerfileContent).toContain("@tailwindcss/oxide");
    expect(dockerfileContent).toContain("USER nextjs");
  });

  it("documents the Dockerfile with Japanese guidance", () => {
    const japaneseCommentPattern = /#.*[\u3040-\u30ff\u4e00-\u9faf]/;
    expect(japaneseCommentPattern.test(dockerfileContent)).toBe(true);
  });

  it("runs the app service with hot reload and correct env in docker-compose", () => {
    expect(composeContent).toContain("services:");
    expect(composeContent).toContain("app:");
    expect(composeContent).toContain("build:");
    expect(composeContent).toContain("context: .");
    expect(composeContent).toContain("target: runner");
    expect(composeContent).toContain("command: [\"npm\", \"run\", \"dev\"]");
    expect(composeContent).toContain("ports:");
    expect(composeContent).toContain("\"3000:3000\"");
    expect(composeContent).toContain("PORT=3000");
    expect(composeContent).toContain("volumes:");
  });

  it("documents the docker-compose file with Japanese guidance", () => {
    const japaneseCommentPattern = /#.*[\u3040-\u30ff\u4e00-\u9faf]/;
    expect(japaneseCommentPattern.test(composeContent)).toBe(true);
  });
});
