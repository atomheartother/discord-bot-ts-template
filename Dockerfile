FROM node:15.7.0-alpine as compiler
# Compile in a separate container
WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .
RUN yarn build

FROM node:15.7.0-alpine

# Don't run Docker as root!
RUN addgroup --gid 10001 nonroot && adduser --gecos "Bot user" --uid 10000 --ingroup nonroot --home /home/nonroot --disabled-password nonroot

WORKDIR /home/nonroot/app

# Copy build files and install using yarn
COPY package.json .
COPY yarn.lock .
RUN yarn install --production

# Copy everything we need over
COPY lang/ lang/
COPY --from=compiler /app/dist ./dist

RUN chown -R 10000:10001 .

# Use the non-root user to run our application
USER nonroot

CMD [ "yarn", "start"]
