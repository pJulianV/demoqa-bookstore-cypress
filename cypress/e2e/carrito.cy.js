describe('Gestión de Colección (Carrito) - DemoQA Book Store', () => {
    let users;

    beforeEach(() => {
        cy.fixture('usuarios').then((u) => {
            users = u;
        });
    });

    // CP-CART-01: Flujo completo de navegación - PASÓ en manual
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

    // CP-CART-02: Ver detalles completos de un libro - PASÓ en manual
    it('CP-CART-02: Debe permitir ver detalles completos de un libro', () => {
        cy.log('PASO 1: Visitando catálogo de libros');
        cy.visit('/books', { timeout: 30000 });

        cy.log('PASO 2: Haciendo clic en un libro específico');
        cy.contains('a', users.books.git, { timeout: 15000 }).click();

        cy.log('PASO 3: Verificando campos de detalle del libro');
        cy.url().should('include', '/books');
        cy.get('body').should('contain.text', users.books.git);
        // Verificar campos reales visibles en la página de detalles
        cy.get('body').should('contain.text', 'ISBN');
        cy.get('body').should('contain.text', 'Author');
        cy.get('body').should('contain.text', 'Publisher');
        cy.screenshot('carrito/CP-CART-02_detalles-libro');
        cy.log('TEST COMPLETADO: Detalles del libro visible');
    });

    // CP-CART-03: Botón Add To Your Collection requiere sesión - PASÓ en manual con sesión
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

    // CP-CART-04: Acceso a perfil autenticado - PASÓ en manual
    it('CP-CART-04: Debe permitir acceder a la sección de perfil/colección', () => {
        cy.log('PASO 1: Registrando e iniciando sesión');
        cy.registrarYLogin();

        cy.log('PASO 2: Verificando que el perfil cargó correctamente');
        cy.url().should('include', '/profile');
        cy.get('body').should('not.contain.text', 'Currently you are not logged');

        cy.log('PASO 3: Verificando elementos del perfil autenticado');
        // En el perfil autenticado siempre aparece el nombre de usuario y botones de acción
        cy.contains('User Name :').should('be.visible');
        cy.contains('Go To Book Store').should('be.visible');
        cy.screenshot('carrito/CP-CART-04_perfil-autenticado');
        cy.log('TEST COMPLETADO: Acceso a perfil autenticado funciona');
    });

    // CP-CART-06: Colección visible en perfil - el perfil sin libros muestra tabla vacía
    it('CP-CART-06: El perfil debe mostrar la colección de libros del usuario', () => {
        cy.log('PASO 1: Registrando e iniciando sesión');
        cy.registrarYLogin();

        cy.log('PASO 2: Verificando que el perfil cargó con sesión activa');
        cy.url().should('include', '/profile');
        cy.get('body').should('not.contain.text', 'Currently you are not logged');

        cy.log('PASO 3: Verificando que la sección de colección está presente');
        // La tabla de colección siempre aparece en el perfil (vacía o con libros)
        cy.contains('Delete All Books').should('be.visible');
        cy.screenshot('carrito/CP-CART-06_seccion-coleccion-visible');
        cy.log('TEST COMPLETADO: Sección de colección visible en perfil autenticado');
    });
});
