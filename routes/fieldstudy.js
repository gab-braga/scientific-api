const { Router } = require("express");
const router = Router();

const { FieldStudy } = require("../database/entities");

router.get("/studies", async (req, res) => {
    try {
        const studies = await FieldStudy.findAll();
        res.status(200).json(studies);
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ message: "Aconteceu algo de errado." });
    }
});

router.get("/studies/:uid", async (req, res) => {
    const { uid } = req.params;
    try {
        const study = await FieldStudy.findByPk(uid);
        if(study) {
            res.status(200).json(study);
        }
        else {
            res.status(404).json({ message: "Campo de estudo não encontrado." });
        }
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ message: "Aconteceu algo de errado." });
    }
});

router.post("/studies", async (req, res) => {
    const { title, description } = req.body;
    try {
        const study = await FieldStudy.create({ title, description });
        res.status(201).json(study);
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ message: "Aconteceu algo de errado." });
    }
});

router.put("/studies/:uid", async (req, res) => {
    const { uid } = req.params;
    const { title, description } = req.body;
    try {
        const study = await FieldStudy.findByPk(uid);
        if(study) {
            await study.update({ title, description });
            res.status(200).json(study);
        }
        else {
            res.status(404).json({ message: "Campo de estudo não encontrado." });
        }
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ message: "Aconteceu algo de errado." });
    }
});

router.delete("/studies/:uid", async (req, res) => {
    const { uid } = req.params;
    try {
        const study = await FieldStudy.findByPk(uid);
        if(study) {
            await study.destroy();
            res.status(200).json(study);
        }
        else {
            res.status(404).json({ message: "Campo de estudo não encontrado." });
        }
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ message: "Aconteceu algo de errado." });
    }
});

module.exports = router;