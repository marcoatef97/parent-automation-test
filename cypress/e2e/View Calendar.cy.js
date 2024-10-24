describe('Parent Portal Test Suite', () => {
  const login = () => {
    cy.viewport(1920, 1080);
    cy.visit('https://portal-staging.parent.cloud/login', { failOnStatusCode: false });
    
    cy.get('#txtEmail').type('demo@parent.cloud');
    cy.get('#txtPassword').type('12345678');
    cy.get('#submitBtn').click();

    cy.intercept('GET', '**/api/v2/user/view').as('getUserData');
    cy.wait(5000); 

    cy.contains('ParentCCompany').should('be.visible');
  };

  beforeEach(() => {
    cy.session('user-session', login);
  });

  it('Logs in and checks the account name after the page fully loads', () => {
    cy.viewport(1920, 1080);
    cy.visit('https://portal-staging.parent.cloud/institute', { failOnStatusCode: false });
    cy.wait(5000); 

    cy.contains('ParentCCompany').should('be.visible');
  });

  it('Selects "Demo company Canada" and verifies the header', () => {
    cy.viewport(1920, 1080);
    cy.visit('https://portal-staging.parent.cloud/institute', { failOnStatusCode: false });
    cy.wait(5000); 

    
    cy.get('div.institution__address', { timeout: 10000 }).contains('test Canada Egypt').click();

    cy.contains('Demo company Canada').should('be.visible');
  });

  it('Clicks on Calendar tab and verifies the page is opened', () => {
    cy.viewport(1920, 1080);
    cy.visit('https://portal-staging.parent.cloud/overview', { failOnStatusCode: false });
    cy.wait(5000); 
    cy.get('div.institution__address', { timeout: 10000 }).contains('test Canada Egypt').click();
    cy.get('#calendarTab').click();

    cy.url().should('include', '/calendar');

    cy.contains('All Calendar').should('be.visible');
  });

});



Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});