require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const roles = [
    { name: 'viewAdmin' },
    { name: 'modifyAdmin' },
    { name: 'superAdmin' },
];

async function main(){
    for(const role of roles) {
        await prisma.role.create({data: role});
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    });