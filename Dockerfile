FROM node:22-alpine AS builder
WORKDIR /grow
COPY package*.json ./
RUN npm ci --omit=dev
RUN npm cache clear --force
COPY . .
RUN mv .env.production .env
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /grow
RUN npm i http-server -g
RUN npm cache clear --force
COPY --from=builder /grow/dist .

EXPOSE 5173
CMD ["http-server",".","-p","5173"]