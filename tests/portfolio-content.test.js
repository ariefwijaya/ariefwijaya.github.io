import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {stories} from '../world/src/content.js';

test('Fintelite story links to the experience that holds its result', () => {
  assert.equal(stories.lead.link, '/#experience');
  assert.equal(stories.lead.linkText, 'Read my experience');
  assert.match(readFileSync(new URL('../index.html', import.meta.url), 'utf8'), /id="experience"/);
});
