#!/bin/bash

forever stopall

npm i
npm run build
rm -r ./build/dropbox
ln -s ~/Dropbox/ ./build/dropbox

forever start -o ./prod.log -e ./prod.err.log ./src/prod.js
forever start -o ./api.log -e ./api.err.log ./api/server.js