describe('Profile Interactions', () => {
    beforeEach(() => {
        cy.fixture('users').then((users) => {
            //@ts-ignore
            cy.login(users.testUser.email, users.testUser.password);
        });
        //@ts-ignore
        cy.waitForRecipes();
    });

    it('navigates to profile from homepage', () => {
        cy.wait(1000);
        cy.get('[data-testid="account-button"]').click();
        cy.wait(3000);
        cy.url().should('include', '/account')
    });
});