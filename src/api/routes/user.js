import express from 'express';
import moment from 'moment';
import bcrypt from 'bcrypt';
import Sequelize from 'sequelize';
import asyncWrapper from './util/asyncWrapper';
import validation from '../util/validation';
import db from '../db';

const User = db.models.user;
const AuthToken = db.models.authToken;
const router = express.Router();

router.post('/register', asyncWrapper(async (req, res) => {
    if (!validation.exists(req.body.email) || !validation.isEmail(req.body.email)) {
        res.status(400).send('validation/email');
        return;
    }
    if (!validation.exists(req.body.password) || !validation.isPassword(req.body.password)) {
        res.status(400).send('validation/password');
        return;
    }
    const email = req.body.email.trim().toLowerCase();
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(req.body.password, saltRounds);

    const [user, wasCreated] = await User.findOrCreate({
        where: {
            email: email,
        },
        defaults: {
            email: email,
            password: passwordHash,
        },
    });

    if (!wasCreated) {
        res.status(422).send('auth/existence');
        return;
    }

    res.status(200).send({
        userId: user.id,
    });
}));

router.post('/login', asyncWrapper(async (req, res) => {
    if (!validation.exists(req.body.email) || !validation.isEmail(req.body.email)) {
        res.status(400).send('validation/email');
        return;
    }
    if (!validation.exists(req.body.password) || !validation.isPassword(req.body.password)) {
        res.status(400).send('validation/password');
        return;
    }
    const email = req.body.email.trim().toLowerCase();

    const user = await User.findOne({
        where: {
            email: email,
        },
    });

    if (!user) {
        res.status(404).send('auth/generic');
        return;
    }

    const passwordsMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordsMatch) {
        res.status(404).send('auth/generic');
        return;
    }

    const authToken = await AuthToken.create({
        userId: user.id,
    });

    res.status(200).send({
        tokenId: authToken.id,
    });
}));

router.get('/logout', asyncWrapper(async (req, res) => {
    const authTokenId = req.headers.authorization;
    if (!authTokenId) {
        res.status(403).send('Authorization header required');
        return;
    }

    const [updatedRowsCount] = await AuthToken.update({
        active: false,
    }, {
        where: {
            [Sequelize.Op.or]: {
                id: authTokenId,
                createdAt: {
                    [Sequelize.Op.lte]: moment().subtract(1, 'days').toDate(),
                },
            }
        },
    });

    if (updatedRowsCount < 1) {
        res.status(404).send('auth/token');
        return;
    }

    res.status(200).send();
}));

export default router;
