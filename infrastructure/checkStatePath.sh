#!/bin/bash
set -e
echo totoo
EXPECTED_VALUE=`git remote -v | grep fetch | cut -d "@" -f 2 | cut -d "(" -f 1 | sed s_:_/_ | sed s_.git_/terraform.tfstate_ | tr -d " "`
echo "EXPECTED_VALUE: $EXPECTED_VALUE"
for i in `ls -d */`; do
    pushd $i
        RECEIVED_VALUE=`cat main.tf | grep key | grep "state" | cut -d "=" -f 2 | tr -d " " | tr -d '"'`
        echo "RECEIVED_VALUE: $RECEIVED_VALUE"
        if [ "$EXPECTED_VALUE" != "$RECEIVED_VALUE" ]; then
            echo >&2 "
***************
*** ABORTED ***
***************
RECEIVED = '$RECEIVED_VALUE'
EXPECTED = '$EXPECTED_VALUE'
            "
            exit 1
        else
            echo "Path value of $i folder is correct"
        fi
    popd
done