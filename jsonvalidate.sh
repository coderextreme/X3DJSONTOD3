#!/bin/sh
#
# jsonvalidate.sh
#
#
# validate that a JSON file can be used properly by the strict subset of JavaScript
# REQUIREMENTS:
#   node.js is available on your PATH
#   Bourne shell compatible shell

echo "$1"
(echo '"use strict"; var json = '; cat "$1") | node
