import assert from 'assert';
import authMiddlewareUtil from './auth';
import db from '../../../db';

const User = db.models.user;
const AuthToken = db.models.authToken;

const tokenId = 'someTokenId';

describe('auth middleware util', () => {
    describe('Positive', () => {
        for (let inclusionDepth = 0; inclusionDepth <= 1; ++inclusionDepth) {
            describe(`inclusionDepth = ${inclusionDepth}`, () => {
                describe('query model', () => {
                    function getExpected() {
                        switch (inclusionDepth) {
                        case 0:
                            return AuthToken;
                        case 1:
                            return User;
                        }
                    }

                    const actual = authMiddlewareUtil.private.getModel(inclusionDepth);
                    const expected = getExpected();
                    assert.deepStrictEqual(actual, expected);
                });

                describe('query "where"', () => {
                    it('No exception', () => {
                        assert.doesNotThrow(() => {
                            authMiddlewareUtil.private.generateQueryWhere(inclusionDepth, tokenId);
                        });
                    });
    
                    it('Expected value', () => {
                        function getExpected() {
                            switch (inclusionDepth) {
                            case 0:
                                return {
                                    'id': tokenId,
                                    'active': true,
                                };
                            case 1:
                                return null;
                            }
                        }

                        const actual = authMiddlewareUtil.private.generateQueryWhere(inclusionDepth, tokenId);
                        const expected = getExpected();
                        assert.deepStrictEqual(actual, expected);
                    });
                });
                
                describe('query "include"', () => {
                    it('No exception', () => {
                        assert.doesNotThrow(() => {
                            authMiddlewareUtil.private.generateQueryInclude(inclusionDepth, tokenId);
                        });
                    });

                    if (inclusionDepth === 0) {
                        it('No exception without tokenId', () => {
                            assert.doesNotThrow(() => {
                                authMiddlewareUtil.private.generateQueryInclude(inclusionDepth);
                            });
                        });
                    }
    
                    it('Expected value', () => {
                        function getExpected() {
                            switch (inclusionDepth) {
                            case 0:
                                return [];
                            case 1:
                                return [{
                                    model: AuthToken,
                                    required: true,
                                    where: {
                                        'id': tokenId,
                                        'active': true,
                                    },
                                }];
                            }
                        }

                        const actual = authMiddlewareUtil.private.generateQueryInclude(inclusionDepth, tokenId);
                        const expected = getExpected();
                        assert.deepStrictEqual(actual, expected);
                    });
                });
            });
        }
    });

    describe('Negative', () => {
        describe('inclusionDepth > 1', () => {
            describe('query "where"', () => {
                it('Exception', () => {
                    assert.throws(() => {
                        authMiddlewareUtil.private.generateQueryWhere(2, tokenId);
                    });
                });
            });
            
            describe('query "include"', () => {
                it('Exception', () => {
                    assert.throws(() => {
                        authMiddlewareUtil.private.generateQueryInclude(2, tokenId);
                    });
                });
            });
        });
    
        describe('inclusionDepth < 0', () => {
            describe('query "where"', () => {
                it('Exception', () => {
                    assert.throws(() => {
                        authMiddlewareUtil.private.generateQueryWhere(-1, tokenId);
                    });
                });
            });
            
            describe('query "include"', () => {
                it('Exception', () => {
                    assert.throws(() => {
                        authMiddlewareUtil.private.generateQueryInclude(-1, tokenId);
                    });
                });
            });
        });

        describe('Missing tokenId', () => {
            describe('query "where"', () => {
                for (let inclusionDepth = 0; inclusionDepth < 2; ++inclusionDepth) {
                    it('Exception', () => {
                        assert.throws(() => {
                            authMiddlewareUtil.private.generateQueryWhere(inclusionDepth);
                        });
                    });
                }
            });
            describe('query "include"', () => {
                for (let inclusionDepth = 1; inclusionDepth < 2; ++inclusionDepth) {
                    it('Exception', () => {
                        assert.throws(() => {
                            authMiddlewareUtil.private.generateQueryInclude(inclusionDepth);
                        });
                    });
                }
            });
        });
    });
});
