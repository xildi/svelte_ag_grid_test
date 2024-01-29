import { PrismaClient } from '@prisma/client';
import input from "../src/lib/static/input.json" assert {type: "json"}

const prisma = new PrismaClient();

async function main() {
    console.log(`Start seeding...`);

    for (const i of input) {
        const row = await prisma.row.create({
            data: {
                name: i.Name,
                language: i.Language,
                country: i.Country,
                game_name: i.Game_Name,
                bought: (i.Bought == "true"),
                bank_balance: parseInt(i.Bank_Balance),
                rating: parseInt(i.Rating),
                total_winnings: parseInt(i.Total_winnings),
                jan: parseInt(i.Jan),
                feb: parseInt(i.Feb),
                mar: parseInt(i.Mar),
                apr: parseInt(i.Apr),
                may: parseInt(i.May),
                jun: parseInt(i.Jun),
                jul: parseInt(i.Jul),
                aug: parseInt(i.Aug),
                sep: parseInt(i.Sep),
                oct: parseInt(i.Oct),
                nov: parseInt(i.Nov),
                dec: parseInt(i.Dec)
            }
        })
        console.log(`Created row with id: ${row.id}`)

  }

  console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
