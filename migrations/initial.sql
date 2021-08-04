CREATE TABLE "movimientos_crypto" (
	"id"	INTEGER, PRIMARY KEY("id" AUTOINCREMENT)
	"fecha"	TEXT NOT NULL,
	"hora"	TEXT NOT NULL,
	"moneda_from"	TEXT NOT NULL,
	"cantidad_inicial"	REAL NOT NULL,
	"moneda_to"	TEXT NOT NULL,
	"cantidad_resultante"	REAL NOT NULL,
);