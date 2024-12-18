import React from 'react';
import AlgorithmSelector from '../../components/AlgorithmSelector.jsx';
import { algorithms } from '../../components/Map.jsx';

const algorithmSelectorId = 'algorithmSelector';
const algorithmSelectorType = 'div';
const algorithmSelectorStyles = ['text-white'];

const titleContainerId = 'titleContainer';
const titleContainerType = 'div';
const titleContainerStyles = ['flex', 'justify-center'];

const titleId = 'title';
const titleType = 'h2';
const titleStyles = ['text-lg', 'mb-2'];

const selectContainerId = 'selectContainer';
const selectContainerType = 'div';
const selectContainerStyles = ['bg-gray-700', 'p-4', 'rounded-lg', 'h-44'];

const selectId = 'select';
const selectType = 'select';
const selectStyles = ['bg-white', 'text-gray-800', 'p-2', 'rounded', 'w-full'];

const changeSpy = 'onChangeSpy';

const alg0 = Object.keys(algorithms)[0];
const alg0Id = algorithms[alg0];
const alg1 = Object.keys(algorithms)[1];
const alg1Id = algorithms[alg1];
const alg2 = Object.keys(algorithms)[2];
const alg2Id = algorithms[alg2];
const alg3 = Object.keys(algorithms)[3];
const alg3Id = algorithms[alg3];

const initialAlgorithm = alg0;

describe('<AlgorithmSelector />', () => {

    function checkStyle(id, type, style) {
        cy.get(`${type}[id=${id}]`)
            .should('have.class', style);
    }

    function checkStyles(id, type, styles) {
        styles.forEach((style) => {
            checkStyle(id, type, style);
        });
    }

    it('renders without onAlgorithmChange', () => {
        cy.mount(<AlgorithmSelector />);
    });

    it('renders with onAlgorithmChange', () => {
        const onChangeSpy = cy.spy().as(changeSpy);
        cy.mount(<AlgorithmSelector onAlgorithmChange={onChangeSpy} />);
    });


    beforeEach(() => {
        const onChangeSpy = cy.spy().as(changeSpy);
        cy.mount(<AlgorithmSelector onAlgorithmChange={onChangeSpy} />);
    });


    it('should apply correct styles to the parent', () => {
        checkStyles(algorithmSelectorId, algorithmSelectorType, algorithmSelectorStyles);
    });


    it('should apply correct styles to the container around the title', () => {
        checkStyles(titleContainerId, titleContainerType, titleContainerStyles);
    });


    it('should apply correct styles to the title', () => {
        checkStyles(titleId, titleType, titleStyles);
    });


    it('should apply correct styles to the container around the selector container', () => {
        checkStyles(selectContainerId, selectContainerType, selectContainerStyles);
    });


    it('should apply correct styles to the select container', () => {
        checkStyles(selectId, selectType, selectStyles);
    });


    it('should default to the initial algorithm', () => {
        cy.get(`select[id=${selectId}] option:selected`)
            .invoke('text')
            .should('eq', initialAlgorithm);
    });


    it('should display alg0 correctly', () => {
        cy.get(`select[id=${selectId}]`)
            .select(alg0)
            .should('have.value', alg0);
            
        cy.get(`select[id=${selectId}]`)
            .children()
            .first()
            .should('have.value', alg0);

        it('should call the onAlgorithmChange with alg0Id when reselecting alg0', () => {
            cy.get(`select[id=${selectId}]`)
                .select(alg1)
                .select(alg0);
            cy.get(`@${changeSpy}`)
                .should('have.been.calledWith', alg0Id);
        })
    });


    it('should display alg1 correctly', () => {
        cy.get(`select[id=${selectId}]`)
            .select(alg1)
            .should('have.value', alg1);

        cy.get(`select[id=${selectId}]`)
            .children()
            .first().next()
            .should('have.value', alg1);

        cy.get(`select[id=${selectId}]`)
            .select(alg1);
        cy.get(`@${changeSpy}`)
            .should('have.been.calledWith', alg1Id);
    });


    it('should display alg2 as value for option alg2', () => {
        cy.get(`select[id=${selectId}]`)
            .select(alg2)
            .should('have.value', alg2);

        cy.get(`select[id=${selectId}]`)
            .children()
            .first().next().next()
            .should('have.value', alg2);

        cy.get(`select[id=${selectId}]`)
            .select(alg2);
        cy.get(`@${changeSpy}`)
            .should('have.been.calledWith', alg2Id);
    });


    it('should display alg3 correctly', () => {
        cy.get(`select[id=${selectId}]`)
            .select(alg3)
            .should('have.value', alg3);

        cy.get(`select[id=${selectId}]`)
            .children()
            .first().next().next().next()
            .should('have.value', alg3);

        cy.get(`select[id=${selectId}]`)
            .select(alg3);
        cy.get(`@${changeSpy}`)
            .should('have.been.calledWith', alg3Id);
    });
});