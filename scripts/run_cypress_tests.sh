#!/usr/bin/env bash

if [ -z "$CYPRESS_TOKEN" ]; then
    # we are in a fork PR
    yarn run cypress:run
else
    # build is running for a origin PR
    yarn run cypress:run --record --key $CYPRESS_TOKEN
fi
