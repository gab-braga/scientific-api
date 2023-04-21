const express = require("express");
const { sequelize, authenticate } = require("./database/database");
const app = express();
const bodyParser = require("body-parser");
const PORT = 3000;

app.use(bodyParser.json());

// importação de entidades
const { Scientist } = require("./database/entities");
const { Contribution } = require("./database/entities");
const { FieldStudy } = require("./database/entities");

const connection = async () => {
    await authenticate(sequelize);
    await sequelize.sync();
    // await sequelize.sync({force: true});
}
connection();

const scientistRoutes = require("./routes/scientist");
const contributRoutes = require("./routes/contribution");
const fieldStudRoutes = require("./routes/fieldstudy");
app.use(scientistRoutes, contributRoutes, fieldStudRoutes);

app.listen(PORT, () => {
    console.log("Servidor executando na porta", PORT);
});