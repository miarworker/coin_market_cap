-- CreateTable
CREATE TABLE "Coin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "circulatingSupply" TEXT NOT NULL,
    "totalSupply" TEXT NOT NULL,
    "coingeckoId" TEXT,
    "coinMarketCapId" TEXT,

    CONSTRAINT "Coin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cex" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Cex_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dex" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Dex_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoinPrice" (
    "coinId" INTEGER NOT NULL,
    "cexId" INTEGER,
    "dexId" INTEGER,
    "price" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "_CoinToDex" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CexToCoin" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Coin_name_key" ON "Coin"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Cex_name_key" ON "Cex"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Dex_name_key" ON "Dex"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CoinPrice_coinId_createdAt_key" ON "CoinPrice"("coinId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "_CoinToDex_AB_unique" ON "_CoinToDex"("A", "B");

-- CreateIndex
CREATE INDEX "_CoinToDex_B_index" ON "_CoinToDex"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CexToCoin_AB_unique" ON "_CexToCoin"("A", "B");

-- CreateIndex
CREATE INDEX "_CexToCoin_B_index" ON "_CexToCoin"("B");

-- AddForeignKey
ALTER TABLE "CoinPrice" ADD CONSTRAINT "CoinPrice_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Coin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoinPrice" ADD CONSTRAINT "CoinPrice_cexId_fkey" FOREIGN KEY ("cexId") REFERENCES "Cex"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoinPrice" ADD CONSTRAINT "CoinPrice_dexId_fkey" FOREIGN KEY ("dexId") REFERENCES "Dex"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoinToDex" ADD CONSTRAINT "_CoinToDex_A_fkey" FOREIGN KEY ("A") REFERENCES "Coin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoinToDex" ADD CONSTRAINT "_CoinToDex_B_fkey" FOREIGN KEY ("B") REFERENCES "Dex"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CexToCoin" ADD CONSTRAINT "_CexToCoin_A_fkey" FOREIGN KEY ("A") REFERENCES "Cex"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CexToCoin" ADD CONSTRAINT "_CexToCoin_B_fkey" FOREIGN KEY ("B") REFERENCES "Coin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
