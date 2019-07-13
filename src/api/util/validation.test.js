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
