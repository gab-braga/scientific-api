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
        type: DataTypes.TEXT
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
    }
},
{
    freezeTableName: true
});

const FieldStudy = sequelize.define("fields_study", {
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
    }
},
{
    freezeTableName: true
});

const ScientistContribution = sequelize.define('scientists_contributions', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
},
{
    freezeTableName: true
});

Scientist.belongsToMany(Contribution, {
    allowNull: false,
    foreignKey: "contributionUID",
    through: ScientistContribution
});
Contribution.belongsToMany(Scientist, {
    allowNull: false,
    foreignKey: "scientistUID",
    through: ScientistContribution
});

FieldStudy.hasOne(Contribution, { allowNull: false, foreignKey: "studyUID" });
Contribution.belongsTo(FieldStudy, { allowNull: false, foreignKey: "studyUID" });

module.exports = { Scientist, Contribution, FieldStudy };