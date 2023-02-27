#!/bin/bash

set -e

#  This script starts a local docker container containing an instance 
#  of PostgreSQL.
#
#  Args: 
#    $1                   (Mandatory)  The path to the nx app directory of  
#                                      the database. In most cases this will
#                                      be `apps/digitact/postgres-db`.
#  Flags:   
#    --no-migrations      (Optional)   Spawns a database but does not instruct 
#                                      TypeORM to run migrations.
#    --no-attach          (Optional)   Shell exits once db has started successfully.
#                                      Useful for calling this script from another
#                                      script
#    --seed               (Optional)   Inserts dummy data into the db for testing.
#                                      Cannot be used with `--no-migrations`.
#    --environment=<env>  (Optional)   Selects a specific environment to use to 
#                                      create the database. Defaults to 'local'.
#                                      Will be used as the name for the docker 
#                                      container AND enclosed db. Useful if multiple
#                                      DBs are desired simultaneously as each must
#                                      have a unique name

# Start database
apps/database/run-mysql.sh

# Run typeorm migrations
npx nx run database:typeorm-cli --args="migration:run"
echo -e "\nDatabase migrations completed!\n"

# Run database seeds
docker exec local_db mysql \
  --user=root \
  --password=password \
  < apps/database/seeds/main.sql
echo -e "\nDatabase has been seeded 🌱\n"

echo "You can kill the process with CTRL+\\"
docker attach local_db
