# Challenge MercadoLibre

## Tecnologías utilizadas
Servidor Desarrollado en NodeJS utilizando la libreria ExpressJS.
Cliente libreria React para la modularizacion de componentes.

## Requerimientos
Generar 3 vistas correspondientes a un buscador, una lista de resultados de la búsqueda, y el detalle de un producto. Las vistas deben ser navegables de manera independiente, y cuentan con sus propias URL:
- Buscador: “/”
- Lista de resultados: “/items?search=”
- Detalle del producto: “/items/:id”

También, construir los siguientes endpoints para ser utilizados desde las vistas:
- /api/items?q=:query
- /api/items/:id

## Instalación y Compilación

Clonar el repositorio, y dentro de la carpeta raíz, instalar sus dependencias

    $ npm install

Iniciar la App:

    $ npm run all