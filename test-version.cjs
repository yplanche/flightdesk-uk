const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const pkg=JSON.parse(fs.readFileSync('package.json')),meta=JSON.parse(fs.readFileSync('dist/version.json'));
assert.match(pkg.version,/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/);assert.equal(meta.appVersion,pkg.version);assert.equal(meta.licence,'AGPL-3.0-only');
const ctx={window:{}};vm.runInNewContext(fs.readFileSync('dist/version.js','utf8'),ctx);assert.equal(ctx.window.FLIGHTDESK_BUILD.buildId,meta.buildId);assert(fs.existsSync('dist/'+meta.sourceArchive));assert(fs.readFileSync('LICENSE','utf8').includes('GNU AFFERO GENERAL PUBLIC LICENSE'));
assert(fs.readFileSync('dist/version-ui.js','utf8').includes('Loaded build:'));assert(fs.readFileSync('COPYRIGHT.md','utf8').includes('not legal copyright ownership'));
console.log('Version metadata, source archive and licensing checks passed.');
