
# Sistema de Gestión de Empleados con Docker y MySQL

Este proyecto implementa una aplicación web simple conectada a una base de datos MySQL, desplegada usando Docker. Incluye funcionalidades para **listar** y **agregar empleados** mediante una interfaz HTML y persistencia de datos usando **volúmenes Docker**.

---

## 🐳 Contenedor MySQL con Volumen

### Comando de despliegue:

```bash
docker run -d --name mysql_empleados ^
  -e MYSQL_ROOT_PASSWORD=password ^
  -v C:\Users\User\Downloads\VOLUMEN_WEB\empleado.sql:/docker-entrypoint-initdb.d/empleado.sql ^
  -p 3306:3306 ^
  mysql
```

### ¿Qué hace este comando?

- `-e MYSQL_ROOT_PASSWORD=password`: define la contraseña del usuario root.
- `-v ...:/docker-entrypoint-initdb.d/empleado.sql`: monta el archivo SQL local que crea la tabla `personal` y la llena con datos.
- `-p 3306:3306`: expone el puerto de MySQL para conexiones externas.
- `mysql`: usa la imagen oficial de MySQL desde Docker Hub.

---

## 📦 Base de Datos: `personal`

Tabla creada automáticamente al iniciar el contenedor con el script `empleado.sql`.

```sql
CREATE TABLE IF NOT EXISTS personal (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50),
  cargo VARCHAR(30),
  sueldo DECIMAL(10,2)
);
```

---

## 🖥️ Archivos HTML

### `ReadEmpleados.html`

- Obtiene los empleados desde `/empleados` y los muestra en una tabla.
- Formatea el sueldo a dos decimales usando `.toFixed(2)`.

### `CreateEmpleado.html`

- Formulario para registrar nuevos empleados con `nombre`, `cargo` y `sueldo`.
- Envia un `POST` a `/empleados` en formato JSON.

---

## 📁 Volumen utilizado

Se usó la ruta local:

```
C:\Users\User\Downloads\VOLUMEN_WEB
```

Mapeado para:
- Inicializar la base de datos MySQL con datos persistentes.
- Guardar datos que no se eliminan al borrar el contenedor.

---

## 🧪 Evidencia de despliegue

1. Imagen de Docker instalada: `docker pull mysql`
2. Contenedor corriendo: `docker ps`
3. Comando `docker run` con volumen mapeado.
4. Base de datos accesible desde cliente externo (DBeaver, MySQL Workbench, etc.).
5. Archivos `HTML` funcionando y conectados al backend (Node/Express, PHP, etc.).
6. Persistencia de datos confirmada al reiniciar contenedor.

---

## ✅ Resultado

- Interfaz amigable en HTML para gestionar empleados.
- Datos almacenados de forma persistente gracias a volumenes.
- Despliegue completo y funcional usando Docker.

---

## 📎 Autor

**Isaac Quinapallo**  
