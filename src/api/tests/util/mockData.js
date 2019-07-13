function pickFrom(values) {
    const rnd = Math.random();
    return values[Math.floor(values.length * rnd)];
}

function name() {
    return pickFrom([
        'Alex',
        'Bob',
        'Charlie',
        'David',
        'Elena',
        'Fedor',
        'Ginny',
        'Hans',
        'Irena',
        'Joe',
        'John',
        'Joseph',
        'Kyle',
        'Laurence',
        'Michael',
        'Naomi',
        'Oscar',
        'Pamela',
        'Quincy',
        'Romeo',
        'Steve',
        'Tanya',
        'Unity',
        'Victor',
        'Wendy',
        'Xavier',
        'Yaffa',
        'Zehava',
    ]);
}

function lastName() {
    return pickFrom([
        'Aaron',
        'Big',
        'Cohen',
        'David',
        'Doe',
        'Eshton',
        'Former',
        'Ginger',
        'Heinz',
        'Indigo',
        'Joseph',
        'Kilo',
        'Landlord',
        'Moses',
        'November',
        'Opel',
        'Parmigiano',
        'Queensdale',
        'River',
        'Segal',
        'Tiff',
        'Uganda',
        'Velocity',
        'Whiskey',
        'Xenon',
        'Yankee',
        'Zimmerman',
    ]);
}

function emailHost() {
    return pickFrom([
        'gmail.com',
        'mai.ru',
        'mailinator.com',
        'yahool.com',
        'yandex.ru',
    ]);
}

function email() {
    return `${name()}.${lastName()}@${emailHost()}`;
}

function password() {
    return pickFrom([
        '12345678',
        'qwertyui',
        'abc12345',
        'password'
    ]);
}

export default {
    name,
    lastName,
    email,
    password,
};
