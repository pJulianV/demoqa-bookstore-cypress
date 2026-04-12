// cypress/support/commands.js

Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login', { timeout: 30000 });
  cy.get('#userName', { timeout: 10000 }).clear().type(username, { delay: 50 });
  cy.get('#password').clear().type(password, { delay: 50 });
  cy.get('#login').click();
  // Esperar a que cualquiera de estos elementos indique que estamos autenticados
  cy.get('button, a', { timeout: 30000 }).should('exist');
});

// Comando para limpiar libros si es necesario (limpieza de colección)
Cypress.Commands.add('deleteAllBooks', () => {
  cy.visit('/profile');
  cy.get('body').then(($body) => {
    if ($body.find('.text-right.button.di').length > 0) {
      cy.get('.text-right.button.di').contains('Delete All Books').click();
      cy.get('#closeSmallModal-ok').click();
    }
  });
});
