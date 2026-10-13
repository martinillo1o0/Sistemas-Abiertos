
# GuitarsLA-TS

## Visión General del Proyecto

### Nombre del proyecto
**GuitarsLA-TS**

### Descripción

GuitarsLA-TS es una aplicación web desarrollada con React y TypeScript que simula una tienda de guitarras. Su principal objetivo es permitir que el usuario visualice un catálogo de productos, agregue guitarras a un carrito de compras, modifique las cantidades de cada artículo y mantenga la información del carrito incluso después de cerrar o actualizar el navegador mediante el uso de **LocalStorage**.

El proyecto fue desarrollado con fines académicos para aplicar conceptos del ecosistema de React, incluyendo Hooks, Componentes, Custom Hooks, manejo de estado y persistencia de datos.

---

## Problema que resuelve

En una tienda en línea es necesario que el usuario pueda:

- Consultar un catálogo de productos.
- Agregar artículos a un carrito.
- Modificar cantidades.
- Eliminar productos.
- Mantener el carrito guardado aunque cierre la página.

La aplicación resuelve estas necesidades mediante una arquitectura basada en React y un almacenamiento persistente utilizando LocalStorage.

---

## Capturas de pantalla

![Evidencia del funcionamiento](./assets/Evidencia_Funcionamient.png)
Ejemplo:

- Pantalla principal
- Carrito de compras
- Carrito con productos almacenados en LocalStorage

---

## Demo

Actualmente el proyecto no cuenta con un despliegue en producción.

En caso de publicarse posteriormente, colocar aquí el enlace.

Ejemplo:

```
https://mi-proyecto.vercel.app
```

---

# Ficha Técnica y Tecnologías

## Lenguajes utilizados

| Tecnología | Versión |
|------------|----------|
| TypeScript | 6.0.2 |
| React | 19.2.8 |
| React DOM | 19.2.8 |
| JavaScript | ES2023 (generado por TypeScript) |

### Nivel de tipado

El proyecto utiliza **TypeScript**, lo que permite definir tipos para:

- Props
- Objetos
- Arreglos
- Funciones
- Datos del carrito

Esto reduce errores durante el desarrollo y mejora el autocompletado del editor.

---

## Framework y Librerías

- React 19
- React DOM

No se utilizaron librerías externas para manejo de estado como Redux o Zustand debido a que el tamaño del proyecto no lo requiere.

Los estilos fueron implementados utilizando archivos CSS incluidos en el proyecto.

---

## Entorno de desarrollo

### Bundler

Vite 8

### Gestor de paquetes

npm

---

## Dependencias principales

Producción

- React
- React DOM

Desarrollo

- TypeScript
- Vite
- ESLint
- @vitejs/plugin-react
- typescript-eslint
- eslint-plugin-react-hooks

Estas herramientas permiten desarrollar una aplicación moderna, rápida y con validación de buenas prácticas durante el desarrollo.

---

# Arquitectura e Implementación en React

La aplicación sigue una arquitectura basada en componentes reutilizables donde la lógica de negocio se encuentra separada de la interfaz gráfica mediante un **Custom Hook**.

Esta separación facilita el mantenimiento y permite reutilizar la lógica del carrito sin duplicar código.

## Organización general

```
src/

components/
    Guitar.tsx
    Header.tsx

hooks/
    useCart.ts

data/
    db.ts

App.tsx
main.tsx
types.d.ts
```

### Responsabilidad de cada carpeta

**components**

Contiene los componentes visuales de la aplicación.

**hooks**

Contiene la lógica reutilizable del carrito de compras.

**data**

Contiene la base de datos local con la información de las guitarras.

**types.d.ts**

Define todos los tipos utilizados dentro del proyecto.

---

## Hooks Nativos utilizados

### useState

Se utiliza para administrar los estados locales de la aplicación.

Principalmente controla:

- Carrito de compras
- Cantidad de productos
- Actualización del estado del carrito

El uso de useState permite que React vuelva a renderizar la interfaz automáticamente cuando cambia la información del carrito.

---

### useEffect

Se utiliza para sincronizar el carrito con LocalStorage.

Cada vez que el carrito cambia, la información se guarda automáticamente en el navegador.

Esto permite que el usuario no pierda sus productos aunque cierre la página.

---

### useMemo

Se utiliza para optimizar cálculos derivados del carrito.

Por ejemplo:

- Saber si el carrito está vacío.
- Calcular el precio total.

Con useMemo estos cálculos solamente se ejecutan cuando realmente cambia el carrito, evitando renderizados innecesarios.

---

### useRef

No fue necesario utilizarlo debido a que la aplicación no manipula directamente elementos del DOM.

---

### useCallback

No fue necesario implementarlo ya que las funciones del proyecto no generan problemas de renderizado que justifiquen su uso.

---

### useContext

No fue utilizado.

El tamaño del proyecto permite administrar el estado únicamente mediante un Custom Hook.

---

### useReducer

No fue necesario debido a que la lógica del carrito puede manejarse correctamente utilizando useState.

---

# Custom Hooks

## useCart

El proyecto implementa un Hook personalizado llamado:

```
useCart()
```

Su objetivo principal es encapsular toda la lógica relacionada con el carrito de compras.

De esta manera los componentes únicamente consumen información sin preocuparse por la lógica interna.

### Responsabilidades

- Agregar productos.
- Eliminar productos.
- Incrementar cantidades.
- Disminuir cantidades.
- Vaciar carrito.
- Calcular total.
- Verificar si el carrito está vacío.
- Recuperar datos desde LocalStorage.
- Guardar automáticamente el carrito en LocalStorage.

### Valores que expone

Entre los principales valores retornados por el Hook se encuentran:

- cart
- data
- addToCart()
- increaseQuantity()
- decreaseQuantity()
- removeFromCart()
- clearCart()
- isEmpty
- cartTotal

Esta arquitectura permite mantener separados los componentes visuales de la lógica de negocio.