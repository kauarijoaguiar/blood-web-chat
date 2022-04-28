const { Client } = require('pg')

const dbcon = new Client({
    connectionString: 'postgres://wbahhowkfmzpsc:a8028023691f21f18bf6def97f6b4cd144cd0728d766a4683d4c15bd3abc30af@ec2-52-21-136-176.compute-1.amazonaws.com:5432/d9njesnvuolu3b',
    ssl: {
        rejectUnauthorized: false
    }
});

dbcon.connect(err => {
    if (err) {
        console.log("Erro ao conectar ao banco de dados.");
        console.log({ err });
    }
});

module.exports = {
    dbcon
}