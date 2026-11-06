#!/usr/bin/env node
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';

const json = async file => JSON.parse(await readFile(file, 'utf8'));
const marketplace = await json('.cursor-plugin/marketplace.json');
assert.equal(marketplace.plugins.length, 1, 'Register exactly one Omniscope plugin');
const entry = marketplace.plugins[0];
assert.equal(entry.name, 'omniscope');
assert.equal(entry.source, './plugins/omniscope');
const root = entry.source;
const manifest = await json(path.join(root, '.cursor-plugin/plugin.json'));
assert.equal(manifest.name, entry.name);
assert.match(manifest.version, /^\d+\.\d+\.\d+$/);
assert.equal(manifest.repository, 'https://github.com/visokio/omniscope-cursor-plugin');
assert.equal(manifest.mcpServers, './mcp.json');
assert.equal(manifest.author.name, 'Visokio');
assert.equal(manifest.license, 'MIT');
await access(path.join(root, manifest.logo));
const png = await readFile(path.join(root, manifest.logo));
assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', 'Logo must be a PNG');
const config = await json(path.join(root, manifest.mcpServers));
assert.deepEqual(Object.keys(config.mcpServers), ['omniscope']);
assert.deepEqual(config.mcpServers.omniscope, {
  type: 'http',
  url: 'https://omniscope.visokio.com/_api_/v1/cloudmcp',
  auth: {
    CLIENT_ID: 'https://cursor.com/oauth/mcp-client.json',
    scopes: ['projectapi:execute', 'workflowapi:execute']
  }
});
assert.ok(!manifest.variables, 'Published Cursor client ID requires no installer variable');
assert.ok(!JSON.stringify(config).includes('com.openai'), 'Remove host-specific OpenAI extensions');
for (const file of ['README.md', 'LICENSE', 'docs/marketplace-listing.md', 'docs/review-guide.md']) await access(file);
console.log('Omniscope configuration validation passed.');
