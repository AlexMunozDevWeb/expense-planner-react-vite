# Control de gastos y presupuestos - React - TypeScript - useReducer - ContextAPI - TailwindCSS

## Instalación de React

- npm create vite@latest
- npm install
- npm run dev

## Intalación de tailwind

- npm i -D tailwindcss postcss autoprefixer
- Crear los archivos config: npx tailwindcss init -p

## Estado global con Zustand

### ¿Que es Zustand?

- Zustand es una librería de estado global ligera y sin boilerplate.
- Permite manejar estado compartido sin necesidad de providers ni reducers.
- Es más simple que Context API y más directo que Redux.

### Características principales

- Estado global sin providers
- API simple basada en hooks
- Menos re-renders innecesarios
- Fácil de escalar
- Integración perfecta con TypeScript

## Instalación Headless UI

- Enlace hacia gist:
  https://gist.github.com/codigoconjuan/92e8a52abc8bd9ea5b81e5ad664d8ef0
- Pegamos el gist en un nuevo componente, en nuestro caso ExpenseModal.tsx
- Comando a ejecutar: npm i @headlessui/react
  npm i @heroicons/react

## Añadiendo la dependencia react-data-picker

- Web: https://www.npmjs.com/package/react-date-picker
- Instalación: npm i react-date-picker
- Importar CSS: import 'react-date-picker/dist/DatePicker.css'

- Dependencia react-calendar: https://github.com/wojtekmaj/react-calendar
- Instalación: npm install react-calendar
- Importar CSS: import 'react-calendar/dist/Calendar.css'

## Dependencia para la creación de id únicos

- https://www.npmjs.com/package/uuid
- npm i uuid
- npm i --save-dev @types/uuid

## Dependencia swipe

- https://www.npmjs.com/package/react-swipeable-list
- npm install react-swipeable-list
- npm install prop-types
- Añadir al index.css: https://gist.github.com/codigoconjuan/e1a67f2a729bc44978c2c7d0f946ce7e

## Dependencia para gráfica

- https://www.npmjs.com/package/react-circular-progressbar
- npm i --save react-circular-progressbar
- import { CircularProgressbar } from 'react-circular-progressbar';
- import 'react-circular-progressbar/dist/styles.css';

## Building app

- npm run build
