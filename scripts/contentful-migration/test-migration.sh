#!/usr/bin/env bash

# clones master to temporary environment,
# applies active migration,
# waits for user input (allowing temp environment to be tested),
# then deletes temporary environment

tempEnv=migration-test-$(date +"%s")

echo "Creating temporary environment"
contentful space environment create --name "Migration test $(date +"%s")" --source master -e $tempEnv -w
echo "Applying active migration"
contentful space migration -e $tempEnv ./scripts/contentful-migration/active.js -y

echo "Press any key to delete temporary environment"
while [ true ] ; do
read -t 3 -n 1
if [ $? = 0 ] ; then
echo ""
break
fi
done

echo "Deleting temporary environment"
contentful space environment delete -e $tempEnv

echo "Migration test completed"
