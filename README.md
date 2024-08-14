# Control de gastos y presupuestos - React - TypeScript - useReducer - ContextAPI - TailwindCSS

## Instalación de React
- npm create vite@latest
- npm install
- npm run dev

## Intalación de tailwind
- npm i -D tailwindcss postcss autoprefixer
- Crear los archivos config: npx tailwindcss init -p

## Context API - estado global sin dependencias
### ¿Que es ContextAPI?
- Context API permite tener un estado global en la aplicación, esto quiere decir que solo se tiene una instancia del state que se puede acceder desde cualquier componente sin pasarlo por diferentes componentes vía props.
- El hook para utilizarlo es useContext
- Muchas librerías utilizan Context API

### Alternativas a context API
- Context API no requiere dependencias pero su boilerplate para configurarlo puede ser algo complejo
- Otras alternativas son Zustand o Redux Toolkit

### Instalación Headless UI
- Enlace hacia gist: 
  https://gist.github.com/codigoconjuan/92e8a52abc8bd9ea5b81e5ad664d8ef0
- Pegamos el gist en un nuevo componente, en nuestro caso ExpenseModal.tsx
- Comando a ejecutar: npm i @headlessui/react
                      npm i @heroicons/react