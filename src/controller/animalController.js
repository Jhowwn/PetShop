import express from "express";
import db from '../service/animalService.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        await db.insertAnimal(req.body);
        res.status(200).send({message: "Animal inserido com sucesso"});
    }catch {
        res.status(400).send({message: 'Erro ao inserir o animal'});
    }
});

router.put('/', async (req, res) => {
    try{
        await db.updateAnimal(req.body);
        res.status(200).send({message: 'Animal atualizado com sucesso'});
    }catch {
        res.status(400).send({message: 'Houvr algum problema na atualização'});
    }
});

router.delete('/:id', async (req, res) => {
    const id =req.params.id;
    try {
        await db.disableAnimal(id);
        res.status(200).send({message: 'Animal excluido com sucesso'});
    }catch {
        res.status(400).send({message: 'Houve algum problema na exclusão'});
    }
});

router.get('/find/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const find = await db.findAnimal(id);
        res.status(200).send({message: find});
    }catch {
        res.status(400).send({message: 'Houve algum problema na busca'})
    }
});

router.get('/findAll', async (req, res) => {
    try{
        const found = await db.findAllAnimal();
        res.status(200).send({message: found});
    }catch {
        res.status(400).send({message: 'Erro ao buscar todos'});
    }
});

export default router