import { describe, expect, it } from "vitest";

const loadModule = async () => import("../../src/app/(auth)/layout");

describe("Auth layout module", () => {
  it("exports a default layout function", async () => {
    const mod = await loadModule();

    expect(typeof mod.default).toBe("function");
  });

  it("does not expose invalid layout named exports", async () => {
    const mod = await loadModule();

    expect(Object.keys(mod).filter((key) => key !== "default")).toHaveLength(0);
  });
});
