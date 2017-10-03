#!/bin/bash

git_message=$1

echo $1

git add .

git commit -m "$git_message"

git push origin master

echo "$0 done!"
