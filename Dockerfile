FROM node:22-alpine
WORKDIR /app
COPY dist/server ./dist/server
COPY scripts/preview-airspace-worker.mjs ./scripts/preview-airspace-worker.mjs
ENV HOST=0.0.0.0 PORT=4173
EXPOSE 4173
USER node
CMD ["node", "scripts/preview-airspace-worker.mjs"]
