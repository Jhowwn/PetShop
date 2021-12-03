import express from 'express';
import db from '../service/clienteService.js';
import {body, validationResult} from "express-validator";
import { cpf } from "cpf-cnpj-validator";


const router = express.Router();

router.post('/',[//validações
    body('name').isLength({min: 1}).withMessage("Nome Vazio"),
    body('name').isLength({max: 45}).withMessage("Digite um nome menor"),
    body('cpf').custom((numCpf) => {
        const checkCPF = cpf.isValid(numCpf);
        if(!checkCPF) return Promise.reject("CPF Inválido");
        return true;
    }),
    body('gender').isLength({min: 1}).withMessage("Digite um genero válido"),
    body('gender').isLength({max: 1}).withMessage("Digite a letra do seu genero"),
    body('phone').isNumeric().withMessage('Telefone deve conter apenas números'),
    body('email').isEmail().withMessage('Digite um Email válido'),
    body('email').isLength({min: 1}).withMessage('Email não pode ser vazio'),
    //body('birth').isDate().withMessage("Digite uma data válida")
], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()});
    }

    try {
        await db.InsertCliente(req.body);
        res.status(201).send({message: 'Cliente cadastrado com sucesso'});
    }catch (err){
        res.status(500).send({message: 'Houve algum erro na inserção'});
    }
});

router.put('/:id', [//validações
    body('name').isLength({min: 1}).withMessage("Nome Vazio"),
    body('name').isLength({max: 45}).withMessage("Digite um noe"),
    body('cpf').custom((numCpf) => {
        const checkCPF = cpf.isValid(numCpf);
        if(!checkCPF) return Promise.reject("CPF Inválido");
        return true;
    }),
    body('gender').isLength({min: 1}).withMessage("Digite um genero válido"),
    body('gender').isLength({max: 1}).withMessage("Digite a letra do seu genero"),
    body('phone').isNumeric().withMessage('Telefone deve conter apenas números'),
    body('phone').isLength({min: 1}).withMessage("Digite um número válido"),
    body('email').isEmail().withMessage('Digite um Email válido'),
    body('email').isLength({min: 1}).withMessage('Email não pode ser vazio'),
    //body('birth').isDate().withMessage("Digite uma data válida")
], async (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()});
    }

    const id = req.params.id;

    try{
        await db.updateCliente(req.body, id);
        res.status(201).send({message: "Cliente atualizado com sucesso"});
    }catch{
        res.status(400).send({message: 'Algo deu errado na atualização'})
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try{
        await db.deleteCliente(id);
        res.status(201).send({message: 'Cliente desativado com sucesso'});
    }catch{
        res.status(400).send({message: 'Erro ao Desativar!'});
    }
});

router.get('/findClient/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const find = await db.findCliente(id);
        res.status(200).send({message: find});
    }catch{
        res.status(400).send({message: "Erro ao buscar"});
    }
});

router.get('/findAll', async (req, res) => {
    try{
        const found = await db. findAlddCliente();
        res.status(200).send({message: found});
    }catch{
        res.status(400).send({message: 'Erro ao buscar todos'});
    }
})


export default router;