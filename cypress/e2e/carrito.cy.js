describe('Gestión de Colección (Carrito) - DemoQA Book Store', () => {
    let users;

    beforeEach(() => {
        cy.fixture('usuarios').then((u) => {
            users = u;
        });
    });

    // CP-CART-01: Flujo completo de navegación
    it('CP-CART-01: Debe permitir navegar entre catálogo, detalles y perfil de forma fluida', () => {
        cy.registrarYLogin();

        cy.visit('/books', { timeout: 30000 });
        cy.url().should('include', '/books');
        cy.screenshot('carrito/CP-CART-01_catalogo');

        cy.contains('a', users.books.git, { timeout: 15000 }).click();
        cy.get('body').should('contain.text', users.books.git);
        cy.screenshot('carrito/CP-CART-01_detalles-libro');

        cy.visit('/books', { timeout: 30000 });
        cy.url().should('include', '/books');
        cy.screenshot('carrito/CP-CART-01_volver-catalogo');

        cy.visit('/profile', { timeout: 30000 });
        cy.url().should('include', '/profile');
        cy.get('body').should('not.contain.text', 'Currently you are not logged');
        cy.screenshot('carrito/CP-CART-01_perfil-autenticado');
    });

    // CP-CART-02: Ver detalles completos de un libro
    it('CP-CART-02: Debe permitir ver detalles completos de un libro', () => {
        cy.log('PASO 1: Visitando catálogo de libros');
        cy.visit('/books', { timeout: 30000 });

        cy.log('PASO 2: Haciendo clic en un libro específico');
        cy.contains('a', users.books.git, { timeout: 15000 }).click();

        cy.log('PASO 3: Verificando campos de detalle del libro');
        cy.url().should('include', '/books');
        cy.get('body').should('contain.text', users.books.git);
        cy.get('body').should('contain.text', 'ISBN');
        cy.get('body').should('contain.text', 'Author');
        cy.get('body').should('contain.text', 'Publisher');
        cy.screenshot('carrito/CP-CART-02_detalles-libro');
        cy.log('TEST COMPLETADO: Detalles del libro visible');
    });

    // CP-CART-03: Botón Add To Your Collection requiere sesión
    it('CP-CART-03: Debe mostrar información completa y opciones para agregar a colección', () => {
        cy.log('PASO 1: Iniciando sesión para poder ver el botón');
        cy.registrarYLogin();

        cy.log('PASO 2: Visitando catálogo y seleccionando libro');
        cy.visit('/books', { timeout: 30000 });
        cy.contains('a', users.books.git, { timeout: 15000 }).click();

        cy.log('PASO 3: Verificando que la página de detalles cargó');
        cy.get('body').should('contain.text', users.books.git);

        cy.log('PASO 4: Verificando que el botón Add To Your Collection existe');
        cy.contains('button', 'Add To Your Collection', { timeout: 15000 }).should('be.visible');
        cy.screenshot('carrito/CP-CART-03_boton-agregar-coleccion');
        cy.log('TEST COMPLETADO: Botón agregar a colección presente con sesión activa');
    });

    // CP-CART-04: Acceso a perfil autenticado
    it('CP-CART-04: Debe permitir acceder a la sección de perfil/colección', () => {
        cy.log('PASO 1: Registrando e iniciando sesión');
        cy.registrarYLogin();

        cy.log('PASO 2: Verificando que el perfil cargó correctamente');
        cy.url().should('include', '/profile');
        cy.get('body').should('not.contain.text', 'Currently you are not logged');

        cy.log('PASO 3: Verificando elementos del perfil autenticado');
        cy.contains('User Name :').should('be.visible');
        cy.contains('Go To Book Store').should('be.visible');
        cy.screenshot('carrito/CP-CART-04_perfil-autenticado');
        cy.log('TEST COMPLETADO: Acceso a perfil autenticado funciona');
    });

    // CP-CART-06: Colección visible en perfil
    it('CP-CART-06: El perfil debe mostrar la colección de libros del usuario', () => {
        cy.log('PASO 1: Registrando e iniciando sesión');
        cy.registrarYLogin();

        cy.log('PASO 2: Verificando que el perfil cargó con sesión activa');
        cy.url().should('include', '/profile');
        cy.get('body').should('not.contain.text', 'Currently you are not logged');

        cy.log('PASO 3: Verificando que la sección de colección está presente');
        cy.contains('Delete All Books').should('be.visible');
        cy.screenshot('carrito/CP-CART-06_seccion-coleccion-visible');
        cy.log('TEST COMPLETADO: Sección de colección visible en perfil autenticado');
    });

    // CP-CART-07: Agregar libro, verificar, intentar duplicado y eliminar
    it('CP-CART-07: Debe agregar un libro a la colección, verificarlo, volver a agregarlo y luego eliminarlo', () => {
        const usuario = 'testuser_demoqa_2026';
        const password = 'Test@Cypress123';
        const isbn = '9781449325862'; // Git Pocket Guide

        // ── OBTENER TOKEN Y LIMPIAR COLECCIÓN VÍA API ────────────────────────
        // Hacemos esto ANTES del login del navegador para no interferir con la sesión
        cy.request({
            method: 'POST',
            url: '/Account/v1/GenerateToken',
            body: { userName: usuario, password: password },
        }).then((tokenRes) => {
            const token = tokenRes.body.token;

            cy.request({
                method: 'POST',
                url: '/Account/v1/Authorized',
                body: { userName: usuario, password: password },
                failOnStatusCode: false,
            });

            cy.request({
                method: 'GET',
                url: `/Account/v1/User/${tokenRes.body.userID || ''}`,
                headers: { Authorization: `Bearer ${token}` },
                failOnStatusCode: false,
            }).then((userRes) => {
                const userId = userRes.body?.userId;
                if (userId) {
                    cy.request({
                        method: 'DELETE',
                        url: `/BookStore/v1/Books?UserId=${userId}`,
                        headers: { Authorization: `Bearer ${token}` },
                        failOnStatusCode: false,
                    });
                }
            });
        });

        // ── LOGIN DESDE EL NAVEGADOR ──────────────────────────────────────────
        cy.visit('/login');
        cy.get('#userName').should('be.visible').clear().type(usuario);
        cy.get('#password').should('be.visible').clear().type(password);
        cy.get('#login').click();
        cy.url({ timeout: 20000 }).should('include', '/profile');
        cy.get('#userName-value').should('contain.text', usuario);

        // ── AGREGAR LIBRO ──────────────────────────────────────────────────────
        cy.visit('/books');
        cy.contains('a', 'Git Pocket Guide', { timeout: 15000 }).click();

        // Registrar handlers de alerts ANTES de hacer click
        // IMPORTANTE: nunca usar cy.* dentro del handler, solo return true
        cy.on('window:alert', () => true);
        cy.on('window:confirm', () => true);

        cy.contains('button', 'Add To Your Collection', { timeout: 15000 })
            .should('be.visible')
            .click();

        // Esperar el alert "Book added to your collection." y aceptarlo
        cy.on('window:alert', () => true);

        // Dar tiempo a que el libro se registre en el servidor
        cy.wait(2000);

        // ── VERIFICAR EN PERFIL ────────────────────────────────────────────────
        cy.visit('/profile');
        cy.get('body', { timeout: 15000 }).should('contain.text', 'Git Pocket Guide');
        cy.screenshot('carrito/CP-CART-07_libro-agregado');

        // ── INTENTO DE AGREGAR DUPLICADO ──────────────────────────────────────
        cy.visit('/books');
        cy.contains('a', 'Git Pocket Guide', { timeout: 15000 }).click();

        cy.on('window:alert', () => true);
        cy.on('window:confirm', () => true);

        cy.contains('button', 'Add To Your Collection', { timeout: 15000 })
            .should('be.visible')
            .click();

        cy.wait(1000);
        cy.screenshot('carrito/CP-CART-07_intento-agregar-repetido');

        // ── VERIFICAR QUE EL LIBRO SIGUE EN PERFIL ────────────────────────────
        cy.visit('/profile');
        cy.get('body', { timeout: 15000 }).should('contain.text', 'Git Pocket Guide');

        // ── ELIMINAR EL LIBRO ─────────────────────────────────────────────────
        // Flujo según las imágenes:
        // 1. Click en span#delete-record-{ISBN} (ícono trash)
        // 2. Aparece modal de DemoQA → click en #closeSmallModal-ok
        // 3. Aparece alert del navegador "Book deleted." → aceptar automáticamente

        // Registrar handler del alert del navegador ANTES del click
        cy.on('window:alert', () => true);

        cy.get(`span#delete-record-${isbn}`, { timeout: 15000 })
            .should('be.visible')
            .click();

        // Confirmar en el modal de DemoQA (botón OK del diálogo interno)
        cy.get('#closeSmallModal-ok', { timeout: 10000 })
            .should('be.visible')
            .click();

        // El alert "Book deleted." del navegador se acepta automáticamente por el handler
        cy.wait(1500);

        // Verificar que el libro fue eliminado
        cy.get('body', { timeout: 15000 }).should('not.contain.text', 'Git Pocket Guide');
        cy.screenshot('carrito/CP-CART-07_libro-eliminado');
    });
});
