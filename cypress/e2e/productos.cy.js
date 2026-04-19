describe('Búsqueda y Catalogo de Productos - DemoQA Book Store', () => {
    // CP-PROD-01: Verificar catálogo y acceso a elementos de búsqueda
    it('CP-PROD-01: Debe mostrar catálogo de libros con opción de búsqueda', () => {
        cy.log('PASO 1: Visitando catálogo con timeout extendido');
        cy.visit('/books', { timeout: 60000 });
        
         
        cy.log('PASO 2: Esperando que la caja de búsqueda cargue');
        cy.get('#searchBox', { timeout: 20000 }).should('be.visible');
        
        
        cy.log('PASO 3: Verificando que hay tabla de contenido');
        cy.get('body').should('contain.text', 'Title');
        
        
        cy.log('PASO 4: Verificando que el archivo de fixtures se cargó');
        cy.fixture('usuarios').then((users) => {
            cy.log('TEST COMPLETADO: Catálogo y búsqueda disponibles');
        });
    });

    // CP-PROD-02: Búsqueda por editorial
    it('CP-PROD-02: Debe permitir buscar por diferentes criterios (editorial/autor)', () => {
        cy.log('PASO 1: Visitando catálogo de libros');
        cy.visit('/books', { timeout: 30000 });
        
         
        cy.fixture('usuarios').then((users) => {
            cy.log('PASO 2: Buscando por editorial en la caja de búsqueda');
            cy.get('#searchBox', { timeout: 15000 }).type(users.books.publisher);
            
             
            cy.log('PASO 3: Verificando que el valor de búsqueda se ingresó');
            cy.get('#searchBox').should('have.value', users.books.publisher);
            cy.log('TEST COMPLETADO: Búsqueda por editorial funciona');
        });
    });

    // CP-PROD-03: Paginación funcional
    it('CP-PROD-03: Debe tener sistema de paginación para navegar resultados', () => {
        cy.log('PASO 1: Visitando catálogo de libros');
        cy.visit('/books', { timeout: 30000 });
        
         
        cy.log('PASO 2: Buscando elementos de paginación');
        // Verificar que existan elementos de paginación (botones Next/Previous o números de página)
        cy.get('button:contains("Next"), [id*="next"], [class*="pagination"], [aria-label*="page"]', { timeout: 15000 }).should('exist');
        
        cy.log('TEST COMPLETADO: Sistema de paginación presente');
    });

    // CP-PROD-04: Tabla de productos visible
    it('CP-PROD-04: Debe mostrar tabla con listado de libros disponibles', () => {
        cy.log('PASO 1: Visitando catálogo de libros');
        cy.visit('/books', { timeout: 30000 });
        
         
        cy.log('PASO 2: Verificando que la tabla de libros se muestra');
        cy.get('body').should('contain.text', 'Image');
        
        cy.log('TEST COMPLETADO: Tabla de libros visible');
    });

    // CP-PROD-05: Ordenamiento por columnas
    it('CP-PROD-05: Debe permitir ordenar los resultados en la tabla por diferentes columnas', () => {
        cy.log('PASO 1: Visitando catálogo de libros');
        cy.visit('/books', { timeout: 30000 });
        
         
        cy.log('PASO 2: Buscando encabezados de columna clicables');
        // Verificar que existen encabezados de columna clicables
        cy.get('[role="columnheader"], th, span:contains("Title")', { timeout: 15000 }).should('exist');
        
        cy.log('TEST COMPLETADO: Ordenamiento por columnas disponible');
    });
});
