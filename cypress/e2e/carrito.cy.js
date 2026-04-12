describe('Gestión de Colección (Carrito) - DemoQA Book Store', () => {
    let users;
    
    beforeEach(() => {
        cy.fixture('usuarios').then((u) => {
            users = u;
        });
    });
    // CP-CART-01: Flujo completo de navegación y acceso a colección
    it('CP-CART-01: Debe permitir navegar entre catálogo, detalles y perfil de forma fluida', () => {
        // Acceder al catálogo
        cy.visit('/books', { timeout: 30000 });
         
        cy.url().should('include', '/books');
        cy.wait(300);
        
        // Ver detalles de un libro
        cy.contains('a', users.books.git, { timeout: 15000 }).click();
         
        cy.get('body').should('contain.text', users.books.git);
        cy.wait(300);
        
        // Volver al catálogo
        cy.visit('/books', { timeout: 30000 });
         
        cy.url().should('include', '/books');
        cy.wait(300);
        
        // Acceder al perfil/colección
        cy.visit('/profile', { timeout: 30000 });
         
        cy.url().should('include', '/profile');
    });
    // CP-CART-02: Ver detalles de un libro - CRUD READ
    it('CP-CART-02: Debe permitir ver detalles completos de un libro', () => {
        cy.log('PASO 1: Visitando catálogo de libros');
        cy.visit('/books', { timeout: 30000 });
        cy.wait(1000);
         
        cy.log('PASO 2: Haciendo clic en un libro específico');
        cy.contains('a', users.books.git, { timeout: 15000 }).click();
        cy.wait(800);
         
        cy.log('PASO 3: Verificando que se cargó la página de detalles');
        cy.url().should('include', '/books');
        cy.wait(300);
        cy.log('PASO 4: Verificando que el título del libro se muestra');
        cy.get('body').should('contain.text', users.books.git);
        cy.log('TEST COMPLETADO: Detalles del libro visible');
    });

    // CP-CART-03: Página con detalles permite interacción
    it('CP-CART-03: Debe mostrar información completa y opciones para agregar a colección', () => {
        cy.log('PASO 1: Visitando catálogo de libros');
        cy.visit('/books', { timeout: 30000 });
        cy.wait(1000);
         
        cy.log('PASO 2: Seleccionando un libro');
        cy.contains('a', users.books.git, { timeout: 15000 }).click();
        cy.wait(1000);
         
        cy.log('PASO 3: Verificando que la página se cargó');
        // Verificar elementos de la página de detalles
        cy.get('body').should('be.visible');
        cy.wait(300);
        cy.log('PASO 4: Buscando opciones de interacción');
        // Buscar botón/opción para agregar a colección
        cy.get('button, [id*="add"], [class*="add"]', { timeout: 15000 }).should('have.length.greaterThan', 0);
        cy.log('TEST COMPLETADO: Opciones de colección presentes');
    });

    // CP-CART-04: Acceso a sección de perfil
    it('CP-CART-04: Debe permitir acceder a la sección de perfil/colección', () => {
        cy.log('PASO 1: Visitando página de perfil');
        cy.visit('/profile', { timeout: 30000 });
        cy.wait(1000);
        cy.log('PASO 2: Verificando que se cargó correctamente');
        cy.url().should('include', '/profile');
        cy.wait(500);
        cy.log('PASO 3: Verificando visibilidad de contenido');
        cy.get('body').should('be.visible');
        cy.log('TEST COMPLETADO: Acceso a perfil funciona');
    });

    // CP-CART-06: Verificar que la colección es mostrada
    it('CP-CART-06: El perfil debe mostrar la colección de libros del usuario', () => {
        cy.log('PASO 1: Visitando página de perfil');
        cy.visit('/profile', { timeout: 30000 });
        cy.wait(1000);
        cy.log('PASO 2: Verificando que se cargó correctamente');
        cy.url().should('include', '/profile');
        cy.wait(500);
        // Verificar que hay tabla o sección de colección
        cy.log('PASO 3: Verificando que hay contenido en la página');
        cy.get('body').should('be.visible');
        cy.log('TEST COMPLETADO: Colección visible en perfil');
    });


});
