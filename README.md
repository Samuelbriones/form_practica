# Practica Experimental

Este proyecto es una práctica experimental desarrollada con React, TypeScript, Vite y Bootstrap. Incluye un formulario responsivo y estilizado con Bootstrap.

## Requisitos previos

- Node.js (18.x o superior)
- npm (incluido con Node.js)

## Instalación

1. **Clona este repositorio** o descarga el código fuente.
2. **Abre una terminal** en la carpeta del proyecto.
3. **Instala las dependencias** ejecutando:

   ```
   npm install
   ```

4. **Instala Bootstrap** ejecutando:

   ```
   npm install bootstrap
   ```

## Configuración de estilos

Importa los estilos de Bootstrap en tu archivo principal (`src/main.tsx` o `src/index.tsx`):

```typescript
import 'bootstrap/dist/css/bootstrap.min.css';
```

## Ejecución en modo desarrollo

Para iniciar el servidor de desarrollo, ejecuta:

```
npm run dev
```

Abre [http://localhost:5173/](http://localhost:5173/) en tu navegador para ver la aplicación.

## Scripts útiles

- `npm run dev` — Inicia el servidor de desarrollo.
- `npm run build` — Genera la versión de producción.
- `npm run preview` — Previsualiza la versión de producción localmente.

## Uso de Bootstrap en el formulario

- El formulario utiliza clases de Bootstrap como `container`, `form-control`, `btn`, y `btn-primary`.
- El diseño es responsivo usando el sistema de grid de Bootstrap (`row`, `col-md-6`, etc.).

**Ejemplo de estructura del formulario:**

```tsx
<div className="container mt-5">
  <div className="row justify-content-center">
    <div className="col-md-6">
      <form>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input type="text" className="form-control" id="nombre" />
        </div>
        <button type="submit" className="btn btn-primary">Registrar</button>
      </form>
    </div>
  </div>
</div>
```

## Notas adicionales

- Si ves advertencias sobre dependencias o vulnerabilidades, puedes intentar solucionarlas con:

  ```
  npm audit fix
  ```

- Si necesitas actualizar la base de datos de Browserslist, ejecuta:

  ```
  npx update-browserslist-db@latest
  ```

---

**Autor:**  
Wilmer Samuel Briones G

**Licencia:**  
Este proyecto es solo para fines educativos.
