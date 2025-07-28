#!/bin/sh

STATUS="{{.State.Health.Status}}"
attempt=0
while [ $attempt -le 59 ]; do
  attempt=$(( attempt + 1 ))
  is_healthy=$(docker inspect -f ${STATUS} "${1}")
  if [ "$is_healthy" = "healthy" ]; then
    echo "The container is running..."
    exit 0
  fi
  echo "(attempt: $attempt) Container status is ${is_healthy}..."
  sleep 1;
done;
echo "The container has failed to start..."
exit 1