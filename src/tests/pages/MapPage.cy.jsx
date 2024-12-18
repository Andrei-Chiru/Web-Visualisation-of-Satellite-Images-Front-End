import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MapPage from '../../pages/MapPage.jsx';
import AlgorithmSelector from '../../components/AlgorithmSelector.jsx';

const algorithmControlItemId = 'algorithmControlItem';
const algorithmControlItemType = 'div';
const algorithmControlItemStyles = ["control-item"];

describe('<MapPage />', () => {

    function checkStyle(id, type, style) {
        cy.get(`${type}[id=${id}]`)
            .should('have.class', style);
    }

    function checkStyles(id, type, styles) {
        styles.forEach((style) => {
            checkStyle(id, type, style);
        });
    }

    it('renders', () => {
        cy.mount(
            <BrowserRouter>      
               <MapPage />
            </BrowserRouter>
        ); 
    });


    beforeEach(() => {
        cy.mount(
            <BrowserRouter>      
               <MapPage />
            </BrowserRouter>
        );
    });


    it('renders AlgorithmSelector', () => {
        cy.get(<AlgorithmSelector />);  
    });


    it('should apply correct styles to AlgorithmSelector parent control-item', () => {
        checkStyles(algorithmControlItemId, algorithmControlItemType, algorithmControlItemStyles);
    });


    // TODO: test map-page-container on MapPage
    // TODO: test home-button on MapPage
    // TODO: test map-container on MapPage
    // TODO: test map-component on MapPage
    // TODO: test controls-container on MapPage
    // TODO: test informationControlItem on MapPage
    // TODO: test Information on MapPage
    // TODO: test controlsControlItem on MapPage
    // TODO: test Controls on MapPage
    // TODO: test RegionSelector on MapPage
    // TODO: test regionControlItem on MapPage
    // TODO: test AdvancedSelectionPopup on MapPage
});