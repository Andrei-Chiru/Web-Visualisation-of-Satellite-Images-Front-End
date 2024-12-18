import React from 'react'
import Information from '../../components/Information'

describe('<Information />', () => {
  beforeEach(() => {
    // Render Information on screen
    cy.mount(<Information />)
  });

  it('checking the structure of Information.jsx', () => {
    cy.get('.text-white')
    .should('be.visible')
    .and('exist')
    .within(()=>{
      cy.get('#column-containing-tab')
      .should('be.visible')
      .and('exist')
      .within(()=>{
        cy.get('#information-text')
        .should('exist')
        .and('be.visible')
      })
      cy.get('.rowed')
      .should('exist')
      .and('be.visible')
      .within(()=>{
        cy.get('.columned')
        .should('exist')
        .and('be.visible')
        .within(()=>{
          cy.get('#image-date')
          .should('exist')
          .and('be.visible')
          //label is tested at
          //image-date label is visible and configured correctly

          cy.get('#cloud-coverage')
          .should('exist')
          .and('be.visible')

          cy.get('#button-div')
          .should('exist')
          .and('be.visible')
          .within(()=>{
            cy.get('#advanced_selection_button')
            .should('exist')
            .and('be.visible')
          })
        })
      })
    })
  })

  it('column-containing tab is visible configured correctly',()=>{
    cy.get('#column-containing-tab')
      .should('exist')
      .and('be.visible')
      .and('have.class', 'flex')
      .and('have.class', 'justify-center')
      .and('have.css', 'display', 'flex')
      .and('have.css', 'justify-content', 'center')
  })

  it('information-text is visible and configured correctly',()=>{
    cy.get('#information-text')
        .should('exist')
        .and('be.visible')
        .and('have.class', 'text-lg')
        .and('have.class', 'mb-2')
        .and('have.class', 'text-center')
        .and('have.css', 'font-size', '18px') // text-lg equivalent
        .and('have.css', 'margin-bottom', '8px') // mb-2 equivalent
        .and('have.css', 'text-align', 'center')
        .and('contain.text', 'Information');
  })

  it('rowed is visible and configured correctly',()=>{
    cy.get('.rowed')
      .should('exist')
      .and('be.visible')
      .and('have.css', 'flex-direction', 'row')
      .and('have.css', 'background-color', 'rgb(55, 65, 81)') // CSS color converted to RGB
      .and('have.css', 'padding', '16px') // 1rem = 16px
      .and('have.css', 'border-radius', '8px') // 0.5rem = 8px
      .and('have.css', 'height', '176px') // 11rem = 176px
      .and('have.css', 'display', 'flex')
      .and('have.css', 'justify-content', 'center');
  })

  it('columned is visible and configured correctly',()=>{
    cy.get('.columned')
      .should('exist')
      .and('be.visible')
      .and('have.css', 'flex-direction', 'column')
      .and('have.css', 'display', 'flex')
      .and('have.css', 'align-items', 'center')
      .and('have.css', 'justify-content', 'center');
  })

  it('image-date is visible and configured correctly',()=>{
    cy.get('#image-date')
      .should('exist')
      .and('be.visible')
      .and('have.class', 'mb-2')
      .and('have.class', 'flex')
      .and('have.class', 'items-center')
      .and('have.class', 'justify-center')
      .and('have.css', 'margin-bottom', '8px') // mb-2 equivalent
      .and('have.css', 'display', 'flex')
      .and('have.css', 'align-items', 'center')
      .and('have.css', 'justify-content', 'center');
  })

  it('image-date label is visible and configured correctly',()=>{
    cy.get('#image-date label')
      .should('exist')
      .and('be.visible')
      .and('contain.text', 'Date of the Image: 08.04.2024')
      .and('have.class', 'mr-2')
      .and('have.css', 'margin-right', '8px'); // mr-2 equivalent
  })

  it('cloud-coverage is visible and configured correctly',()=>{
    cy.get('#cloud-coverage')
      .should('exist')
      .and('be.visible')
      .and('have.class', 'mb-2')
      .and('have.class', 'flex')
      .and('have.class', 'items-center')
      .and('have.class', 'justify-center')
      .and('have.css', 'margin-bottom', '8px') // mb-2 equivalent
      .and('have.css', 'display', 'flex')
      .and('have.css', 'align-items', 'center')
      .and('have.css', 'justify-content', 'center');
  })

  it('cloud-coverage label is visible and configured correctly',()=>{
    cy.get('#cloud-coverage label')
      .should('exist')
      .and('be.visible')
      .and('contain.text', 'Cloud Coverage: 0%')
      .and('have.class', 'mr-2')
      .and('have.css', 'margin-right', '8px'); // mr-2 equivalent
  })

  it('button-div is visible and configured correctly',()=>{
    cy.get('#button-div')
      .should('exist').and('be.visible')
      .should('have.class', 'flex')
      .and('have.class', 'justify-center')
      .and('have.class', 'space-x-2')
      .and('have.css', 'display', 'flex')
      .and('have.css', 'justify-content', 'center');
  })

  it('advanced_selection_button is visible and configured correctly',()=>{
    cy.get('#advanced_selection_button')
      .should('exist').and('be.visible')
      .and('have.css', 'background-color', 'rgb(255, 255, 255)') 
      .and('have.css', 'color', 'rgb(45, 55, 72)') 
      .and('have.css', 'padding-left', '16px') 
      .and('have.css', 'padding-right', '16px')
      .and('have.css', 'padding-top', '8px')
      .and('have.css', 'padding-bottom', '8px') 
      .and('have.css', 'border-radius', '4px')
      .and('have.class', 'button')
      .and('contain.text', 'Advanced Selection');
  })
})