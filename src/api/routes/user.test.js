import assert from 'assert';
import superTest from 'supertest';
import app from '..';
import mockData from '../tests/util/mockData';

let loginEmail = null;
let loginPassword = null;
let authToken = null;

describe('user routes', () => {
    describe('register', () => {
        describe('Positive', () => {
            it('Succeeds', async () => {
                loginEmail = mockData.email();
                loginPassword = mockData.password();

                await superTest(app)
                    .post('/user/register')
                    .send({
                        email: loginEmail,
                        password: loginPassword,
                    })
                    .expect(200);
            });
        });

        describe('Negative', () => {
            it('Fails if already exists', async () => {
                const response = await superTest(app)
                    .post('/user/register')
                    .send({
                        email: loginEmail,
                        password: loginPassword,
                    })
                    .expect(422);
                assert.strictEqual(response.text, 'auth/existence');
            });

            it('Fails if not given anything', async () => {
                await superTest(app)
                    .post('/user/register')
                    .expect(400);
            });

            it('Fails if not given email', async () => {
                const response = await superTest(app)
                    .post('/user/register')
                    .send({
                        password: mockData.password(),
                    })
                    .expect(400);
                assert.strictEqual(response.text, 'validation/email');
            });
            
            it('Fails if not given password', async () => {
                const response = await superTest(app)
                    .post('/user/register').send({
                        email: mockData.email(),
                    })
                    .expect(400);
                assert.strictEqual(response.text, 'validation/password');
            });
        });
    });

    describe('login', () => {
        describe('Positive', () => {
            it('Is successful', async () => {
                const response = await superTest(app)
                    .post('/user/login')
                    .send({
                        email: loginEmail,
                        password: loginPassword,
                    })
                    .expect(200);
                assert.notEqual(response.body && response.body.tokenId, null);
                authToken = response.body.tokenId;
            });
        });

        describe('Negative', () => {
            it('Fails if not given anything', async () => {
                await superTest(app)
                    .post('/user/login')
                    .expect(400);
            });

            it('Fails if not given email', async () => {
                const response = await superTest(app)
                    .post('/user/login')
                    .send({
                        password: loginPassword,
                    })
                    .expect(400);
                assert.strictEqual(response.text, 'validation/email');
            });

            it('Fails if not given password', async () => {
                const response = await superTest(app)
                    .post('/user/login')
                    .send({
                        email: loginEmail,
                    })
                    .expect(400);
                assert.strictEqual(response.text, 'validation/password');
            });
        });
    });

    describe('logout', () => {
        describe('Positive', () => {
            it('Is successful', async () => {
                await superTest(app)
                    .get('/user/logout')
                    .set('Authorization', authToken)
                    .expect(200);
            });
        });

        describe('Negative', () => {
            it('Fails if not given authorization', async() => {
                await superTest(app)
                    .get('/user/logout')
                    .expect(403);
            });
        });
    });
});
