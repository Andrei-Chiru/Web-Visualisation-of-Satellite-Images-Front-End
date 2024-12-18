import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import Onboard from '../../pages/Onboard.jsx';
import {mount} from "cypress/react18";
import '../../index.css';


describe('<Onboard />', () => {
  beforeEach(() => {
    cy.viewport(1024, 768);
    mount(
        <BrowserRouter>      
            <Onboard />
        </BrowserRouter>
    );
  });

  it('should render the component correctly', () => {
    cy.get('.min-h-screen').should('exist');
    cy.get('.text-5xl').should('contain.text', 'Visualize Satellite Images').and('have.css', 'color', 'rgb(255, 255, 255)');
    cy.get('button').should('be.visible').and('contain.text', 'Get started!');
  });

  it('should render the component css and background image', () => {
    cy.get('.min-h-screen').should('have.css', 'background-image')
        .and('include', 'onboard.png');
  });

// // We no longer use a navbar
//   it('should render the Navbar component', () => {
//     cy.get('nav').should('exist').and('be.visible');
//   });

  it('should display the main text correctly', () => {
    cy.contains('Visualize Satellite Images.').should('exist')
        .and('have.class', 'text-white')
        .and('have.class', 'text-5xl')
        .and('have.class', 'font-mono');
  });

  it('should display the RoundButton component and styles', () => {
    cy.contains('button', 'Get started!').should('exist')
        .and('have.class', 'rounded-full')
        .and('have.class', 'font-bold')
        .and('have.class', 'bg-white');
  });
});