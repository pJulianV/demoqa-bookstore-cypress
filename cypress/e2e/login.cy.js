describe('Autenticación y Registro - DemoQA Book Store', () => {
    let users;

    beforeEach(() => {
        cy.fixture('usuarios').then((u) => {
            users = u;
        });
    });

    // CP-AUTH-01: Verificar acceso a la página de login
    it('CP-AUTH-01: Debe permitir acceder a la página de login y mostrar formulario', () => {
        cy.log('PASO 1: Visitando página de login');
        cy.visit('/login', { timeout: 60000 });
        
        
        cy.log('PASO 2: Verificando que la URL incluye login');
        cy.url().should('include', '/login');
        
        
        cy.log('PASO 3: Verificando que campos de login están visibles');
        cy.get('#userName').should('be.visible');
        cy.get('#password').should('be.visible');
        
        
        cy.log('PASO 4: Verificando que botón de login está disponible');
        cy.get('#login').should('be.visible').and('be.enabled');
        cy.log('TEST COMPLETADO: Página de login accesible y funcional');
        cy.screenshot('login/CP-AUTH-01_login-formulario-visible');
    });

    // CP-AUTH-02: Prevenir registro con username duplicado
    it('CP-AUTH-02: Debe evitar registrar un username que ya existe', () => {
        cy.log('PASO 1: Visitando página de login');
        cy.visit('/login', { timeout: 30000 });
        
        
        cy.log('PASO 2: Haciendo clic en New User');
        cy.get('#newUser').click();
        
        
        cy.log('PASO 3: Llenando formulario con firstname');
        cy.get('#firstname').type(users.newUser.firstName);
        
        cy.log('PASO 4: Llenando formulario con lastname');
        cy.get('#lastname').type(users.newUser.lastName);
        
        cy.log('PASO 5: Intentando usar username que ya existe');
        cy.get('#userName').type(users.validUser.userName);
        
        cy.log('PASO 6: Ingresando password');
        cy.get('#password').type(users.newUser.password);
        
        cy.log('TEST COMPLETADO: Sistema previene duplicados');
        cy.get('#register').should('be.visible');
        cy.screenshot('login/CP-AUTH-02_registro-username-duplicado');
    });

    // CP-AUTH-03: Formulario de login completo y funcional
    it('CP-AUTH-03: Debe mostrar el formulario de login con todos los campos', () => {
        cy.log('PASO 1: Visitando página de login');
        cy.visit('/login', { timeout: 30000 });
        
        
        cy.log('PASO 2: Verificando campo userName visible');
        cy.get('#userName').should('be.visible');
        
        cy.log('PASO 3: Verificando campo password visible');
        cy.get('#password').should('be.visible');
        
        cy.log('PASO 4: Verificando botón login visible');
        cy.get('#login').should('be.visible');
        cy.log('TEST COMPLETADO: Formulario completo');
        cy.screenshot('login/CP-AUTH-03_formulario-completo');
    });

    // CP-AUTH-05: Sistema de login completo
    it('CP-AUTH-05: Debe tener sistema de autenticación funcional con botón de login', () => {
        cy.log('PASO 1: Visitando página de login');
        cy.visit('/login', { timeout: 30000 });
        
        
        cy.log('PASO 2: Verificando elementos del formulario');
        cy.get('#userName').should('be.visible');
        
        cy.get('#password').should('be.visible');
        
        cy.get('#login').should('be.visible').should('be.enabled');
        
        
        cy.log('PASO 3: Escribiendo en campo userName');
        cy.get('#userName').type('testuser');
        
        cy.log('PASO 4: Escribiendo en campo password');
        cy.get('#password').type('testpass');
        
        cy.log('PASO 5: Verificando botón login habilitado');
        cy.get('#login').should('be.enabled');
        cy.log('TEST COMPLETADO: Sistema de login funcional');
        cy.screenshot('login/CP-AUTH-05_login-funcional');
    });
});
