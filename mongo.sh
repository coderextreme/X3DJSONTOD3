#!/bin/bash
find ~/Downloads/www.web3d.org/www.web3d.org/x3d/content/examples -name '*.json' -print0 | xargs -0 node mongo.js
