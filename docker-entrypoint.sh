#!/bin/bash
set -e

exec "yarn create-db"
exec "yarn start"