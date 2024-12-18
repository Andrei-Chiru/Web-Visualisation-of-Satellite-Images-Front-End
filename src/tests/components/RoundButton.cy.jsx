import React from 'react';
import { mount } from 'cypress/react';
import RoundButton from '../../components/RoundButton.jsx';

describe('<RoundButton />', () => {
    beforeEach(() => {
        cy.viewport(1024, 768);
    });

    it('should render the component correctly', () => {
        const buttonText = 'Test!';
        mount(<RoundButton text={buttonText} color='white' hoverColor='gray-200' textColor='black' />);

        cy.get('button').should('be.visible').and('contain.text', buttonText);
    });

    it('should apply correct styles to the component', () => {
        const buttonText = 'Test!';
        mount(<RoundButton text={buttonText} color='white' hoverColor='gray-200' textColor='black' />);

        cy.get('button')
            .should('have.class', 'bg-white')
            .and('have.class', 'hover:bg-gray-200')
            .and('have.class', 'text-black');

        cy.get('button')
            .should('have.class', 'font-bold')
            .and('have.class', 'rounded-full');

        cy.get('button')
            .should('have.class', 'py-2')
            .and('have.class', 'px-4');
    });

    it('should ensure the button is clickable', () => {
        const buttonText = 'Test!';
        const onClick = cy.stub().as('onClickHandler');
        mount(<RoundButton text={buttonText} color='white' hoverColor='gray-200' textColor='black' onClick={onClick} />);

        cy.get('button').click();
        cy.get('@onClickHandler').should('have.been.calledOnce');
    });
});
