import express from 'express';
import cliente from './controller/clienteController.js';
import animal from './controller/animalController.js';
import funcionario from './controller/funcionarioController.js';
import compra from './controller/compraController.js';
import login from './controller/loginController.js';
import servico from './controller/servicoController.js';
import animalServico from './controller/animalServicoController.js';
import servicoFuncionario from './controller/servicoFuncionarioController.js';

import { verifyJWT } from './middlewares/jwt.js';

const router = express.Router();

router.use('/cliente', verifyJWT, cliente);
router.use('/animal', verifyJWT, animal);
router.use('/funcionario', verifyJWT, funcionario);
router.use('/compra', verifyJWT, compra);
router.use('/login', login);
router.use('/servico', verifyJWT, servico);
router.use('/animalServico', verifyJWT, animalServico);
router.use('/servicoFuncionario', servicoFuncionario);

router.use('/*', (req, res) => {
    res.status(401).send({message: "Caminho não encontrado"});
});

export default router;