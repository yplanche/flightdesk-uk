#!/usr/bin/env python3
from pathlib import Path
import hashlib,re
root=Path(__file__).resolve().parents[1]/'dist'
files=sorted(p for p in root.rglob('*') if p.is_file() and p.name!='sw.js' and 'server' not in p.relative_to(root).parts and '.openai' not in p.relative_to(root).parts)
h=hashlib.sha256()
for p in files:h.update(str(p.relative_to(root)).encode());h.update(p.read_bytes())
p=root/'sw.js';p.write_text(re.sub(r"const RELEASE='[^']+';","const RELEASE='"+h.hexdigest()[:16]+"';",p.read_text()))
print('PWA cache version:',h.hexdigest()[:16])
