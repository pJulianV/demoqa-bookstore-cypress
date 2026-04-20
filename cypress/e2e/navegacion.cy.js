describe('Flujo de Usuario Completo - DemoQA Book Store', () => {
    let users;

    beforeEach(() => {
        cy.fixture('usuarios').then((u) => {
            users = u;
        });
    });

    // FLU-01: Usuario realista: Navega catálogo → busca → ve detalles → login → perfil
    it('FLU-01: Usuario debe navegar fluida y lógicamente por la aplicación', () => {
        // 1. Acceder al catálogo principal
        cy.log('PASO 1: Visitando catálogo principal');
        cy.visit('/books', { timeout: 30000 });

        cy.log('PASO 2: Verificando carga del catálogo');
        cy.url().should('include', '/books');
        cy.get('body').should('contain.text', 'Git');
        cy.screenshot('navegacion/FLU-01_catalogo-cargado');

        // 2. Buscar por editorial
        cy.log('PASO 3: Escribiendo en caja de búsqueda');
        cy.get('#searchBox', { timeout: 15000 }).type("O'Reilly", { delay: 50 });

        cy.log('PASO 4: Verificando resultados de búsqueda');
        cy.get('body', { timeout: 15000 }).should('contain.text', "O'Reilly");
        cy.screenshot('navegacion/FLU-01_busqueda-resultado');

        // 3. Ver detalles de un libro
        cy.log('PASO 5: Limpiando búsqueda y seleccionando libro');
        cy.get('#searchBox').clear();

        cy.log('PASO 6: Haciendo clic en el libro');
        cy.contains('a', users.books.git, { timeout: 15000 }).click();

        cy.log('PASO 7: Verificando página de detalles');
        cy.get('body').should('contain.text', users.books.git);
        cy.screenshot('navegacion/FLU-01_detalles-libro');

        // 4. Volver al catálogo
        cy.log('PASO 8: Volviendo al catálogo');
        cy.visit('/books', { timeout: 30000 });
        cy.url().should('include', '/books');
        cy.screenshot('navegacion/FLU-01_volver-catalogo');

        // 5. Registrar e iniciar sesión
        cy.log('PASO 9: Registrando e iniciando sesión');
        cy.registrarYLogin();

        cy.log('PASO 10: Verificando redirección al perfil tras login');
        cy.url().should('include', '/profile');
        cy.get('#userName-value', { timeout: 10000 }).should('be.visible');
        cy.screenshot('navegacion/FLU-01_perfil-autenticado');

        cy.log('TEST COMPLETADO: Flujo completo navegación exitosa con sesión');
    });
});
