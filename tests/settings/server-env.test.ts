import { describe, expect, it } from "vitest";

import { DomainError } from "@/lib/errors";
import { loadServerEnv, parseServerEnv, type EnvRecord } from "@/lib/env.server";

type OverrideEnv = Partial<EnvRecord>;

const createEnv = (overrides: OverrideEnv = {}): EnvRecord => ({
  ...overrides,
});

describe("parseServerEnv", () => {
  it("defaults appPort to 3000 when PORT is missing", () => {
    const env = createEnv();

    const result = parseServerEnv(env);

    expect(result.appPort).toBe(3000);
  });

  it("parses numeric port from PORT variable", () => {
    const env = createEnv({ PORT: "4100" });

    const result = parseServerEnv(env);

    expect(result.appPort).toBe(4100);
  });

  it("throws DomainError when PORT is not a positive integer", () => {
    const env = createEnv({ PORT: "invalid" });

    expect(() => parseServerEnv(env)).toThrowError(DomainError);
  });
});

describe("loadServerEnv", () => {
  it("reads from process.env when no source is provided", () => {
    const originalPort = process.env.PORT;
    delete process.env.PORT;

    expect(() => loadServerEnv()).not.toThrow();

    if (originalPort === undefined) {
      delete process.env.PORT;
    } else {
      process.env.PORT = originalPort;
    }
  });
});
