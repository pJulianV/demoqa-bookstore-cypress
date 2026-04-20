# Descripción de Tests, Cobertura y Análisis Técnico
## Proyecto: DemoQA Book Store — Suite Automatizada con Cypress
**Equipo:** Sergio Arboleda, Diego Cala, Julian Vargas, Manuela Hernandez  
**Fecha:** Abril 2026 | **Curso:** Pruebas de Software II

---

## 1. Descripción de los Tests

La suite está organizada en 4 archivos dentro de `cypress/e2e/`, cada uno cubre un módulo funcional de la aplicación:

### login.cy.js — Autenticación y Registro (4 tests)
| ID | Nombre | Tipo |
|---|---|---|
| CP-AUTH-01 | Acceso a página de login y verificación del formulario | Positivo |
| CP-AUTH-02 | Prevención de registro con username duplicado | Negativo |
| CP-AUTH-03 | Formulario de login muestra todos los campos requeridos | Positivo |
| CP-AUTH-05 | Sistema de autenticación funcional con escritura en campos | Positivo |

### productos.cy.js — Búsqueda y Catálogo (6 tests)
| ID | Nombre | Tipo |
|---|---|---|
| CP-PROD-01 | Catálogo carga correctamente con caja de búsqueda visible | Positivo |
| CP-PROD-02 | Búsqueda por editorial filtra resultados correctamente | Positivo |
| CP-PROD-03 | Sistema de paginación existe y es accesible | Positivo |
| CP-PROD-04 | Tabla de libros muestra columnas correctas | Positivo |
| CP-PROD-05 | Encabezados de columna permiten ordenamiento | Positivo |
| CP-PROD-06 | Búsqueda sin resultados no rompe la aplicación | Negativo |

### carrito.cy.js — Gestión de Colección (5 tests)
| ID | Nombre | Tipo |
|---|---|---|
| CP-CART-01 | Navegación fluida entre catálogo, detalles y perfil | Positivo |
| CP-CART-02 | Visualización completa de detalles de un libro (CRUD READ) | Positivo |
| CP-CART-03 | Página de detalles muestra opciones para agregar a colección | Positivo |
| CP-CART-04 | Acceso correcto a la sección de perfil/colección | Positivo |
| CP-CART-06 | Perfil muestra la sección de colección del usuario | Positivo |

### navegacion.cy.js — Flujo de Usuario Completo (1 test)
| ID | Nombre | Tipo |
|---|---|---|
| FLU-01 | Flujo completo: catálogo → búsqueda → detalles → login → perfil | Positivo |

---

## 2. Métricas de Cobertura

| Métrica | Valor |
|---|---|
| Total de tests automatizados | 16 |
| Tests positivos | 13 |
| Tests negativos | 3 |
| Módulos cubiertos | 4 |
| Archivos de prueba | 4 |
| Uso de fixtures | Sí (`usuarios.json`) |
| Uso de `beforeEach()` | Sí (login y carrito) |
| Screenshots automáticos | Sí (6 capturas en productos) |

### Funcionalidades cubiertas vs. requeridas
| Funcionalidad | Cubierta |
|---|---|
| Acceso y formulario de login | ✅ |
| Prevención de registro duplicado | ✅ |
| Carga del catálogo de libros | ✅ |
| Búsqueda por editorial | ✅ |
| Búsqueda sin resultados | ✅ |
| Paginación de resultados | ✅ |
| Ordenamiento por columnas | ✅ |
| Visualización de detalles de libro | ✅ |
| Acceso al perfil/colección | ✅ |
| Flujo de navegación completo | ✅ |
| Agregar libro a colección (autenticado) | ⚠️ Parcial |
| Eliminar libro de colección | ❌ No automatizado |

---

## 3. Análisis Técnico

### Framework y herramientas
- **Cypress 13+** como framework principal de automatización E2E
- **Node.js** como entorno de ejecución
- **Fixtures JSON** (`usuarios.json`) para centralizar datos de prueba y facilitar mantenimiento
- **cy.fixture()** con `beforeEach()` para cargar datos antes de cada test

### Buenas prácticas aplicadas
- Selectores estables basados en `id` (`#userName`, `#password`, `#login`, `#searchBox`)
- Esperas inteligentes con `timeout` explícito en lugar de `cy.wait()` con tiempos fijos
- Logs descriptivos en cada paso con `cy.log()` para facilitar depuración
- Tests independientes que pueden ejecutarse en cualquier orden
- Screenshots automáticos con nombres descriptivos para trazabilidad

### Limitaciones identificadas
- El registro de nuevos usuarios requiere resolución de CAPTCHA, lo que impide automatizar el flujo completo de registro
- Agregar libros a la colección requiere sesión autenticada; al no poder automatizar el login completo por CAPTCHA, este flujo queda parcialmente cubierto
- La eliminación de libros de la colección no fue automatizada por la misma razón

### Estructura del proyecto
cypress/
├── e2e/
│   ├── login.cy.js
│   ├── productos.cy.js
│   ├── carrito.cy.js
│   └── navegacion.cy.js
├── fixtures/
│   └── usuarios.json
├── support/
│   ├── commands.js
│   └── e2e.js
cypress.config.js
README.md