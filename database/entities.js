const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("./database");

const Scientist = sequelize.define("scientists", {
    uid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    dateBirth: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    dateDeath: {
        type: DataTypes.DATEONLY
    },
    countryOrigin: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    image: {
        type: DataTypes.STRING(255)
    },
    biography: {
        type: DataTypes.TEXT
    }
},
{
    freezeTableName: true
});

const Contribution = sequelize.define("contributions", {
    uid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    type: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
    },
    dateDiscovery: {
        type: DataTypes.DATEONLY
    },
    datePublished: {
        type: DataTypes.DATEONLY
    },
    image: {
        type: DataTypes.STRING(255)
    }
},
{
    freezeTableName: true
});

const Study = sequelize.define("studies", {
    uid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
    },
    abbreviation: {
        type: DataTypes.STRING(50)
    }
},
{
    freezeTableName: true
});

Study.hasOne(Scientist, { allowNull: false, foreignKey: "studyUID" });
Scientist.belongsTo(Study, { allowNull: false, foreignKey: "studyUID" });

Scientist.belongsToMany(Contribution, {
    allowNull: false,
    foreignKey: "contributionUID",
    through: "scientists_contributions"
});
Contribution.belongsToMany(Scientist, {
    allowNull: false,
    foreignKey: "scientistUID",
    through: "scientists_contributions"
});

module.exports = { Scientist, Contribution, Study };