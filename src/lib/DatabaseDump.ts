"use server"
const {execute} = require('@getvim/execute');
const dotenv = require('dotenv').config();
export const runInConsole = () => {
    const username = process.env.POSTGRES_USER;
    const database = process.env.POSTGRES_DATABASE;
    const dbHost = process.env.POSTGRES_HOST;
    const dbPort = "5432";

    const date = new Date();
    const today = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    const backupFile = `pg-backup-${today}.tar`;

    execute(`pg_dump -U ${username} -h ${dbHost} -p ${dbPort} -f $/tmp/${backupFile} -F t -d ${database}`)
        .then(async () => {
            console.log(`Backup created successfully`);
        })
        .catch((err: any) => {
            console.log(err);
        });
}
