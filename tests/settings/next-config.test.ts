import { describe, expect, it } from "vitest";

import nextConfig from "../../next.config";

describe("next.config", () => {
  it("enables standalone output for Docker runtime", () => {
    expect(nextConfig.output).toBe("standalone");
  });
});
