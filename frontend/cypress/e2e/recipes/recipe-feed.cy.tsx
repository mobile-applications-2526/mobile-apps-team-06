describe('View Recipe', () => {
    beforeEach(() => {
        // ff inloggen voor elke test (mijn creds staan in cypress/fixtures/users.json)
        cy.fixture('users').then((users) => {
            //@ts-ignore
            cy.login(users.testUser.email, users.testUser.password);
        });
        
        // wacht tot recepten geladen zijn (custom command in cypress/support/commands.ts)
        //@ts-ignore
        cy.waitForRecipes();

        // ik heb alles wat ik test een testid gegeven in de components
    });

    it('displays a recipe on home page', () => {
        cy.get('[data-testid="recipe-card"]').should('have.length.greaterThan', 0);
    });

    it('displays recipe card with title and description', () => {
        cy.get('[data-testid="recipe-card"]').first().within(() => {
            cy.get('[data-testid="recipe-card-title"]').should('be.visible');
            cy.get('[data-testid="recipe-card-description"]').should('be.visible');
            cy.get('[data-testid="see-full-recipe-button"]').should('be.visible');
        });
    });

    it('can scroll through multiple recipes', () => {
        // Get the first recipe title
        cy.get('[data-testid="recipe-card"]')
            .first()
            .find('[data-testid="recipe-card-title"]')
            .invoke('text')
            .then((firstTitle) => {
                // scroll naar beneden
                cy.get('[data-testid="recipe-feed"]').scrollTo('bottom', { duration: 500 });

                // ff wait voor die animatie
                cy.wait(500);

                // kijken of het nieuwe recipe is
                cy.get('[data-testid="recipe-card"]').should('exist');
            });
    });

    it('loads more recipes when scrolling to the end', () => {
        // hoeveel recipes zijn in list
        cy.get('[data-testid="recipe-card"]').its('length').then((initialCount) => {
            // Scrollen naar beneden
            cy.get('[data-testid="recipe-feed"]').scrollTo('bottom', { duration: 1000 });

            cy.wait(2000);

            cy.get('[data-testid="recipe-card"]').its('length').should('be.gte', initialCount);
        });
    });
});