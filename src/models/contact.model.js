function ContactModel(sequelize, Sequelize) {
    const contact = sequelize.define('contact', {
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
        contactId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    })

    return contact
}

module.exports = { ContactModel }