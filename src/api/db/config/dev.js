import path from 'path';

function getStoragePath() {
    function getRoot() {
        function isPackaged() {
            function isUsingPkg() {
                return process.pkg && process.pkg.entrypoint;
            }
            return isUsingPkg(); // TODO: What about Electron?
        }
        if (isPackaged()) {
            return process.cwd();
        }
        return path.join(__dirname, '../../');
    }

    return path.join(getRoot(), 'db.sqlite3');
}

export default {
    dialect: 'sqlite',
    storage: getStoragePath(),
    host: null,
    database: null,
    username: null,
    password: null,
    logging: console.log,
};
