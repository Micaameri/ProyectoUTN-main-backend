# Configuración Inicial de la Aplicación
   Archivo de configuración principal (app.js o index.js)
   Este archivo configura y ejecuta el servidor Express. Aquí es donde se importa y configura el servidor Express, las rutas de la API, y se hace la conexión con la base de datos.

Configuración básica de Express:

```bash
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mysql2 from 'mysql2/promise';

const app = express();

app.use(bodyParser.json());
app.use(cors());

import usuarioRoutes from './routes/usuarioRoutes.js';
import ubicacionActivoRoutes from './routes/ubicacionActivoRoutes.js';
import edificioRoutes from './routes/edificioRoutes.js';
import pisoRoutes from './routes/pisoRoutes.js';
import sectorRoutes from './routes/sectorRoutes.js';
import activoRoutes from './routes/activoRoutes.js';
import activoTareaRoutes from './routes/activoTareaRoutes.js';
import ordenTrabajoRoutes from './routes/ordenTrabajoRoutes.js';

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/ubicacion-activo', ubicacionActivoRoutes);
app.use('/api/edificio', edificioRoutes);
app.use('/api/piso', pisoRoutes);
app.use('/api/sector', sectorRoutes);
app.use('/api/activo', activoRoutes);
app.use('/api/activo-tarea', activoTareaRoutes);
app.use('/api/orden-trabajo', ordenTrabajoRoutes);

const db = await mysql2.createConnection({
host: 'localhost',
user: 'root',
database: 'nombre_de_base_de_datos',
});

export { app, db };
```

## Rutas de Usuario (/usuarios)


  ### GET /lista-usuarios
   
   Descripción: Obtiene una lista de todos los usuarios registrados.
   
   Controlador: Usuarios
   
   Respuesta: Array de usuarios.

### POST /register

Descripción: Registra un nuevo usuario.

Controlador: CrearUsuario

Cuerpo de la solicitud:
```bash
{
"nombre": "string",
"apellido": "string",
"email": "string",
"contraseña": "string",
"area": "string"
}
```
### POST /login

Descripción: Permite a un usuario iniciar sesión.

Controlador: UsuarioLogin

Cuerpo de la solicitud:
```bash
{
"email": "string",
"contraseña": "string"
}
```
### POST /usuarios/:id_usuario

Descripción: Permite eliminar un usuario.

Controlador: eliminarUsuario

Cuerpo de la solicitud:
```bash
{
"id_usuario": "number"
}
```
### GET /operarios
Descripción: Obtiene la lista de operarios.

Controlador: obtenerOperarios

Respuesta: Array de operarios.

## Rutas de Ubicación de Activo (/ubi-activo)
 ###  GET /lista-ubi-activos
 
   Descripción: Obtiene todas las ubicaciones de activos.
   
   Controlador: UbicacionesActivos
   
   Respuesta: Array de ubicaciones de activos.

 ### GET /ubi-activo
 
Descripción: Permite crear una nueva ubicación.

Controlador: crearUbicacion

Cuerpo de la solicitud:
```bash
{
"ubicacion": "string"
}
```

 ### DELETE /ubi-activo/:id
 
Descripción: Elimina una ubicación específica.

Controlador: eliminarUbicacionActivo

Cuerpo de la solicitud:
```bash
{
"id": "number"
}
```

## Rutas de Edificio (/edificio)
   ### GET /lista-edificios
   
   Descripción: Obtiene todos los edificios.
   
   Controlador: Edificios
   
   Respuesta: Array de edificios.

 ### POST /edificio
 
Descripción: Crea un nuevo edificio.

Controlador: crearEdificio

Cuerpo de la solicitud:
```bash
{
"nombre": "string",
"direccion": "string"
}
```
 ### DELETE /edificio/:id
 
Descripción: Elimina un edificio específico por ID.

Controlador: eliminarEdificio

Cuerpo de la solicitud:
```bash
{
"id": "number"
}
```

## Rutas de Piso (/piso)

  ### GET /lista-pisos
   
   Descripción: Obtiene todos los pisos.
   
   Controlador: Pisos
   
   Respuesta: Array de pisos.


