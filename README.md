
# GAMING PLATFORM

## Descripción
Una plataforma de juegos de multijugador basícos, tales como:
* 3 y 2
* Snake (Futura implementación)
* Ajedrez (Futura implementación)
* Tetris (Futura implementación)




## Instalación

Proceso de instalación

1. Clonar repositorio

2. 

```bash 
  npm install 
```

3. Crear archivo `.env` y copiar información del archivo `.env.example` (Verificar archivo `.env` se encuentre listado en `.gitignore`)

### Ejecución en modo desarrollo

En terminal de Ubuntu 

```
npm run dev
```


## Documentación

En notion encontraras información acerca de la jugabilidad y diseño de la aplicación:

- [Documentación en Notion](https://www.notion.so/Cards-Game-3-and-2-Multiplayer-8eb35e7286f445758ef1d7624638c3f4)

### Funcionamiento

Para el desarrollo se hace uso de la libreria [Socket.io](https://socket.io/) 
para aplicar la funcionalidad de una conexion entre el servidor y el cliente, así como 
la funcionalidad de establecer rooms, para las sesiones de los juegos iniciadas y regstringir 
el numero de usuarios por sesion.

La API actualmente cuenta con los puntos para creación de usuarios del juego, que se autentican
con nombre de usuario y contraseña. Estos se guardan en una base de datos POSTGRES, realizando la cliente
conexion con ayuda de la libreria [pg](https://node-postgres.com/).

Adicionalmente se implementa la autenticación del usuario, median JSON Web TOKEN (En el momento se está 
enviando el token para acceder a la aplicación, en proximas versiones se ampliaran los servicios y las autorizaciones).
