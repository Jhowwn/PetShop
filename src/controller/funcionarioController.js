import express from 'express';
import db from '../service/funcionarioService.js';

const router =  express.Router();

router.post('/', async (req, res) => {
    try{
        await db.insertFuncionario(req.body);
        res.status(200).send({message: "Funcionario cadastrado com sucesso"});
    } catch {
        res.status(400).send({message: "Houve algum erro ao inserir"})
    }
});

router.put('/', async (req, res) => {
    try{
        await db.updateFuncionario(req.body);
        res.status(200).send({message: "Funcionario atualizado com sucesso"});
    } catch {
        res.status(400).send({message: "Houve algum problema na atualização"})
    }
});

export default router;