import express from 'express';
import {Edificios, eliminarEdificio, crearEdificio} from '../controllers/edificioController.js'; 

const router = express.Router();

router.get('/lista-edificios', Edificios); 
router.delete('/edificio/:id', eliminarEdificio);
router.post('/edificio', crearEdificio);


export default router; 
