import express from 'express';
import db from '../service/compraService.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try{
        await db.insertCompras(req.body);
        res.status(200).send({message: 'Compra realizada com sucesso'});
    } catch {
        res.status(500).send({message: 'Houve algum problema na compra'})
    }
});

router.put('/', async (req, res) => {
    try { 
        await db.updateCompras(req.body);
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