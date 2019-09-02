# Parámetros:
# 1. Puerto que expondrá el container en el host actual

#!/bin/bash
docker stop devscore.frontend
docker rm devscore.frontend
docker run -d --name devscore.frontend -p $1:9999 devscore-frontend
STATUS=$?
echo $STATUS
exit $STATUS
