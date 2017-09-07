#!/bin/bash

forever start -o ./prod.log -e ./prod.err.log ./src/prod.js
forever start -o ./api.log -e ./api.err.log ./api/server.js
