# Independent deployment

The server must serve both the app and its `/api/airspace` and `/api/notams` routes from the same origin. Deploy the app at the **domain root**: the packaged combined server's static paths are root-relative. GitHub Pages alone cannot run the server. GitHub can hold the source and trigger a suitable hosting service.

## Option A: Cloudflare Workers

1. Install Node.js 22+ and Python 3.10+.
2. In this folder, rebuild and test:

```sh
python3 scripts/manage.py build
python3 scripts/manage.py test
```

On Windows use `py -3` instead of `python3`.

3. Edit the `name` in `wrangler.toml` if desired. The configuration already points to the built combined Worker; do not add a separate static-assets binding.
4. With a Cloudflare account, use the official Wrangler CLI:

```sh
npx wrangler@4 login
npx wrangler@4 deploy --dry-run
npx wrangler@4 deploy
```

These commands download Wrangler from npm when needed; only `deploy` publishes. The host will return your own URL. Account limits, provider terms and any charges are your responsibility; no account or payment details are supplied here. Confirm current Wrangler requirements if its major version changes.

5. Open your HTTPS URL and verify the app, weather, radar and both aviation routes. Upstream failures must be shown as failures/stale data rather than clearance. Verify that refresh and manual briefing declarations behave correctly.
6. Add your own domain and/or access controls through the host if required. Worker deployments do not inherit the original Site's private sign-in policy.
7. Install the PWA from this new URL on each device. Restore exported JSON records before relying on the new origin.

Official configuration reference: https://developers.cloudflare.com/workers/wrangler/configuration/
Official deployment commands: https://developers.cloudflare.com/workers/wrangler/commands/workers/
Compatibility dates: https://developers.cloudflare.com/workers/configuration/compatibility-dates/

## Option B: Node.js host / VPS / container

Run `node scripts/preview-airspace-worker.mjs` as a long-running process. It binds to `127.0.0.1:4173` by default for laptop use. Configure environment variables `HOST=0.0.0.0` and `PORT=4173` through your host when exposing it through a reverse proxy. Use a process manager/container restart policy, HTTPS termination, and your desired authentication. Do not expose this unauthenticated process directly to the public internet if you intend a private service.

An optional Dockerfile is included:

```sh
docker build -t flightdesk-uk .
docker run --rm -p 127.0.0.1:4173:4173 flightdesk-uk
```

The image uses the included prebuilt Worker; rebuild the source before building a new image. For public hosting, put the container behind an HTTPS reverse proxy. The included Node server forwards only GET requests to the combined Worker, matching the app's read-only API.

## Updating and keeping control

Keep the ZIP plus a separate copy of your records backup. Optionally initialise your own Git repository. After editing source, rebuild, test and deploy the complete Worker atomically. Its embedded assets and service-worker cache release must correspond to the same source. Save the live draft before applying a PWA update.

If you change a hostname or move between localhost and HTTPS, export records first: browser storage does not automatically move between origins. Review current rules, aircraft manuals, data schemas and service terms periodically. You control this copy of the code, but the live-data suppliers and hosting providers are separate dependencies.
