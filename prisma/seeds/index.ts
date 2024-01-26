import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const binance = await prisma.cex.upsert({
    where: { name: 'Binance' },
    update: {},
    create: {
      name: 'Binance',
    },
  });
  const xrp = await prisma.coin.upsert({
    where: { name: 'Ripple' },
    update: {},
    create: {
      name: 'Ripple',
      symbol: 'XRP',
      circulatingSupply: '',
      totalSupply: '',
      cexs: { connect: { id: binance.id } },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
