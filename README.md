# HulkStore — Frontend

E-commerce de coleccionables Marvel construido con React 19 y Vite.

## Stack

- **React 19** — UI
- **Vite 6** — bundler y dev server
- **TailwindCSS 4** — estilos
- **Zustand** — estado global (auth + carrito)
- **React Router DOM 7** — navegación
- **SweetAlert2** — notificaciones

## Funcionalidades

- Catálogo de productos con filtro por categorías
- Carrito de compras persistente
- Autenticación con JWT (login / registro)
- Panel de administración (solo rol `ADMIN_ROLE`)
  - Gestión de usuarios, productos, categorías y pedidos
- Rutas protegidas por rol
- Diseño responsive dark mode

## Usuarios de prueba

| Rol   | Email           | Contraseña |
|-------|-----------------|------------|
| Admin | admin@admin.com | 123456     |
| User  | user@user.com   | 123456     |

## Instalación local

```bash
npm install
npm run dev
```

Crea un archivo `.env` en la raíz:

```env
VITE_BACKEND_URL=http://localhost:8080/api/
```

## Scripts

| Comando         | Descripción                        |
|-----------------|------------------------------------|
| `npm run dev`   | Servidor de desarrollo en :5173    |
| `npm run build` | Build de producción en `/dist`     |
| `npm run preview` | Preview del build de producción  |

## CI/CD

- **CI** (`ci.yml`) — corre en PRs y push a `develop`: instala dependencias y compila
- **CD** — Vercel despliega automáticamente en cada push a `main`

## Deploy

Hosteado en **Vercel**. La variable `VITE_BACKEND_URL` en producción apunta al backend en Vercel.

Backend: [hulkStoreBack](https://github.com/ferreque/hulkStoreBack)
