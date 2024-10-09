#bin/bash
 docker run -d     --name postgres     -e POSTGRES_USER=lamadev     -e POSTGRES_PASSWORD=lama123456     -e POSTGRES_DB=school     -p 5432:5432     postgres:15