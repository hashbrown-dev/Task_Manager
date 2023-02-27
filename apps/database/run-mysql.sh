#!/bin/bash

set -e

# Helper script used by 'serve-db.sh' to start the actual docker container
# for the DB and confirm that it is running. Should likely not be called 
# directly. Requires that the following environment variables are set:
#  - DB_NAME
#  - DB_PORT
#  - DB_USER
#  - DB_PASS

echo "Launching MySql on localhost:3306 ..."
echo

docker run \
  --platform linux/x86_64 \
  --rm \
  --detach \
  --name local_db \
  --publish 3306:3306 \
  --env MYSQL_ROOT_PASSWORD=password \
  --env MYSQL_DATABASE=local \
  mysql:8.0 \
  --default-authentication-plugin=mysql_native_password

echo "Waiting for DB with name local to launch on port 3306..."
while ! docker exec local_db mysqladmin ping \
  --host=127.0.0.1 \
  --user=root \
  --password=password \
  --silent \
  >/dev/null 2>/dev/null; do
  DOCKER_UP=$(docker container list --latest --quiet)
  if [ -z $DOCKER_UP ]; then
    echo "It seems like the DB crashed while launching."
    exit 1
  fi
  sleep 1
done
echo "DB container is up!"
