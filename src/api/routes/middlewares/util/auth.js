import db from '../../../db';
import asyncWrapper from '../../util/asyncWrapper';

const User = db.models.user;
const AuthToken = db.models.authToken;

const models = [AuthToken, User];

function getRelevantModels(modelsArray, inclusionDepth) {
    return modelsArray.slice(0, inclusionDepth).reverse();
}

function getModel(inclusionDepth) {
    if (inclusionDepth < 0 || inclusionDepth >= models.length) {
        throw new Error('auth middleware inclusionDepth invalid');
    }

    return models[inclusionDepth];
}

function generateQueryWhere(inclusionDepth, authTokenId) {
    if (inclusionDepth < 0 || inclusionDepth >= models.length || inclusionDepth === undefined || inclusionDepth === null) {
        throw new Error('auth middleware inclusionDepth invalid');
    }
    if (!authTokenId) {
        throw new Error('auth middleware authTokenId required');
    }

    if (inclusionDepth === 0) {
        return {
            'id': authTokenId,
            'active': true,
        };
    }
    return null;
}

/**
 * 
 * @param {*} inclusionDepth 
 * @param {*} authTokenId Will be used only if inclusionDepth > 0
 */
function generateQueryInclude(inclusionDepth, authTokenId) {
    if (inclusionDepth < 0 || inclusionDepth >= models.length || inclusionDepth === undefined || inclusionDepth === null) {
        throw new Error('auth middleware inclusionDepth invalid');
    }
    if(inclusionDepth === 0) {
        return [];
    }

    const includeObjs = getRelevantModels(models, inclusionDepth).map((model) => {
        return {
            model: model,
            required: true,
        };
    });

    if (inclusionDepth > 0) {
        const lastObj = includeObjs.slice(-1).pop();
        lastObj.where = generateQueryWhere(0, authTokenId);
    }

    const include = [includeObjs.reduce((prev, includeObj) => {
        prev.include = [includeObj];
        return prev;
    })];
    return include;
}

function middlewareDelegate(req, res, next, inclusionDepth) {
    return asyncWrapper(async () => {
        const authTokenId = req.headers.authorization;
        if (!authTokenId) {
            res.status(403).send('Authorization header required');
            return;
        }
    
        const model = getModel(inclusionDepth);
        const dbInstance = await model.findOne({
            where: generateQueryWhere(inclusionDepth, authTokenId),
            include: generateQueryInclude(inclusionDepth, authTokenId),
        });
    
        if (!dbInstance) {
            res.status(403).send('not found');
            return;
        }
    
        switch (inclusionDepth) {
        case 0:
            req.requestingUserId = dbInstance.userId;
            break;
        
        case 1:
            req.requestingUser = dbInstance;
            req.requestingUserId = dbInstance.id;
            break;
        }
    
        next();
    })(req, res, next);
}

export default {
    private: {
        getModel,
        generateQueryWhere,
        generateQueryInclude,
    },
    middlewareDelegate,
};
