from pathlib import Path
import json,base64,mimetypes
root=Path(__file__).resolve().parents[1];assets={}
for p in sorted((root/'dist').rglob('*')):
 if p.suffix=='.zip':continue # Source archives deploy as separate static assets, not Worker code.
 if not p.is_file() or 'server' in p.relative_to(root/'dist').parts or '.openai' in p.relative_to(root/'dist').parts:continue
 name='/'+str(p.relative_to(root/'dist'));mime=mimetypes.guess_type(p.name)[0] or 'application/octet-stream'
 if p.suffix=='.webmanifest':mime='application/manifest+json'
 if p.suffix=='.js':mime='application/javascript'
 assets[name]={'type':mime,'body':base64.b64encode(p.read_bytes()).decode()}
code=(root/'worker/fflate.mjs').read_text()+'\nconst STATIC_ASSETS='+json.dumps(assets,separators=(',',':'))+';\n'+(root/'worker/index.mjs').read_text().replace("import {unzipSync,strFromU8} from './fflate.mjs';",'')
out=root/'dist/server/index.js';out.parent.mkdir(exist_ok=True);out.write_text(code);(out.parent/'package.json').write_text('{"type":"module"}\n')
print('Worker built:',len(assets),'static assets;',len(code),'bytes')
