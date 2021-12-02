import express from 'express';
import db from '../service/compraService.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const {costSale, client, funcionario} = req.body
    const hoje = new Date();
    const dataFormat = `${hoje.getFullYear()}-${hoje.getMonth()}-${hoje.getDay()} ${hoje.getHours()}:${hoje.getMinutes()}:${hoje.getSeconds()}`
    console.log(dataFormat)
    try{
        await db.insertCompras(costSale, dataFormat, client, funcionario);
        res.status(200).send({message: 'Compra realizada com sucesso'});
    } catch {
        res.status(500).send({message: 'Houve algum problema na compra'})
    }
});

router.put('/', async (req, res) => {
    const {costSale, client, funcionario, idPurchase} = req.body
    const hoje = new Date();
    const dataFormat = `${hoje.getFullYear()}-${hoje.getMonth()}-${hoje.getDay()} ${hoje.getHours()}:${hoje.getMinutes()}:${hoje.getSeconds()}`
    try { 
        await db.updateCompras(costSale, dataFormat, client, funcionario, idPurchase);
        res.status(200).send({message: 'Atualização ocorreu com sucesso'});
    } catch {
        res.status(500).send({message: "Ocorreu um erro na atualização"})
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try{
        await db.disableCompra(id);
        res.status(200).send({message: 'Desativação feita corretamente'});
    } catch {
        res.status(500).send({message: "Ocorreu um erro na Exclusão"})
    }
});

router.get('/find/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const find = await db.findCompra(id);
        res.status(200).send({message: find});
    } catch{
        res.status(500).send({message: 'Houve um erro na busca'});
    }
});

router.get('/findAll', async (req, res) => {
    try{
        const found = await db.findAllCompras();
        res.status(200).send({message: found});
    } catch {
        res.status(500).send({message: 'Houve um erro na busca de todos'})
    }
})

export default router;