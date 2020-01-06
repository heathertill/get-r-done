export default {
    knex: {
        client: 'mysql',
        connection: {
            connectionLimit: 10,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            host: process.env.DB_HOST,
            database: process.env.DB_SCHEMA
        }
    },
    auth: {
        secret: process.env.SECRET
    }
}

mysql://b550de9c2838dc:dcd9b5ec@us-cdbr-iron-east-05.cleardb.net/heroku_8df472d45ef8918?reconnect=true