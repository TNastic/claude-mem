import { describe, expect, it } from 'bun:test';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { globSync } from 'glob';
import { normalizeGlobPath } from '../../src/services/transcripts/watcher.js';

describe('transcript watcher path handling', () => {
  it('normalizes Windows-style glob paths before glob matching', () => {
    const root = mkdtempSync(join(tmpdir(), 'claude-mem-transcripts-'));

    try {
      const sessionDir = join(root, 'sessions', '2026', '04', '15');
      mkdirSync(sessionDir, { recursive: true });
      writeFileSync(join(sessionDir, 'rollout-test.jsonl'), '{}\n');

      const nativePattern = join(root, 'sessions', '**', '*.jsonl');
      const windowsPattern = nativePattern.replace(/\//g, '\\');
      const matches = globSync(normalizeGlobPath(windowsPattern), { nodir: true, absolute: true });

      expect(matches.length).toBe(1);
      expect(matches[0].replace(/\\/g, '/')).toContain('/sessions/2026/04/15/rollout-test.jsonl');
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
});