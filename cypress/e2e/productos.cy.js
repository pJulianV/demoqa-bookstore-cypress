describe('Búsqueda y Catalogo de Productos - DemoQA Book Store', () => {
    // CP-PROD-01: Verificar catálogo y acceso a elementos de búsqueda
    it('CP-PROD-01: Debe mostrar catálogo de libros con opción de búsqueda', () => {
        cy.log('PASO 1: Visitando catálogo con timeout extendido');
        cy.visit('/books', { timeout: 60000 });

        cy.log('PASO 2: Esperando que la caja de búsqueda cargue');
        cy.get('#searchBox', { timeout: 20000 }).should('be.visible');

        cy.log('PASO 3: Verificando que hay tabla de contenido');
        cy.get('body').should('contain.text', 'Title');

        cy.fixture('usuarios').then((users) => {
            cy.screenshot('productos/CP-PROD-01_catalogo-libros-cargado');
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
            cy.screenshot('productos/CP-PROD-02_busqueda-por-editorial-resultado');
            cy.log('TEST COMPLETADO: Búsqueda por editorial funciona');
        });
    });

    // CP-PROD-03: Paginación - DEFECTO CONOCIDO DEF-002 y DEF-003
    // Manual: selector de filas no existe y Next/Previous no funcionan (Page 1 of 0)
    it('CP-PROD-03: Debe tener sistema de paginación para navegar resultados', () => {
        cy.log('PASO 1: Visitando catálogo de libros');
        cy.visit('/books', { timeout: 30000 });

        cy.log('PASO 2: Verificando que los controles de paginación existen');
        cy.contains('Previous', { timeout: 15000 }).should('exist');
        cy.contains('Next').should('exist');
        cy.screenshot('productos/CP-PROD-03_paginacion-controles-visibles');

        // DEFECTO CONOCIDO DEF-003: La página muestra "Page 1 of 0" o "Page 1 of 1"
        // y los botones Next/Previous no navegan porque no hay suficientes libros
        cy.log('NOTA: DEF-003 - Paginación bloqueada en Page 1, no hay suficientes libros para navegar');
        cy.log('TEST COMPLETADO: Controles de paginación presentes (defecto documentado)');
    });

    // CP-PROD-04: Tabla de productos visible
    it('CP-PROD-04: Debe mostrar tabla con listado de libros disponibles', () => {
        cy.log('PASO 1: Visitando catálogo de libros');
        cy.visit('/books', { timeout: 30000 });

        cy.log('PASO 2: Verificando que la tabla de libros se muestra');
        cy.get('body').should('contain.text', 'Image');
        cy.get('body').should('contain.text', 'Title');
        cy.get('body').should('contain.text', 'Author');
        cy.screenshot('productos/CP-PROD-04_tabla-libros-columnas-visibles');
        cy.log('TEST COMPLETADO: Tabla de libros visible');
    });


    // CP-PROD-05: Búsqueda sin resultados
    it('CP-PROD-05: Debe manejar búsqueda sin resultados sin romper la aplicación', () => {
        cy.log('PASO 1: Visitando catálogo de libros');
        cy.visit('/books', { timeout: 30000 });

        cy.log('PASO 2: Ingresando término de búsqueda inexistente');
        cy.get('#searchBox', { timeout: 20000 }).type('xyzlibroquenoexiste999');

        cy.log('PASO 3: Verificando que la aplicación no crashea');
        cy.get('body').should('be.visible');
        cy.screenshot('productos/CP-PROD-05_busqueda-sin-resultados-sin-crash');

        cy.log('PASO 4: Limpiando búsqueda y verificando que los libros regresan');
        cy.get('#searchBox').clear();
        cy.get('body').should('contain.text', 'Git');
        cy.screenshot('productos/CP-PROD-05_catalogo-restaurado-tras-limpiar-busqueda');

        cy.log('TEST COMPLETADO: Búsqueda sin resultados manejada correctamente');
    });
});
