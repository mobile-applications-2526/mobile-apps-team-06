describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('logs in with jorrit@email.com and jorrit123', () => {
    cy.intercept('POST', '**/users/login', {
      statusCode: 200,
      body: {
        token: 'fake-token',
        username: 'jorrit',
        role: 'USER',
      },
    }).as('loginRequest');

    cy.get('[data-testid="login-email"]').type('jorrit@email.com');
    cy.get('[data-testid="login-password"]').type('jorrit123');
    cy.get('[data-testid="login-submit"]').click();

    cy.wait('@loginRequest');

    // ✅ Assert navigation happened
    cy.url().should('eq', Cypress.config().baseUrl + '/');

    // ✅ Assert auth state stored (Expo Web → localStorage)
    cy.window().then(win => {
      const stored = win.localStorage.getItem('loggedInUser');
      expect(stored).to.contain('jorrit');
    });
  });
});