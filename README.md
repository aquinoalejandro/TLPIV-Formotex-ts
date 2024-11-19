# Formotex

Formotex es una aplicación diseñada para gestionar el stock de equipos electrónicos a reparar en una empresa. El backend está desarrollado con TypeScript siguiendo los principios de Programación Orientada a Objetos (POO), mientras que el frontend utiliza ReactJS. La base de datos empleada es PostgreSQL.

## Características

- **Backend**: TypeScript, POO
- **Frontend**: ReactJS
- **Base de Datos**: PostgreSQL
- **Gestión de Stock**: Creación, edición y eliminación de registros de equipos electrónicos.
- **Gestión de Clientes**: Registro y seguimiento de clientes y sus equipos.
- **Interfaz de Usuario**: Diseño intuitivo y fácil de usar.
- **Gestión de Roles**: Creación de usuarios administradores y clientes.

## Requisitos

- **Node.js**: Versión 14 o superior.
- **npm**: Versión 6 o superior.
- **PostgreSQL**.

## Instalación

Sigue los pasos a continuación para configurar y ejecutar el proyecto:

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/aquinoalejandro/TLPIV-Formotex-ts
   ```

2. **Navegar al directorio del proyecto:**

   ```bash
   cd TLPIV-Formotex-ts
   ```

3. **Instalar las dependencias del cliente:**

   ```bash
   cd client
   npm install
   ```

4. **Instalar las dependencias del servidor:**

   ```bash
   cd ../server
   npm install
   ```

5. **Configurar las variables de entorno:**  
   Las variables de entorno ya están configuradas por defecto, pero puedes ajustarlas según tu usuario y contraseña de PostgreSQL.

6. **Crear la base de datos:**  
   En PostgreSQL, crea una base de datos llamada `ts_db`.

7. **Iniciar el servidor:**

   Desde el directorio del servidor, ejecuta:

   ```bash
   npm run dev
   ```

8. **Iniciar el cliente:**  

   Vuelve al directorio del cliente y ejecuta:

   ```bash
   npm run dev
   ```

## Uso

Una vez que ambos servidores (cliente y backend) estén ejecutándose, podrás acceder a la aplicación desde tu navegador en la dirección [http://localhost:5173](http://localhost:5173). 


  
