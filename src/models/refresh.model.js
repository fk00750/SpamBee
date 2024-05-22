function RefreshModel(sequelize, Sequelize) {
    const refresh = sequelize.define('refresh', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        userId_ref: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        userId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        refreshToken: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        expiresAt: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        status: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
    })

    return refresh
}

module.exports = { RefreshModel }