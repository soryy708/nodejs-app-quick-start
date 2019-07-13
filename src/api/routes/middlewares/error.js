import db from '../../db';

const ErrorLog = db.models.errorLog;

function generatePublicId(length = 8) {
    let publicId = '';
    for (let i = 0; i < length; ++i) {
        const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        const capitalLetters = letters.map((letter) => letter.toUpperCase());
        const validCharacters = numbers.concat(letters).concat(capitalLetters);
        publicId += validCharacters[Math.floor(Math.random() * validCharacters.length)];
    }
    return publicId;
}

export default (err, req, res, next) => {
    const publicId = generatePublicId();

    console.error(err.stack);
    if (!res.headersSent) {
        res.status(500).send(`generic/${publicId}`);
    }

    ErrorLog.create({
        publicId: publicId,
        message: err.toString(),
        stackTrace: err.stack,
        requestingUserId: req.requestingUserId || null,
        requestingAuthTokenId: req.headers.authorization || null,
    })
        .catch((err) => {
            console.error('Could not log error to database. Reason: ', err);
        });
};
