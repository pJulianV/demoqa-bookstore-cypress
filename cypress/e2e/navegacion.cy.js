describe('Flujo de Usuario Completo - DemoQA Book Store', () => {
    let users;
    
    beforeEach(() => {
        cy.fixture('usuarios').then((u) => {
            users = u;
        });
    });

    // FLU-01: Usuario realista: Navega catálogo → busca → ve detalles → accede a perfil
    it('FLU-01: Usuario debe navegar fluida y lógicamente por la aplicación', () => {
        // 1. Acceder al catálogo principal
        cy.log('PASO 1: Visitando catálogo principal');
        cy.visit('/books', { timeout: 30000 });
        cy.wait(1000);
        
        cy.log('PASO 2: Verificando carga del catálogo');
        cy.url().should('include', '/books');
        cy.get('body').should('contain.text', 'Git');
        cy.wait(1000);
        
        // 2. Buscar por criterio (autor o editorial)
        cy.log('PASO 3: Escribiendo en caja de búsqueda');
        cy.get('#searchBox', { timeout: 15000 }).type("O'Reilly", { delay: 50 });
        cy.wait(800);
        
        cy.log('PASO 4: Verificando resultados de búsqueda');
        cy.get('body', { timeout: 15000 }).should('contain.text', "O'Reilly");
        cy.wait(1000);
        
        // 3. Ver detalles de un libro específico
        cy.log('PASO 5: Limpiando búsqueda y seleccionando libro');
        cy.get('#searchBox').clear();
        cy.wait(500);
        cy.log('PASO 6: Haciendo clic en el libro');
        cy.contains('a', users.books.git, { timeout: 15000 }).click();
        cy.wait(1000);
        
        cy.log('PASO 7: Verificando página de detalles');
        cy.get('body').should('contain.text', users.books.git);
        cy.wait(1000);
        
        // 4. Volver al catálogo
        cy.log('PASO 8: Volviendo al catálogo');
        cy.visit('/books', { timeout: 30000 });
        cy.wait(1000);
        
        cy.log('PASO 9: Confirmando retorno al catálogo');
        cy.url().should('include', '/books');
        cy.wait(500);
        
        // 5. Acceder a la página de login (para potencial registro/login)
        cy.log('PASO 10: Visitando página de login');
        cy.visit('/login', { timeout: 30000 });
        cy.wait(1000);
        
        cy.log('PASO 11: Verificando elementos de login');
        cy.url().should('include', '/login');
        cy.get('#userName').should('be.visible');
        cy.wait(500);
        
        // 6. Acceder a perfil (donde estaría la colección)
        cy.log('PASO 12: Accediendo a página de perfil');
        cy.visit('/profile', { timeout: 30000 });
        cy.wait(1000);
        
        cy.log('PASO 13: Verificando perfil');
        cy.url().should('include', '/profile');
        cy.log('TEST COMPLETADO: Flujo completo navegación exitosa');
    });
});
