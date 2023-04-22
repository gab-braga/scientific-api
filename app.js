const express = require("express");
const { sequelize, authenticate } = require("./database/database");
const app = express();
const bodyParser = require("body-parser");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const PORT = 3000;

app.use(bodyParser.json());

// importação de entidades
const { Scientist } = require("./database/entities");
const { Contribution } = require("./database/entities");
const { Study } = require("./database/entities");

const connection = async () => {
    await authenticate(sequelize);
    await sequelize.sync();
}
connection();

const scientistRoutes = require("./routes/scientist");
const contributRoutes = require("./routes/contribution");
const studiesRoutes = require("./routes/study");
app.use(scientistRoutes, contributRoutes, studiesRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
    console.log("Servidor executando na porta", PORT);
    console.log(`Acesse a documentação (http://localhost:${PORT}/api-docs).`);
});