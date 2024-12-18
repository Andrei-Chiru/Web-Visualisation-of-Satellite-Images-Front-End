import React from 'react'
import AdvancedSelectionMenu from '../../components/AdvancedSelectionMenu'

describe('<AdvancedSelectionMenu />', () => {
  beforeEach(() => {
    // Rebder the menu
    cy.viewport(1024, 768);
    cy.mount(<AdvancedSelectionMenu />)
  });

  it('Check for the main popup container with correct structure and initial styles', () => {
    cy.get('.fixed.inset-0.flex.justify-center.items-center')
      .should('exist')
      .and('have.css', 'position', 'fixed')
      .and('have.css', 'top', '0px')
      .and('have.css', 'right', '0px')
      .and('have.css', 'bottom', '0px')
      .and('have.css', 'left', '0px')
      .and('have.css', 'display', 'flex')
      .and('have.css', 'justify-content', 'center')
      .and('have.css', 'align-items', 'center');
  });

  it('Check for the inner popup container with correct structure and initial styles',()=>{
    cy.get('#advanced-selection-pop-up')
      .should('exist')
      .and('have.class', 'bg-gray-900')
      .and('have.class', 'p-6')
      .and('have.class', 'rounded-lg')
      .and('have.class', 'w-96');
  });

  it('Check for the title with correct structure and initial styles',()=>{
    cy.get('#advanced-selection-pop-up h2')
      .should('exist')
      .and('have.class', 'text-white')
      .and('have.class', 'text-lg')
      .and('contain.text', 'Advanced selection');
  });

  it('Check for the close button with correct structure and initial styles',()=>{
    cy.get('#close-pop-up')
      .should('exist')
      .and('have.class', 'text-white')
      .and('contain.text', '✕');
  });

  it('Check for the period inputs with correct structure and initial styles',()=>{
    cy.get('#advanced-selection-pop-up input[type="date"]')
      .should('have.length', 2) 
      .each(($input) => {
        expect($input).to.have.attr('type', 'date');
        expect($input).to.have.class('bg-gray-700');
        expect($input).to.have.class('text-white');
        expect($input).to.have.class('p-2');
        expect($input).to.have.class('rounded');
      });
  });

  it('Check for the average index threshold section with correct structure and initial styles',()=>{
    cy.get('#advanced-selection-pop-up input[type="number"]')
      .should('exist')
      .and('have.class', 'bg-gray-700')
      .and('have.class', 'text-white')
      .and('have.class', 'text-center')
      .and('have.class', 'px-4')
      .and('have.class', 'py-2');
  });
  
  it('should have default styles when band is not selected', () => {
    // Assuming 'B01' is a band that is initially not selected
    cy.get(`button.p-2.rounded:not(.bg-green-500)`) // Check for buttons that are not selected
      .should('exist')
      .and('have.class', 'bg-gray-700')
      .and('have.class', 'text-white');
  });

  it('should have selected styles when band is selected', () => {
    // Assuming 'B01' is a band that is selected
    cy.get(`#B01`).click();
    cy.get(`button.p-2.rounded.bg-green-500.text-white`) // Check for buttons that are selected
      .should('exist')
      .and('have.class', 'p-2')
      .and('have.class', 'rounded')
      .and('have.class', 'bg-green-500')
      .and('have.class', 'text-white');
  });
    
  it('Check for the proceed button with correct structure and initial styles',()=>{
    cy.get('#proceed-button')
      .should('exist')
      .and('have.class', 'bg-gray-700')
      .and('have.class', 'text-white')
      .and('have.class', 'px-4')
      .and('have.class', 'py-2')
      .and('have.class', 'rounded')
      .and('have.css', 'width', '336px')
      .and('contain.text', 'Proceed');
  });
})