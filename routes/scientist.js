const { Router } = require("express");
const router = Router();

const { Scientist } = require("../database/entities");

router.get("/scientists", async (req, res) => {
    try {
        const scientists = await Scientist.findAll();
        res.status(200).json(scientists);
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ message: "Aconteceu algo de errado." });
    }
});

router.get("/scientists/:uid", async (req, res) => {
    const { uid } = req.params;
    try {
        const scientist = await Scientist.findByPk(uid);
        if(scientist) {
            res.status(200).json(scientist);
        }
        else {
            res.status(404).json({ message: "Cientista não encontrado." });
        }
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ message: "Aconteceu algo de errado." });
    }
});

router.get("/scientists/study/:uid", async (req, res) => {
    const { uid } = req.params;
    try {
        const scientists = await Scientist.findAll({ where: { studyUID: uid } });
        res.status(200).json(scientists);
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ message: "Aconteceu algo de errado." });
    }
});

router.post("/scientists", async (req, res) => {
    const { name, dateBirth, dateDeath, countryOrigin, image, biography, studyUID } = req.body;
    try {
        const scientist = await Scientist.create({ name, dateBirth, dateDeath, countryOrigin, image, biography, studyUID });
        res.status(201).json(scientist);
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ message: "Aconteceu algo de errado." });
    }
});

router.put("/scientists/:uid", async (req, res) => {
    const { uid } = req.params;
    const { name, dateBirth, dateDeath, countryOrigin, image, biography, studyUID } = req.body;
    try {
        const scientist = await Scientist.findByPk(uid);
        if(scientist) {
            await scientist.update({ name, dateBirth, dateDeath, countryOrigin, image, biography, studyUID });
            res.status(200).json(scientist);
        }
        else {
            res.status(404).json({ message: "Cientista não encontrado." });
        }
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ message: "Aconteceu algo de errado." });
    }
});

router.delete("/scientists/:uid", async (req, res) => {
    const { uid } = req.params;
    try {
        const scientist = await Scientist.findByPk(uid);
        if(scientist) {
            await scientist.destroy();
            res.status(200).json({ message: "Cientista removido." });
        }
        else {
            res.status(404).json({ message: "Cientista não encontrado." });
        }
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ message: "Aconteceu algo de errado." });
    }
});

module.exports = router;