function exists(o) {
    return o !== undefined && o !== null;
}

function isBool(o) {
    return o === true || o === false;
}

function isString(o) {
    return exists(o) && typeof o === 'string' || o instanceof String;
}

function isEmail(o) {
    return isString(o) && /.+@.+\..+/u.test(o);
}

function isPassword(o) {
    function validLength(s) {
        const maxLength = 72; // bcrypt implementation uses only first 72 characters of a string
        const minLength = 8;
        return s.length <= maxLength && s.length >= minLength;
    }

    function containsNumber(s) {
        return /.*[0-9].*/u.test(s);
    }

    function containsUpperCase(s) {
        return /.*[A-Z].*/u.test(s);
    }

    function containsLowerCase(s) {
        return /.*[a-z].*/u.test(s);
    }

    return isString(o) && validLength(o) && containsNumber(o) && containsUpperCase(o) && containsLowerCase(o);
}

function isId(o) {
    return isString(o) && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu.test(o);
}

export default {
    exists,
    isBool,
    isString,
    isEmail,
    isPassword,
    isId,
};
