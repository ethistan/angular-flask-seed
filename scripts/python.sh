#!/bin/bash

BASE_DIR=`dirname $0`

if test ! $ENV
then
	ENV=dev
fi

echo ""
echo "Running Nosetests"
echo "Running in environment" $ENV
echo "-------------------------------------------------------------------"

nosetests -c $BASE_DIR/../config/$ENV.app.cfg $*
exit 0