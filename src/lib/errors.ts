export type AppErrorContext = Record<string, unknown> | undefined;

export class DomainError extends Error {
  public readonly context: AppErrorContext;

  constructor(message: string, context?: AppErrorContext) {
    super(message);
    this.name = "DomainError";
    this.context = context;
  }
}

export class InfraError extends Error {
  public readonly context: AppErrorContext;

  constructor(message: string, context?: AppErrorContext) {
    super(message);
    this.name = "InfraError";
    this.context = context;
  }
}
