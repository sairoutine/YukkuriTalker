#!/bin/sh
DIR=$(cd $(dirname $0); pwd)
$DIR/node_modules/pm2/bin/pm2 start process.json --no-daemon
