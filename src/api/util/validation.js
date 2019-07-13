function exists(o) {
    return o !== undefined && o !== null;
}

function isBool(o) {
    return o === true || o === false;
}

function isString(o) {
    return true; // TODO
}

function isEmail(o) {
    return isString(o); // TODO
}

function isPassword(o) {
    const maxLength = 72; // bcrypt implementation uses only first 72 characters of a string
    const minLength = 8;

    return isString(o) && o.length <= maxLength && o.length >= minLength;
}

function isId(o) {
    return true; // TODO
}

export default {
    exists,
    isBool,
    isString,
    isEmail,
    isPassword,
    isId,
};
