#!/usr/bin/env python3
"""Increment a release version once; build never increments it."""
from pathlib import Path
import datetime,json,re,sys
root=Path(__file__).resolve().parents[1]
if len(sys.argv)!=2 or sys.argv[1] not in ('major','minor','patch'):sys.exit('Usage: python3 scripts/release.py major|minor|patch')
p=root/'package.json';data=json.loads(p.read_text());old=data['version'];parts=list(map(int,old.split('-')[0].split('.')));index={'major':0,'minor':1,'patch':2}[sys.argv[1]];parts[index]+=1
for i in range(index+1,3):parts[i]=0
data['version']='.'.join(map(str,parts));p.write_text(json.dumps(data,indent=2)+'\n')
now=datetime.datetime.now(datetime.timezone.utc).replace(microsecond=0);release=json.loads((root/'RELEASE.json').read_text());release['releasedAt']=now.isoformat().replace('+00:00','Z');(root/'RELEASE.json').write_text(json.dumps(release,indent=2)+'\n')
c=root/'CHANGELOG.md';c.write_text(c.read_text().replace('# Changelog','# Changelog\n\n## '+data['version']+' — '+now.date().isoformat()+'\n\nDescribe changes, migrations and known limitations before publishing.',1))
print(old+' -> '+data['version']+'. Review CHANGELOG.md, then build and test. No Git tag or deployment was created.')