### POST /piso

Descripción: Crea un nuevo piso.

Controlador: crearPiso

Cuerpo de la solicitud:
```bash
{
"piso": "string"
}
```
### DELETE /piso/:id

Descripción: Elimina un piso específico por ID.

Controlador: eliminarPiso

Cuerpo de la solicitud:
```bash
{
"id": "number"
}
```

## Rutas de Sector (/sector)
###   GET /sectores

   Descripción: Obtiene todos los sectores.
   
   Controlador: Sectores
   
   Respuesta: Array de sectores.

### POST /sectores

Descripción: Crea un nuevo sector.

Controlador: crearSector

Cuerpo de la solicitud:
```bash
{
"sector": "string"
}
```
### DELETE /sectores/:id_sector

Descripción: Elimina un sector específico por ID.

Controlador: eliminarSector

Cuerpo de la solicitud:
```bash
{
"id_sector": "number"
}
```

## Rutas de Activo (/activo)

  ### GET /activos
  
   Descripción: Obtiene todos los activos.
   
   Controlador: Activos
   
   Respuesta: Array de activos.

### POST /activo

Descripción: Crea un nuevo activo.

Controlador: crearActivo

Cuerpo de la solicitud:
```bash
{
"tipo": "string",
"tag_diminutivo": "string"
}
```
### DELETE /activo/:id

Descripción: Elimina un activo específico por ID.

Controlador: eliminarActivo

Cuerpo de la solicitud:
```bash
{
"id": "number"
}
```

## Rutas de Activo-Tarea (/activoTarea)
  ### GET /activoTareas/:id_activo/:tipo_tarea
  
   Descripción: Obtiene todas las tareas asociadas a un activo y un tipo de tareas.
   
   Controlador: ActivoTareas
   
   Respuesta: Array de tareas de un activo.

### POST /activoTarea/crear-tarea-relacion

Descripción: Crea una tarea y una relacion de activo tarea.

Controlador: CrearTareaYRelacion

Cuerpo de la solicitud:
```bash
{
"id_activo": "number",
"tarea": "string",
"tipo_tarea": "string"
}
```

## Rutas de Orden de Trabajo (/orden-trabajo)
   ### GET /orden-trabajo-detallada
   
   Descripción: Obtiene todas las órdenes de trabajo con sus respectivos elementos.
   
   Controlador: obtenerOrdenesTrabajoDetallada
   
   Respuesta: Array de órdenes de trabajo.

   ### GET /orden-trabajo-filtradas
   
   Descripción: Filtra las órdenes de trabajo segun los filtros seleccionado.
   
   Controlador: obtenerOrdenesTrabajoFiltradas
   
   Respuesta: Array de órdenes de trabajo filtradas.

   ### GET /orden-pendientes/id:usuario
   
Descripción: Obtiene las ordenes de trabajo que tiene pendiente un operario.

Controlador: obtenerOrdenesPendientes

Respuesta: Array de ordenes de trabajo pendientes de realizar.

  ### POST /orden-trabajo

Descripción: Crea una nueva orden de trabajo.

Controlador: crearOrdenTrabajo

Cuerpo de la solicitud:
```bash
{
"operario": "string",
"fecha": "string",
"sector": "string",
"edificio": "number",
"ubicacion": "string",
"piso": "number",
"codigo_unico": "string",
"estado": "string",
"observaciones": "string",
"id_activo_tarea": "string"
}
```

### DELETE /orden-trabajo/:orden_trabajo_id

Descripción: Elimina una orden de trabajo específica por ID.

Controlador: eliminarOrdenTrabajo

Cuerpo de la solicitud:
```bash
{
"id": "number"
}
```

### PUT /finalizar-orden/:id_orden

Descripción: Actualiza a estado completada una orden de trabajo específica por ID.

Controlador: finalizarOrdenTrabajo

Cuerpo de la solicitud:
```bash
{
"id_orden": "number",
"tiempo_empleado": "string",
}
```
