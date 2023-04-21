const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("scientific_db", "root", "root3306", {
    host: "127.0.0.1",
    dialect: "mysql"
});

const authenticate = async (sequelize) => {
    try {
        await sequelize.authenticate();
        console.log("Conexão estabelecida com sucesso!");
    }
    catch(error) {
        console.log("Não foi possivel conectar ao banco de dados", error);
    }
}

module.exports = { sequelize, authenticate };