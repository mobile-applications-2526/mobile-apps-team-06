describe('Recipe Card Interactions', () => {
    beforeEach(() => {
        cy.fixture('users').then((users) => {
            //@ts-ignore
            cy.login(users.testUser.email, users.testUser.password);
        });
        //@ts-ignore
        cy.waitForRecipes();
    });

    it('displays recipe information correctly', () => {
        cy.get('[data-testid="recipe-card"]').first().within(() => {
            cy.get('[data-testid="recipe-card-title"]')
                .should('be.visible')
                .and('not.be.empty');

            cy.get('[data-testid="recipe-card-description"]')
                .should('be.visible')
                .and('not.be.empty');
        });
    });
   it('can toggle favorite on a recipe', () => {
        cy.get('[data-testid="recipe-card"]').first().within(() => {
            cy.get('[data-testid="favorite-button"]').click({ force: true });
            cy.wait(1000);
            cy.get('[data-testid="favorite-button"]').click({ force: true });
            cy.wait(1000);
        });
    }); 
   

    it('navigates to single-recipe when "See full recipe" is clicked', () => {
        cy.get('[data-testid="recipe-card"]').first().within(() => {
            cy.get('[data-testid="see-full-recipe-button"]').click({ force: true });
        });

        cy.url().should('include', '/recipe/');

        cy.get('[data-testid="single-recipe"]').should('exist');
    });
});