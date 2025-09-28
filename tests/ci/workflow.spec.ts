import { describe, expect, it } from 'vitest';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const workflowPath = resolve(process.cwd(), '.github/workflows/ci.yml');

async function loadWorkflow(): Promise<string> {
  return readFile(workflowPath, 'utf-8');
}

describe('GitHub Actions CI workflow', () => {
  it('存在すること', async () => {
    const workflow = await loadWorkflow();

    expect(workflow.length).toBeGreaterThan(0);
  });

  it('テスト実行ジョブを定義すること', async () => {
    const workflow = await loadWorkflow();

    const expectations: readonly string[] = [
      'name: CI Pipeline',
      'on:',
      '  push:',
      '  pull_request:',
      'runs-on: ubuntu-latest',
      'uses: actions/setup-node@v4',
      'node-version: 20',
      'run: npm ci',
      'run: npm run test'
    ];

    for (const expectedSnippet of expectations) {
      expect(workflow).toContain(expectedSnippet);
    }
  });
});
