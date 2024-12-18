describe('Starting page', () => {

  // Visit the map page before each test
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('checking the structure of the page',()=>{

    cy.get('#root')
    .should('exist')
    .and('be.visible')
    .within(()=>{
      cy.get('#background-image').should('exist')
      .within(()=>{
        cy.get('#title-container').should('exist')
        .within(()=>{
          cy.get('#center-title').should('exist')
          cy.get('#get-started-button').should('exist')
        })
      })
    })
    
  })

  it('the background is what it is supposed to be',()=>{
    cy.get('#background-image').should('be.visible').and('exist')
    .and('have.class','min-h-screen')
    .and('have.class','bg-cover')
    .and('have.class','bg-center')
    .and('have.class','bg-no-repeat')
    .and('have.class','relative')
    .invoke('css', 'background-image').should('include', '/src/assets/onboard.png');
  })

  it('the title container is there',()=>{
    cy.get('#title-container').should('be.visible').and('exist')
    .and('have.class','absolute')
    .and('have.class','left-0')
    .and('have.class','top-1/2')
    .and('have.class','transform')
    .and('have.class','-translate-y-1/2')
    .and('have.class','ml-16')
    .and('have.class','p-16')
  })

  it('the title is there',()=>{
    cy.get('#center-title').should('be.visible').and('exist')
    .and('have.text','Visualise Satellite Images.')
    .and('have.class','mb-8')
    .and('have.class','text-white')
    .and('have.class','text-5xl')
    .and('have.class','font-mono')
  })

  it('the button is buttoning',()=>{
    cy.get('#get-started-button').should('be.visible').and('exist').click();
    cy.url().should('equal','http://localhost:3000/map')
  })
})