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