import { describe, expect, it } from 'bun:test';
import { SAMPLE_CONFIG } from '../../src/services/transcripts/config.js';

describe('transcript watch sample config', () => {
  it('uses project-local AGENTS.md for Codex context injection', () => {
    const codexWatch = SAMPLE_CONFIG.watches.find(watch => watch.name === 'codex');

    expect(codexWatch).toBeDefined();
    expect(codexWatch?.context?.mode).toBe('agents');
    expect(codexWatch?.context?.path).toBeUndefined();
  });
});
  it('recognizes current Codex task_complete as session end', () => {
    const codexSchema = SAMPLE_CONFIG.schemas?.codex;
    const sessionEnd = codexSchema?.events.find((event) => event.name === 'session-end');

    expect(sessionEnd?.match.path).toBe('payload.type');
    expect(sessionEnd?.match.in).toContain('task_complete');
  });
