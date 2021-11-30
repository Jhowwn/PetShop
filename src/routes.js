import express from 'express';
import cliente from './controller/clienteController.js';
import animal from './controller/animalController.js';

const router = express.Router();

router.use('/cliente', cliente);
router.use('/animal', animal);

router.use('/*', (req, res) => {
    res.status(401).send({message: "Caminho não encontrado"});
});

export default router;