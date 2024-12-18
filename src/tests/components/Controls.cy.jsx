import React from 'react'
import Controls from '../../components/Controls'

describe('<Controls />', () => {
  beforeEach(() => {
    // Render the controls
    cy.viewport(1024, 768);
    cy.mount(<Controls />)
  });

  it('Checking Controls.jsx structure', () => {
    cy.get('#column-controls')
    .should('exist')
    .and('be.visible')
    .within(()=>{
      cy.get('.flex.justify-center')
      .should('exist')
      .and('be.visible')
      .within(()=>{
        cy.get('#controls-title')
        .should('exist')
        .and('be.visible')
      })

      cy.get('.rowed')
      .should('exist')
      .and('be.visible')
      .within(()=>{
        cy.get('#marker-borders-labels')
        .should('exist')
        .and('be.visible')
        .within(()=>{
          cy.get('#center-marker')
          .should('exist')
          .and('be.visible');
          cy.get('#region-borders')
          .should('exist')
          .and('be.visible');
          cy.get('#region-labels')
          .should('exist')
          .and('be.visible')
        })

        cy.get('#marker-borders-labels-toggles')
        .should('exist')
        .and('be.visible')
        .within(()=>{
          cy.get('.switch.item_in_column')
          .should('have.length',3)

          cy.get('.switch.item_in_column:first-of-type')
          .should('exist').and('be.visible')
          .within(()=>{
            cy.get('#toggle-center-marker')
            .should('exist')
            .and('be.visible')

            cy.get('.slider')
            .should('exist')
          })

          cy.get('.switch.item_in_column:nth-of-type(2)')
          .should('exist').and('be.visible')
          .within(()=>{
            cy.get('#toggle-highlight-regions')
            .should('exist')
            .and('be.visible')

            cy.get('.slider')
            .should('exist')
          })

          cy.get('.switch.item_in_column:last-of-type')
          .should('exist').and('be.visible')
          .within(()=>{
            cy.get('#toggle-show-region-labels')
            .should('exist')
            .and('be.visible')

            cy.get('.slider')
            .should('exist')
          })
        })

        cy.get('#centers-information-image')
        .should('exist')
        .and('be.visible')
        .within(()=>{
          cy.get('#region-centers')
          .should('exist')
          .and('be.visible');
          cy.get('#map-information')
          .should('exist')
          .and('be.visible');
          cy.get('#satellite-image')
          .should('exist')
          .and('be.visible')
        })

        cy.get('#centers-information-image-toggles')
        .should('exist')
        .and('be.visible')
        .within(()=>{
          cy.get('.switch.item_in_column')
          .should('have.length',3)

          cy.get('.switch.item_in_column:first-of-type')
          .should('exist').and('be.visible')
          .within(()=>{
            cy.get('#toggle-show-region-centers')
            .should('exist')
            .and('be.visible')

            cy.get('.slider')
            .should('exist')
          })

          cy.get('.switch.item_in_column:nth-of-type(2)')
          .should('exist').and('be.visible')
          .within(()=>{
            cy.get('#toggle-show-map-information')
            .should('exist')
            .and('be.visible')

            cy.get('.slider')
            .should('exist')
          })

          cy.get('.switch.item_in_column:last-of-type')
          .should('exist').and('be.visible')
          .within(()=>{
            cy.get('#toggle-show-satellite-image')
            .should('exist')
            .and('be.visible')

            cy.get('.slider')
            .should('exist')
          })
        })
      })
    })
  })

  it('column-controls should be visible and configured correctly',()=>{
    cy.get('#column-controls')
    .should('exist')
    .and('be.visible')
    .and('have.css', 'color', 'rgb(255, 255, 255)')
  })

  it('controls should be visible and configured properly',()=>{
    cy.get('.flex.justify-center')
    .should('be.visible').and('exist')
    .within(()=>{
      cy.get('h2#controls-title')
      .should('exist').and('be.visible')
      .should('have.text', 'Controls')
      .and('have.css', 'font-size', '18px')
      .and('have.css', 'margin-bottom', '8px') // (mb-2)
      .and('have.css', 'text-align', 'center') 
    })
  })

  it('The rowed object should be visible and configured correctly',()=>{
    cy.get('.rowed').should('exist').and('be.visible')
    .and('have.css', 'background-color', 'rgb(55, 65, 81)')
    .and('have.css', 'padding', '16px')
    .and('have.css', 'border-radius', '8px')
    .and('have.css', 'height', '176px') // 11rem is approximately 176px
    .and('have.css', 'display', 'flex')
    .and('have.css', 'flex-direction', 'row')
    .and('have.css', 'justify-content', 'center')
  })

  it('marker-borders-labels should be visible and configured properly',()=>{
    cy.get('#marker-borders-labels')
    .should('be.visible')
    .and('exist')
    .and('have.css', 'display', 'flex')
    .and('have.css', 'flex-direction', 'column')
    .and('have.css', 'align-items', 'center')
    .and('have.css', 'justify-content', 'center')
  })

  it('all 6 toggle text should be visible and configured properly',()=>{
    cy.get('.item_in_column').each(($item) => {
      cy.wrap($item)
      .should('have.css', 'margin-bottom', '11.2px')
      .and('have.css', 'margin-left', '8px')
      .and('have.css', 'margin-right', '8px')
    })

    cy.get('#center-marker')
    .should('exist').and('be.visible')
    .and('have.class','item_in_column')
    .and('have.text','Center Marker:')

    cy.get('#region-borders')
    .should('exist').and('be.visible')
    .and('have.class','item_in_column')
    .and('have.text','Show Region Borders:')

    cy.get('#region-labels')
    .should('exist').and('be.visible')
    .and('have.class','item_in_column')
    .and('have.text','Show Region Labels:')

    cy.get('#region-centers')
    .should('exist').and('be.visible')
    .and('have.class','item_in_column')
    .and('have.text','Show Region Centers:')

    cy.get('#map-information')
    .should('exist').and('be.visible')
    .and('have.class','item_in_column')
    .and('have.text','Show Map Information:')

    cy.get('#satellite-image')
    .should('exist').and('be.visible')
    .and('have.class','item_in_column')
    .and('have.text','Show Satellite Image:')
  })

  it.only('all 6 toggles are visible and configured properly',()=>{
    cy.get('.switch.item_in_column').each(($item) => {
      cy.wrap($item)
      .should('be.visible').and('exist')
      .and('have.class','switch')
      .and('have.css', 'margin-bottom', '11.2px')
      .and('have.css', 'margin-left', '8px')
      .and('have.css', 'margin-right', '8px')
      .within(()=>{
        cy.get('input').should('be.visible').and('exist')
        .should('have.attr', 'type', 'checkbox')
        cy.get('span').should('exist')
        .and('have.class','slider')
      })
    })
    .should('have.length',6)

  })
})