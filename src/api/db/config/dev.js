import path from 'path';

export default {
    dialect: 'sqlite',
    storage: path.join(__dirname, '../../db.sqlite3'),
    host: null,
    database: null,
    username: null,
    password: null,
    logging: console.log,
};
