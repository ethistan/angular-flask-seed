#!/bin/bash

BASE_DIR=`dirname $0`

if test ! $ENV
then
	ENV=dev
fi

echo ""
echo "Starting Karma Server (http://karma-runner.github.io)"
echo "Running in environment" $ENV
echo "-------------------------------------------------------------------"



$BASE_DIR/../node_modules/karma/bin/karma start $BASE_DIR/../config/$ENV/karma.conf.js $*
exit 0