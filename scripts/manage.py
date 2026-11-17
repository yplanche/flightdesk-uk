#!/usr/bin/env python3
"""Dependency-free portable build/test/start commands."""
import argparse, pathlib, shutil, subprocess, sys
root = pathlib.Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('command', choices=['build', 'test', 'start'])
args = parser.parse_args()
def run(command):
    subprocess.run(command, cwd=root, check=True)
try:
    if args.command == 'build':
        run([sys.executable, 'scripts/update-pwa-version.py'])
        run([sys.executable, 'scripts/build-airspace-worker.py'])
    else:
        node = shutil.which('node')
        if not node:
            sys.exit('Install Node.js 22 or newer from https://nodejs.org/ first.')
        if args.command == 'test':
            for test in sorted(root.glob('test-*.cjs')):
                run([node, str(test)])
        else:
            run([node, 'scripts/preview-airspace-worker.mjs'])
except KeyboardInterrupt:
    pass
except subprocess.CalledProcessError as error:
    sys.exit(error.returncode)
