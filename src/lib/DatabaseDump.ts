"use server"
const {execute} = require('@getvim/execute');
export const runInConsole = () => {
    execute('ls')
        .then(console.log)
}
