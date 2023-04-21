const { Router } = require("express");
const router = Router();

const { Contribution, FieldStudy } = require("../database/entities");

router.get("/contributions", async (req, res) => {
    try {
        const contributions = await Contribution.findAll();
        res.status(200).json(contributions);
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ message: "Aconteceu algo de errado." });
    }
});

router.get("/contributions/:uid", async (req, res) => {
    const { uid } = req.params;
    try {
        const contribution = await Contribution.findByPk(uid, { include: FieldStudy });
        if(contribution) {
            res.status(200).json(contribution);
        }
        else {
            res.status(404).json({ message: "Contribuição científica não encontrado." });
        }
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ message: "Aconteceu algo de errado." });
    }
});

router.post("/contributions", async (req, res) => {
    const { title, type, description, dateDiscovery, datePublished, studyUID } = req.body;
    try {
        const contribution = await Contribution.create({ title, type, description, dateDiscovery, datePublished, studyUID });
        res.status(201).json(contribution);
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ message: "Aconteceu algo de errado." });
    }
});

router.put("/contributions/:uid", async (req, res) => {
    const { uid } = req.params;
    const { title, type, description, dateDiscovery, datePublished, studyUID } = req.body;
    try {
        const contribution = await Contribution.findByPk(uid);
        if(contribution) {
            await contribution.update({ title, type, description, dateDiscovery, datePublished, studyUID });
            res.status(200).json(contribution);
        }
        else {
            res.status(404).json({ message: "Contribuição científica não encontrado." });
        }
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ message: "Aconteceu algo de errado." });
    }
});

router.delete("/contributions/:uid", async (req, res) => {
    const { uid } = req.params;
    try {
        const contribution = await Contribution.findByPk(uid);
        if(contribution) {
            await contribution.destroy();
            res.status(200).json(contribution);
        }
        else {
            res.status(404).json({ message: "Contribuição científica não encontrado." });
        }
    }
    catch(error) {
        console.log(error);
        res.status(500).json({ message: "Aconteceu algo de errado." });
    }
});

module.exports = router;