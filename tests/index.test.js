const assert = require('assert');
const express = require('express');
const { AuthManager } = require('../src/utils/auth.manager');
const supertest = require('supertest');
const { validatePassword, validatePhone, validateEmail, validateTempMail } = require('../src/middlewares/validators');
const expressTestApp = require('../src/app');
const { APP } = require('./app.setup.test');
const testApp = new APP(expressTestApp)
const IssueAccessAndRefreshToken = require('../src/utils/jwt/issue.jwt.token')

describe('hashed password', () => {
    let authManager;

    beforeEach(() => {
        authManager = new AuthManager();
    });

    it('should return a string with salt and hashed password separated by ":"', async function () {
        const password = 'password123';
        const result = await authManager.hashedPassword(password);

        assert.strictEqual(typeof result, 'string');
        assert.ok(result.includes(':'), 'Result should include ":"');
    });

    it('should generate different hashes for the same password', async function () {
        const password = 'password123';
        const result1 = await authManager.hashedPassword(password);
        const result2 = await authManager.hashedPassword(password);

        assert.notStrictEqual(result1, result2, 'Hashes for the same password should be different');
    });
});

describe('create unique Id', () => {
    let authManager;

    beforeEach(() => {
        authManager = new AuthManager();
    });

    it('should create a unique user ID', async () => {
        const userId = await authManager.createUniqueId('user')
        assert.strictEqual(typeof userId, 'string');
        assert.ok(userId.includes('/u'), "should include user special symbol")
    })

    it('should create a unique contact ID', async () => {
        const userId = await authManager.createUniqueId('contact')
        assert.strictEqual(typeof userId, 'string');
        assert.ok(userId.includes('/c'), "should include user special symbol")
    })

    it('should create a unique spam ID', async () => {
        const userId = await authManager.createUniqueId('spam')
        assert.strictEqual(typeof userId, 'string');
        assert.ok(userId.includes('/s'), "should include user special symbol")
    })
});

describe('validate unique Id', () => {
    let authManager;

    beforeEach(() => {
        authManager = new AuthManager();
    });

    it('should return true for a valid user ID', async () => {
        const id = '18f9b48cc61/u'
        const isValid = await authManager.validateUserId(id)
        assert.strictEqual(typeof isValid, 'boolean');
        assert.ok(isValid, true)
    })

    it('should throw an error for an invalid user ID', async () => {
        try {
            const id = 'fhawr8525wrw/u'
            await authManager.validateUserId(id)
        } catch (error) {
            assert.strictEqual(error.message, "Invalid user id format")
        }
    })
});

describe("validate Password", () => {

    beforeEach(() => {
        testApp.ValidationTester('/validate-password-test', validatePassword, 'Password Validation Successfull')
    })

    it('should return 400 if no password is provided', (done) => {
        supertest(expressTestApp)
            .post('/validate-password-test')
            .send({ username: 'testuser' })
            .expect(400)
            .expect(res => {
                assert.strictEqual(res.body.message, 'Invalid Password');
            })
            .end(done);
    });

    it('should return 400 if password does not meet criteria', (done) => {
        supertest(expressTestApp)
            .post('/validate-password-test')
            .send({ password: 'password' })
            .expect(400)
            .expect(res => {
                assert.strictEqual(res.body.message, 'Invalid Password');
            })
            .end(done);
    });

    it('should call next() if password is valid', (done) => {
        supertest(expressTestApp)
            .post('/validate-password-test')
            .send({ password: 'Qazplmvb56@123' })
            .expect(200)
            .expect(res => {
                assert.strictEqual(res.body.message, 'Password Validation Successfull');
            })
            .end(done);
    });
})

describe("validate Phone", () => {
    beforeEach(() => {
        testApp.ValidationTester('/validate-phone-test', validatePhone, 'Phone Validation Successfull')
    })

    it('should return 400 if no Phone is provided', (done) => {
        supertest(expressTestApp)
            .post('/validate-phone-test')
            .send({ username: 'testuser' })
            .expect(400)
            .expect(res => {
                assert.strictEqual(res.body.message, 'Invalid Phone Number **');
            })
            .end(done);
    });

    it('should return 400 if phone does not meet criteria', (done) => {
        supertest(expressTestApp)
            .post('/validate-phone-test')
            .send({ phone: "1245748596" })
            .expect(400)
            .expect(res => {
                assert.strictEqual(res.body.message, 'Invalid Phone Number');
            })
            .end(done);
    });

    it('should call next() if phone is valid', (done) => {
        supertest(expressTestApp)
            .post('/validate-phone-test')
            .send({ phone: "9616562288" })
            .expect(200)
            .expect(res => {
                assert.strictEqual(res.body.message, 'Phone Validation Successfull');
            })
            .end(done);
    });
})

describe("validate Email", () => {
    beforeEach(() => {
        testApp.ValidationTester('/validate-email-test', validateEmail, 'Email Validation Successfull')
    })

    it('should return 400 if no email is provided', (done) => {
        supertest(expressTestApp)
            .post('/validate-email-test')
            .send({ username: 'testuser' })
            .expect(400)
            .expect(res => {
                assert.strictEqual(res.body.message, 'Invalid Email **');
            })
            .end(done);
    });

    it('should return 400 if email does not meet criteria', (done) => {
        supertest(expressTestApp)
            .post('/validate-email-test')
            .send({ email: "test122.com" })
            .expect(400)
            .expect(res => {
                assert.strictEqual(res.body.message, 'Invalid Email');
            })
            .end(done);
    });

    it('should call next() if phone is valid', (done) => {
        supertest(expressTestApp)
            .post('/validate-email-test')
            .send({ email: "test123@example.com" })
            .expect(200)
            .expect(res => {
                assert.strictEqual(res.body.message, 'Email Validation Successfull');
            })
            .end(done);
    });
})

describe("validate Temp mail", () => {
    beforeEach(() => {
        testApp.ValidationTester('/validate-temp-email-test', validateTempMail, 'Valid Email')
    })

    it('should return 400 if temp email does not meet criteria', (done) => {
        supertest(expressTestApp)
            .post('/validate-temp-email-test')
            .send({ email: "test123@example.com" })
            .expect(400)
            .expect(res => {
                assert.strictEqual(res.body.message, 'Invalid Email domain **');
            })
            .end(done);
    });

    it('should call next() if phone is valid', (done) => {
        supertest(expressTestApp)
            .post('/validate-temp-email-test')
            .send({ email: "fk7384@gmail.com" })
            .expect(200)
            .expect(res => {
                assert.strictEqual(res.body.message, 'Valid Email');
            })
            .end(done);
    });
})

describe('jwt token', () => {
    it('should return a string access token', async function () {
        const accessToken = await IssueAccessAndRefreshToken.issueAccessToken('12345')

        assert.strictEqual(typeof accessToken, 'string')
    })

    it('should handle invalid input', async function () {
        const accessToken = await IssueAccessAndRefreshToken.issueAccessToken(undefined)
        const accessToken1 = await IssueAccessAndRefreshToken.issueAccessToken(null)
        const accessToken2 = await IssueAccessAndRefreshToken.issueAccessToken('')

        assert.strictEqual(accessToken, undefined)
        assert.strictEqual(accessToken1, undefined)
        assert.strictEqual(accessToken2, undefined)
    })
})