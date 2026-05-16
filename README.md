# KAIROS - Sistema de Control de Asistencia Escolar

**KAIROS** es una aplicacion web para el control de asistencia escolar mediante codigos QR.

## Caracteristicas

### Gestion de Usuarios
- **Direccion**: Acceso completo a todas las funciones
- **Regente**: Gestion de estudiantes, escaneo QR, registros
- **Profesor**: Escanear QR, agregar estudiantes, ver registros

### Funcionalidades
- **Login con Firebase Auth**: Sistema de autenticacion seguro
- **Escaneo de QR**: Registrar asistencia mediante codigo QR del estudiante
- **Agregar Estudiantes**: Registro con generacion automatica de codigo QR
- **Envio de QR por Email**: Al agregar estudiante, se envia el QR automaticamente al correo del estudiante/tutor
- **Registros por Fecha**: Filtrar registros de asistencia por rango de fechas
- **Estadisticas**: Ver cantidad de estudiantes y asistencia por curso
- **Configuracion de Tolerancia**: Hora de entrada y minutos de tolerancia
- **Diseno Responsivo**: Funciona en desktop y movil
- **Menu Movil**: Menu hamburguesa para dispositivos moviles

### Tecnologias
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Firebase (Firestore, Auth, Hosting)
- **Email**: EmailJS para envio automatico de emails
- **QR**: html5-qrcode para escaneo, QRServer para generacion

## Estructura del Proyecto

```
KAIROS/
├── index.html          # Aplicacion principal
├── firebase.json       # Configuracion Firebase
├── firestore.rules     # Reglas de Firestore
├── manifest.json      # Manifiesto PWA
├── kairos-icon.png    # Icono de la app
├── .gitignore         # Archivos ignorados
└── README.md          # Este archivo
```

## Configuracion

### Firebase
El proyecto usa:
- Firebase Auth para autenticacion
- Firestore como base de datos
- Firebase Hosting para hosting

### EmailJS (para envio de QR)
Para que funcione el envio automatico de QR:
1. Crear cuenta en https://www.emailjs.com/
2. Crear un servicio de email
3. Crear una plantilla con las variables:
   - `{{to_email}}`
   - `{{to_name}}`
   - `{{codigo}}`
   - `{{qr_image}}`
4. Obtener la Public Key y configurar en el codigo

## Uso

1. **Agregar Estudiante**:
   - Ir a "Agregar" en el menu
   - Completar datos: nombre, email, telefono, tutor, curso, paralelo
   - Al guardar, se genera codigo QR y se envia automaticamente al email

2. **Registrar Asistencia**:
   - Usar "Escanear QR" en el menu
   - Apuntar la camara al codigo QR del estudiante
   - Se registra automaticamente con fecha, hora y estado (A Tiempo / Tarde)

3. **Ver Registros**:
   - Ir a "Registros"
   - Filtrar por rango de fechas (Desde - Hasta)
   - Ver todos los registros de asistencia

## Roles y Permisos

| Funcion | Direccion | Regente | Profesor |
|---------|-----------|---------|----------|
| Inicio | Si | Si | Si |
| Escanear QR | No | Si | Si |
| Estudiantes | Si | Si | No |
| Agregar | Si | Si | Si |
| Registros | Si | Si | Si |
| Horarios | Si | No | No |
| Estadisticas | Si | No | No |
| Usuarios | Si | No | No |

## Despliegue

El proyecto esta configurado para desplegarse en Firebase Hosting:

```bash
firebase deploy
```

## Base de Datos

El diagrama de la base de datos se encuentra en:
`Base de Datos I/Kairos - Base de Datos/Control Asistencia .drawio`

### Colecciones en Firestore:
- **usuarios**: Datos de usuarios (profesores, regentes, direccion)
- **estudiantes**: Datos de estudiantes con codigo QR
- **asistencia**: Registros de asistencia (estudianteId, fecha, hora, estado)
- **config**: Configuracion general (hora limite, tolerancia)

## Licencia

Este proyecto es para uso educativo y escolar.