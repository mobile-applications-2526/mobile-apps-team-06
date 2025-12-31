describe('Signup', () => {
    it('signs up with valid credentials', () => {
        const timestamp = Date.now();
        const email = `testsignup${timestamp}@example.com`;
        const username = `testsignupuser${timestamp}`;

        cy.visit('/signup');

        cy.get('[data-testid="usernameInput"]').click();
        cy.get('[data-testid="usernameInput"]').type(username);

        cy.get('[data-testid="emailInput"]').click();
        cy.get('[data-testid="emailInput"]').type(email);

        cy.get('[data-testid="passwordInput"]').click();
        cy.get('[data-testid="passwordInput"]').type('testpass123');

        cy.get('[data-testid="signupButton"]').click();
        cy.url().should('not.include', '/signup');
    });
});