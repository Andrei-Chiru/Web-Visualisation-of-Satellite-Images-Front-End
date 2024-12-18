import React from 'react';
import Logo from '../../components/Logo.jsx';
import {mount} from "cypress/react18";

describe('<Logo />', () => {
  it('renders', () => {
    mount(<Logo />)
  });

  beforeEach(() => {
    mount(<Logo />)
  });

  it('should render the svg', () => {
    cy.get('svg').should('exist');
  });

  it('should have correct dimensions', () => {
    cy.get('svg')
        .should('have.attr', 'width', '25')
        .and('have.attr', 'height', '9');
  });

  it('should contain correct paths', () => {
    cy.get('svg path').should('have.length', 3);

    cy.get('svg path').eq(0)
        .should('have.attr', 'stroke', 'url(#paint0_linear_11_21)')
        .and('have.attr', 'stroke-width', '4')
        .and('have.attr', 'stroke-linecap', 'round');

    cy.get('svg path').eq(1)
        .should('have.attr', 'stroke', 'url(#paint1_linear_11_21)')
        .and('have.attr', 'stroke-width', '4')
        .and('have.attr', 'stroke-linecap', 'round');

    cy.get('svg path').eq(2)
        .should('have.attr', 'stroke', 'url(#paint2_linear_11_21)')
        .and('have.attr', 'stroke-width', '4')
        .and('have.attr', 'stroke-linecap', 'round');
  });
});