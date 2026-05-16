# KAIROS - Sistema de Control de Asistencia Escolar

**KAIROS** es una aplicación web para el control de asistencia escolar mediante códigos QR.

## Características

### Gestión de Usuarios
- **Dirección**: Acceso completo a todas las funciones
- **Regente**: Gestión de estudiantes, escaneo QR, registros
- **Profesor**: Escanear QR, agregar estudiantes, ver registros

### Funcionalidades
- **Login con Firebase Auth**: Sistema de autenticación seguro
- **Escaneo de QR**: Registrar asistencia mediante código QR del estudiante
- **Agregar Estudiantes**: Registro con generación automática de código QR
- **Envío de QR por Email**: Al agregar estudiante, se envía el QR automáticamente al correo del estudiante/tutor
- **Registros por Fecha**: Filtrar registros de asistencia por rango de fechas
- **Estadísticas**: Ver cantidad de estudiantes y asistencia por curso
- **Configuración de Tolerancia**: Hora de entrada y minutos de tolerancia
- **Diseño Responsivo**: Funciona en desktop y móvil
- **Menú Móvil**: Menú hamburguesa para dispositivos móviles

### Tecnologías
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Firebase (Firestore, Auth, Hosting)
- **Email**: EmailJS para envío automático de emails
- **QR**: html5-qrcode para escaneo, QRServer para generación

## Estructura del Proyecto

```
KAIROS/
├── index.html          # Aplicación principal
├── firebase.json       # Configuración Firebase
├── firestore.rules     # Reglas de Firestore
├── manifest.json      # Manifiesto PWA
├── kairos-icon.png    # Icono de la app
├── .gitignore         # Archivos ignorados
└── README.md          # Este archivo
```

## Configuración

### Firebase
El proyecto usa:
- Firebase Auth para autenticación
- Firestore como base de datos
- Firebase Hosting para hosting

### EmailJS (para envío de QR)
Para que funcione el envío automático de QR:
1. Crear cuenta en https://www.emailjs.com/
2. Crear un servicio de email
3. En Email Templates, crear una plantilla nueva:
   - Nombre: cualquier nombre (ej: kairos_qr)
   - En el cuerpo del email usar HTML para mostrar la imagen:
     ```html
     <img src="{{qr_image}}" width="200">
     ```
   - Las variables disponibles son: `to_email`, `to_name`, `codigo`, `qr_image`
4. Obtener el Service ID y la Public Key
5. Configurar en el archivo `index.html`:
   - Cambiar `YOUR_EMAILJS_PUBLIC_KEY` por tu Public Key
   - Cambiar `service_ks7xe43` por tu Service ID
   - Cambiar `template_kairos` por el nombre de tu plantilla

## Uso

1. **Agregar Estudiante**:
   - Ir a "Agregar" en el menú
   - Completar datos: nombre, email, teléfono, tutor, curso, paralelo
   - Al guardar, se genera código QR y se envía automáticamente al email

2. **Registrar Asistencia**:
   - Usar "Escanear QR" en el menú
   - Apuntar la cámara al código QR del estudiante
   - Se registra automáticamente con fecha, hora y estado (A Tiempo / Tarde)

3. **Ver Registros**:
   - Ir a "Registros"
   - Filtrar por rango de fechas (Desde - Hasta)
   - Ver todos los registros de asistencia

## Roles y Permisos

| Función | Dirección | Regente | Profesor |
|---------|-----------|---------|----------|
| Inicio | Si | Si | Si |
| Escanear QR | No | Si | Si |
| Estudiantes | Si | Si | No |
| Agregar | Si | Si | Si |
| Registros | Si | Si | Si |
| Horarios | Si | No | No |
| Estadísticas | Si | No | No |
| Usuarios | Si | No | No |

## Despliegue

El proyecto está configurado para desplegarse en Firebase Hosting:

```bash
firebase deploy
```

### Colecciones en Firestore:
- **usuarios**: Datos de usuarios (profesores, regentes, dirección)
- **estudiantes**: Datos de estudiantes con código QR
- **asistencia**: Registros de asistencia (estudianteId, fecha, hora, estado)
- **config**: Configuración general (hora límite, tolerancia)

## Licencia

Este proyecto es para uso educativo y escolar.