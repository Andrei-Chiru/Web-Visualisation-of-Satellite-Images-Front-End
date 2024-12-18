// NAVBAR DOES NOT EXIST IN COMPONENTS

// import React from 'react';
// import { mount } from 'cypress/react';
// import { Navbar } from '../../components/Navbar.jsx';

// describe('<Navbar />', () => {
//   beforeEach(() => {
//     cy.viewport(1024, 768);
//   });

//   it('should render the Navbar component correctly', () => {
//     mount(<Navbar />);

//     cy.get('nav').should('be.visible');

//     cy.get('nav button').contains('About').should('be.visible');
//     cy.get('nav button').contains('Menu').should('be.visible');
//     cy.get('nav button').contains('Gallery').should('be.visible');
//     cy.get('nav button').contains('Contact').should('be.visible');

//     cy.contains('button', 'Sign In').should('be.visible')
//         .and('have.class', 'rounded-full')
//         .and('have.class', 'font-mono')
//         .and('have.class', 'bg-white');
//   });

//   it('should ensure buttons are clickable', () => {
//     mount(<Navbar />);

//     // Check if buttons are clickable
//     cy.get('nav button').contains('About').click();
//     cy.get('nav button').contains('Menu').click();
//     cy.get('nav button').contains('Gallery').click();
//     cy.get('nav button').contains('Contact').click();
//     cy.get('button').contains('Sign In').click();
//   });
// });
