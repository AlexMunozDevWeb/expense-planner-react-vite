# Control de gastos y presupuestos - React - TypeScript - Zustand - TailwindCSS

- Despliegue de la aplicación: https://expense-plan.netlify.app/

## Características

- Definir un presupuesto inicial y visualizar presupuesto, disponible y gastado.
- Gráfica circular con el porcentaje de presupuesto gastado (rojo al llegar al 100%).
- Alta, edición y borrado de gastos mediante modal (Headless UI).
- 7 categorías de gasto: Ahorro, Comida, Casa, Gastos Varios, Ocio, Salud y Suscripciones.
- Filtro de gastos por categoría.
- Borrado de gastos con gesto de deslizar (swipe).
- Persistencia del estado en localStorage mediante `zustand/middleware` (clave `budget-app-storage`).
- Reset total de la aplicación.
- Formateo de moneda y fechas en español (`Intl.NumberFormat` / `Intl.DateTimeFormat`).

## Stack y dependencias

| Paquete | Uso |
| --- | --- |
| react / react-dom ^18 | UI |
| typescript ^5 | Tipado estático |
| vite ^5 + @vitejs/plugin-react-swc | Bundler y servidor de desarrollo |
| zustand ^5 | Estado global (con middleware `persist`) |
| tailwindcss ^3 + postcss + autoprefixer | Estilos |
| @headlessui/react ^2 + @heroicons/react ^2 | Modal |
| react-date-picker ^11 + react-calendar ^5 | Selector de fecha |
| react-circular-progressbar ^2 | Gráfica de progreso del presupuesto |
| react-swipeable-list ^1 + prop-types | Lista de gastos con swipe |
| uuid ^10 + @types/uuid | Generación de id únicos |
| eslint ^8 + @typescript-eslint | Linting |

## Instalación y ejecución

```bash
npm install
npm run dev
```

### Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo (Vite) |
| `npm run build` | Compila TypeScript y genera la build de producción (`tsc -b && vite build`) |
| `npm run preview` | Vista previa de la build de producción |
| `npm run lint` | Analiza el código con ESLint |

### Creación del proyecto (referencia)

Si se quisiera recrear el proyecto desde cero:

```bash
npm create vite@latest -- --template react-ts
npm install
```

## Configuración de TailwindCSS

- Instalación: `npm i -D tailwindcss postcss autoprefixer`
- Crear los archivos de configuración: `npx tailwindcss init -p`
- Tailwind v3 (se usa `tailwind.config.js` y `postcss.config.js`, no el formato v4)

## Estado global con Zustand

### ¿Qué es Zustand?

- Zustand es una librería de estado global ligera y sin boilerplate.
- Permite manejar estado compartido sin necesidad de providers ni reducers.
- Es más simple que Context API y más directo que Redux.

### Características principales

- Estado global sin providers
- API simple basada en hooks
- Menos re-renders innecesarios
- Fácil de escalar
- Integración perfecta con TypeScript

### Uso en el proyecto

- Store central en `src/store/index.ts` (`useBudgetStore`), tipado con la interfaz `BudgetStore` de `src/types/index.ts`.
- Middleware `persist` de `zustand/middleware` para guardar en localStorage solo `budget`, `expenses` y `filterCategory` (mediante `partialize`, las acciones no se persisten).

## Modal con Headless UI

- Enlace hacia gist:
  https://gist.github.com/codigoconjuan/92e8a52abc8bd9ea5b81e5ad664d8ef0
- Pegamos el gist en un nuevo componente, en nuestro caso `src/components/modal/ExpenseModal.tsx`.
- Comandos a ejecutar:

```bash
npm i @headlessui/react
npm i @heroicons/react
```

## Añadiendo la dependencia react-date-picker

- Web: https://www.npmjs.com/package/react-date-picker
- Instalación: `npm i react-date-picker`
- Importar CSS: `import 'react-date-picker/dist/DatePicker.css'`

- Dependencia react-calendar: https://github.com/wojtekmaj/react-calendar
- Instalación: `npm i react-calendar`
- Importar CSS: `import 'react-calendar/dist/Calendar.css'`

Ambos se usan en `src/components/modal/ExpenseForm.tsx`.

## Dependencia para la creación de id únicos

- https://www.npmjs.com/package/uuid
- `npm i uuid`
- `npm i -D @types/uuid`

## Dependencia swipe

- https://www.npmjs.com/package/react-swipeable-list
- `npm i react-swipeable-list`
- `npm i prop-types`
- Añadir al `src/index.css`: https://gist.github.com/codigoconjuan/e1a67f2a729bc44978c2c7d0f946ce7e
- Se usa en `src/components/ExpenseDetail.tsx`.

## Dependencia para gráfica

- https://www.npmjs.com/package/react-circular-progressbar
- `npm i react-circular-progressbar`
- Imports en `src/components/BudgetTracker.tsx`:

```ts
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
```

## Estructura del proyecto

```
src/
├── components/
│   ├── modal/
│   │   ├── ExpenseForm.tsx      # Formulario de gasto (DatePicker)
│   │   └── ExpenseModal.tsx     # Modal con Headless UI
│   ├── AmountDisplay.tsx        # Muestra de cantidades
│   ├── BudgetProgressBar.tsx    # Barra de progreso
│   ├── BudgetTracker.tsx        # Resumen + gráfica circular + reset
│   ├── ErrorMessage.tsx         # Mensajes de error
│   ├── ExpenseDetail.tsx        # Gasto individual (swipe para borrar)
│   ├── ExpenseList.tsx          # Listado filtrado de gastos
│   ├── FilterByCategory.tsx     # Select de filtro por categoría
│   ├── SetBudgetForm.tsx        # Formulario de presupuesto inicial
│   └── TopMenu.tsx              # Cabecera
├── data/
│   └── categories.ts            # Categorías de gasto
├── helpers/
│   └── index.ts                 # formatCurrency, formatDate, getPercentage
├── store/
│   └── index.ts                 # Store de Zustand (persist)
├── types/
│   └── index.ts                 # Tipos (Expense, BudgetStore, Category...)
├── App.tsx
├── main.tsx
└── index.css                    # Estilos globales + Tailwind
```

## Building app

```bash
npm run build
```
