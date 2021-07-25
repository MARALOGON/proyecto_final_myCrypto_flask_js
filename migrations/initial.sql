CREATE TABLE "movimientos_crypto" (
	"id"	INTEGER,
	"fecha"	TEXT NOT NULL,
	"hora"	TEXT NOT NULL,
	"moneda_from"	TEXT NOT NULL,
	"cantidad_inicial"	REAL NOT NULL,
	"moneda_to"	TEXT NOT NULL,
	"cantidad_resultante"	REAL NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);