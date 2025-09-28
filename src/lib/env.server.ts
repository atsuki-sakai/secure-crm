import { z } from "zod";

import { DomainError } from "@/lib/errors";

export type EnvRecord = Record<string, string | undefined>;

export const serverEnvInputSchema = z.object({
  PORT: z.string().optional(),
});

export const serverEnvDomainSchema = z.object({
  appPort: z
    .coerce
    .number({ invalid_type_error: "PORT must be a number" })
    .int("PORT must be an integer")
    .min(1, "PORT must be positive")
    .max(65535, "PORT must be less than 65536"),
});

export type ServerEnv = z.infer<typeof serverEnvDomainSchema>;

const normalizeInput = (input: EnvRecord): EnvRecord => ({
  PORT: input.PORT?.trim(),
});

const mapInputToDomain = (input: EnvRecord): ServerEnv => {
  const normalized = normalizeInput(input);
  const inputResult = serverEnvInputSchema.safeParse(normalized);

  if (!inputResult.success) {
    throw new DomainError("Invalid server environment", {
      issues: inputResult.error.flatten(),
    });
  }

  const port = inputResult.data.PORT ?? "3000";
  const domainResult = serverEnvDomainSchema.safeParse({ appPort: port });

  if (!domainResult.success) {
    throw new DomainError("Invalid server environment", {
      issues: domainResult.error.flatten(),
    });
  }

  return domainResult.data;
};

export const parseServerEnv = (input: EnvRecord): ServerEnv => {
  return mapInputToDomain(input);
};

export const loadServerEnv = (source: EnvRecord = process.env): ServerEnv => {
  return parseServerEnv(source);
};
