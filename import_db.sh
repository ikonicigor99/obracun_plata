#!/bin/bash

# Naziv kontejnera
CONTAINER_NAME="mysql_kontenjer"

# Naziv SQL fajla
SQL_FILE="obracun_plata.sql"

# Naziv baze
DB_NAME="obracun_plata"

# MySQL korisničko ime i lozinka
DB_USER="root"
DB_PASS="root"

echo "👉 Kopiranje $SQL_FILE u kontejner..."
docker cp $SQL_FILE $CONTAINER_NAME:/tmp/$SQL_FILE

echo "📦 Importovanje baze u MySQL..."
docker exec -i $CONTAINER_NAME mysql -u $DB_USER -p$DB_PASS $DB_NAME < $SQL_FILE

if [ $? -eq 0 ]; then
    echo "✅ Uspješno importovana baza podataka!"
else
    echo "❌ Greška pri importovanju!"
fi

✅ 2. Daj dozvolu za izvršavanje

U terminalu (dok si u folderu projekta):

chmod +x import_db.sh
✅ 3. Pokreni skriptu

./import_db.sh