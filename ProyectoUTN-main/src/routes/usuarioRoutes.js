import {Router} from 'express';
import {Usuarios, CrearUsuario, UsuarioLogin , obtenerOperarios,eliminarUsuario} from '../controllers/usuarioController.js';

const router = Router();

router.get('/lista-usuarios', Usuarios);
router.post('/register', CrearUsuario);
router.post('/login', UsuarioLogin);
router.get('/operarios', obtenerOperarios);
router.delete('/usuarios/:id_usuario', eliminarUsuario);



export default router;