export default function (sequelize, DataTypes) {
    const model = sequelize.define('errorLog', {
        publicId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        message: {
            type: DataTypes.STRING(512),
            allowNull: false,
        },
        stackTrace: {
            type: DataTypes.STRING(1024 * 4),
            allowNull: true,
        }
    }, {
        freezeTableName: true,
    });

    model.associate = (models) => {
        model.belongsTo(models.user, {as: 'requestingUser'});
        model.belongsTo(models.authToken, {as: 'requestingAuthToken'});
    };

    return model;
}
