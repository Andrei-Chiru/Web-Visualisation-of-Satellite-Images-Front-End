import React from 'react'
import Header from '../../components/Header'

describe('<Header />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Header />)
    cy.get('.header-container').should('be.visible')
    .and('have.css', 'background-color', 'rgb(26, 32, 44)') // Equivalent to #1a202c
    .and('have.css', 'padding', '16px')
    .and('have.css', 'display', 'flex')
    .and('have.css', 'justify-content', 'center')
    .and('have.css', 'align-items', 'center');

    cy.get('h1').should('be.visible')
    .and('have.class','header-title')
    .and('have.text','Satellite Images of Bulgaria')
    .and('have.css', 'color', 'rgb(255, 255, 255)') // Equivalent to white
    .and('have.css', 'font-size', '24px') // Equivalent to 1.5rem
    .and('have.css', 'font-weight', '600') // Equivalent to font-semibold
    .and('have.css', 'font-family').and('match', /Arial/) // Checking if the font-family includes 'Arial'
  })
})