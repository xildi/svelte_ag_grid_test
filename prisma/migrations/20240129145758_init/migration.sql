-- CreateTable
CREATE TABLE "Row" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "game_name" TEXT NOT NULL,
    "bought" BOOLEAN NOT NULL,
    "bank_balance" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "total_winnings" INTEGER NOT NULL,
    "jan" INTEGER NOT NULL,
    "feb" INTEGER NOT NULL,
    "mar" INTEGER NOT NULL,
    "apr" INTEGER NOT NULL,
    "may" INTEGER NOT NULL,
    "jun" INTEGER NOT NULL,
    "jul" INTEGER NOT NULL,
    "aug" INTEGER NOT NULL,
    "sep" INTEGER NOT NULL,
    "oct" INTEGER NOT NULL,
    "nov" INTEGER NOT NULL,
    "dec" INTEGER NOT NULL
);
