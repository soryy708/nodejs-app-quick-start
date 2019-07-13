// https://medium.com/infocentric/setup-a-rest-api-with-sequelize-and-express-js-fae06d08c0a7

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import dbConfig from './config';

const db = {
    models: {},
};

const sequelize = dbConfig.dialect === 'sqlite' ? (
    new Sequelize(dbConfig)
) : (
    new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig)
);

(async function() {
    fs.readdirSync(path.join(__dirname, '/models'))
        .forEach((file) => {
            if (file.endsWith('.js')) {
                const model = sequelize.import(path.join(__dirname, '/models/', file.replace(/\.js$/u, '')));
                db.models[model.name] = model;
            }
        });

    Object.keys(db.models).forEach((modelName) => {
        if (db.models[modelName].associate) {
            db.models[modelName].associate(db.models);
        }
    });

    await sequelize.authenticate();

    await sequelize.sync({alter: true}); // TODO: Delete this

    console.log('Done initializing sequelize');

})().catch((err) => {
    console.log('Error initializing sequelize: ', err);
});

export default db;
