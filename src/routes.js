import express from 'express';
import cliente from './controller/clienteController.js';
import animal from './controller/animalController.js';
import funcionario from './controller/funcionarioController.js';
import compra from './controller/compraController.js';

import { verifyJWT } from './middlewares/jwt.js';

const router = express.Router();

router.use('/cliente', cliente);
router.use('/animal', animal);
router.use('/funcionario', funcionario);
router.use('/compra', compra);

router.use('/*', (req, res) => {
    res.status(401).send({message: "Caminho não encontrado"});
});

export default router;