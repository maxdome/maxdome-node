#!/usr/bin/env bash

COMMAND="prettier --single-quote --trailing-comma es5 --print-width 120 --write"

if [ "$1" ]
  then
    $COMMAND "$1"
elif [ -f ".gitignore" ]
  then
    find . -name "*.js" | grep -v -f .gitignore | xargs $COMMAND
else
  $COMMAND "**/*.js"
fi
