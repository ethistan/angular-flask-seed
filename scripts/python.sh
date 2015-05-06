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

nosetests -c $BASE_DIR/../config/$ENV/app.cfg $* --with-cover --cover-xml --cover-xml-file=test_out/python_coverage.xml --cover-package=alfred
exit 0