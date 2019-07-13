import assert from 'assert';
import validation from './validation';

describe('Validation', () => {
    describe('exists()', () => {
        [
            'string',
            '',
            0,
            128,
            {},
            { tst: 'abc' },
            new Date(),
            NaN,
        ].forEach((testData) => {
            it(`Positive ${testData}`, () => {
                assert.strictEqual(validation.exists(testData), true);
            });
        });

        [
            undefined,
            null,
        ].forEach((testData) => {
            it(`Negative ${testData}`, () => {
                assert.strictEqual(validation.exists(testData), false);
            });
        });
    });

    describe('isString()', () => {
        [
            '',
            ' ',
            'hello',
            'HELLO',
            '123',
            'null',
            'undefined',
            'true',
            'false',
        ].forEach((testData) => {
            it(`Positive ${testData}`, () => {
                assert.strictEqual(validation.isString(testData), true);
            });
        });

        [
            undefined,
            null,
            true,
            false,
            123,
            0,
            true,
            false,
        ].forEach((testData) => {
            it(`Negative ${testData}`, () => {
                assert.strictEqual(validation.isString(testData), false);
            });
        });
    });

    describe('isEmail', () => {
        [
            'a@b.c',
            'A@3b.2',
            'qwerty@qazwsx.qwer',
            'OMG@HOST.WHERE',
        ].forEach((testData) => {
            it(`Positive ${testData}`, () => {
                assert.strictEqual(validation.isEmail(testData), true);
            });
        });

        [
            undefined,
            null,
            0,
            true,
            false,
            12345678,
            '',
            'abc',
            'Password1',
            'a@',
            '@',
            'a@b',
        ].forEach((testData) => {
            it(`Negative ${testData}`, () => {
                assert.strictEqual(validation.isEmail(testData), false);
            });
        });
    });

    describe('isPassword', () => {
        [
            'Password1',
            'Susagep0',
            '1Qaz2wsx',
        ].forEach((testData) => {
            it(`Positive ${testData}`, () => {
                assert.strictEqual(validation.isPassword(testData), true);
            });
        });
        
        [
            undefined,
            null,
            true,
            false,
            0,
            12345678,
            '12345678',
            'password',
            '1234',
            1234,
            'undefined',
            'password1234',
            'susagep',
        ].forEach((testData) => {
            it(`Negative ${testData}`, () => {
                assert.strictEqual(validation.isPassword(testData), false);
            });
        });
    });

    describe('isId', () => {
        [
            'aaaaaaaa-aaaa-1aaa-aaaa-aaaaaaaaaaaa',
            '11111111-1111-1111-8111-111111111111',
            'a1a1a1a1-a1a1-1a1a-a1a1-1a1a1a1a1a1a',
        ].forEach((testData) => {
            it(`Positive ${testData}`, () => {
                assert.strictEqual(validation.isId(testData), true);
            });
        });

        [
            undefined,
            null,
            true,
            false,
            0,
            'true',
            'false',
            'undefined',
            'null',
            '12345678',
            12345678,
            [],
            {},
            ' aaaaaaaa-aaaa-1aaa-aaaa-aaaaaaaaaaaa',
            'aaaaaaaa-aaaa-1aaa-aaaa-aaaaaaaaaaaa ',
            '11111111-1111-1111-1111-111111111111',
            'AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA',
            'aaaaaaaa-aaaa-1aaa-aaaa-aaaaaaaaaaa',
            'aaaaaaaa-aaaa-1aaa-aaaa-aaaaaaaaaaaaa',
        ].forEach((testData) => {
            it(`Negative ${testData}`, () => {
                assert.strictEqual(validation.isId(testData), false);
            });
        });
    });

    describe('isBool', () => {
        [
            true,
            false,
        ].forEach((testData) => {
            it(`Positive ${testData}`, () => {
                assert.strictEqual(validation.isBool(testData), true);
            });
        });

        [
            undefined,
            null,
            NaN,
            '',
            'false',
            'true',
            {},
            { 'true': true },
            { 'false': false },
            0,
            1,
            128,
            new Date(),
        ].forEach((testData) => {
            it(`Negative ${testData}`, () => {
                assert.strictEqual(validation.isBool(testData), false);
            });
        });
    });
});
