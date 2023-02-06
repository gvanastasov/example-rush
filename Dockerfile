FROM alpine AS scratchpad
WORKDIR /files
COPY . .
RUN rm -rvf apps/ libs/
RUN ls -ltra

FROM node:16-alpine
ENV CI=true

# should probably use rush deploy strategy to 
# determine different dependencies to copy and
# change access rights to...
RUN mkdir -p \ 
        /home/node/app/apps/example-calculator/node_modules \
        /home/node/app/libs/example-components/node_modules \
        /home/node/app/libs/example-math/node_modules \
    && chown -R node:node /home/node/app \
    && chmod 750 /home/node/app

WORKDIR /home/node/app

COPY --from=scratchpad /files .
COPY 'apps/example-calculator/' apps/example-calculator/
COPY 'libs/example-math/' libs/example-math/
COPY 'libs/example-components/' libs/example-components/

USER node

RUN ls -ltra

RUN node ./common/scripts/install-run-rush.js update
RUN node ./common/scripts/install-run-rush.js build

CMD ["npm", "start", "--prefix", "apps/example-calculator"]