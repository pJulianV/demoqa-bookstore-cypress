// commands.js - Comandos personalizados DemoQA Book Store

// Registra el usuario via API (sin CAPTCHA) y luego hace login por UI
Cypress.Commands.add('registrarYLogin', () => {
    const usuario = {
        userName: 'testcypress2026',
        password: 'Test@Cypress123',
        firstName: 'Test',
        lastName: 'Cypress'
    };

    // Intentar registrar el usuario via API (si ya existe, simplemente continúa)
    cy.request({
        method: 'POST',
        url: 'https://demoqa.com/Account/v1/User',
        body: {
            userName: usuario.userName,
            password: usuario.password
        },
        failOnStatusCode: false // Si ya existe (406), no falla el test
    }).then((response) => {
        cy.log(`Registro: status ${response.status} - ${response.status === 201 ? 'Usuario creado' : 'Usuario ya existía'}`);
    });

    // Hacer login por UI
    cy.visit('/login', { timeout: 30000 });
    cy.get('#userName', { timeout: 15000 }).should('be.visible').clear().type(usuario.userName);
    cy.get('#password').clear().type(usuario.password);
    cy.get('#login').click();

    // Esperar redirección al perfil
    cy.url({ timeout: 15000 }).should('include', '/profile');
    cy.log('LOGIN EXITOSO: Sesión iniciada correctamente');
});
