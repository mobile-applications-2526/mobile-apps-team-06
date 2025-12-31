describe('Login', () => {
  it('logs in with valid credentials', () => {
    cy.visit('/login');

    cy.get('[data-testid="emailInput"]').click();
    cy.get('[data-testid="emailInput"]').type('jorrit@email.com');

    cy.get('[data-testid="passwordInput"]').click();
    cy.get('[data-testid="passwordInput"]').type('jorrit123');

    cy.get('[data-testid="loginButton"]').click();

    cy.url().should('not.include', '/login');
  });
});