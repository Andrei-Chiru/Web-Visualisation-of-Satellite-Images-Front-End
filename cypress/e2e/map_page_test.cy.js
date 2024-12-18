describe('MapPage Component', () => {
  //it is generally not a good idea to import from the project
  //and I could not import these from Map.jsx
  const regions = {
    "Blagoevgrad":      [41.7742, 23.1016],
    "Burgas":           [42.5048, 27.4678],
    "Dobrich":          [43.5726, 27.8273],
    "Gabrovo":          [42.8747, 25.3342],
    "Haskovo":          [41.9340, 25.5653],
    "Kardzhali":        [41.6370, 25.3685],
    "Kyustendil":       [42.2833, 22.6911],
    "Lovech":           [43.1374, 24.7150],
    "Montana":          [43.4125, 23.2251],
    "Pazardzhik":       [42.1928, 24.3337],
    "Pernik":           [42.6054, 23.0370],
    "Pleven":           [43.4170, 24.6253],
    "Plovdiv":          [42.1354, 24.7453],
    "Razgrad":          [43.5330, 26.5373],
    "Ruse":             [43.8356, 25.9711],
    "Shumen":           [43.2700, 26.9229],
    "Silistra":         [44.1171, 27.2621],
    "Sliven":           [42.6814, 26.3221],
    "Smolyan":          [41.5730, 24.6947],
    "Sofia City":       [42.6977, 23.3219],
    "Sofia Province":   [42.5660, 23.7128],
    "Stara Zagora":     [42.4258, 25.6269],
    "Targovishte":      [43.2529, 26.5723],
    "Varna":            [43.2141, 27.9147],
    "Veliko Tarnovo":   [43.0757, 25.6172],
    "Vidin":            [43.9910, 22.8810],
    "Vratsa":           [43.2102, 23.5626],
    "Yambol":           [42.4849, 26.5102]
  };

  const center_tolerance = 1.1;
  const zoom_tolerance = 2;

  beforeEach(() => {
    // Visit the map page before each test
    cy.visit('http://localhost:3000/map');
    cy.viewport(1920, 1080);
  });

  it('map-page-container is visible and configured correctly',()=>{
    cy.viewport(1366,768)
    cy.get('.map-page-container').should('be.visible').and('exist')
    .and('have.css', 'display', 'grid')
    .and('have.css', 'height', '768px')
    .and('have.css', 'position', 'relative')
    .and('have.css', 'grid-template-rows')
    .then(gridTemplateRows => {
      const expectedRows = ['68px', '565.66px', '134.4px'];
      const actualRows = gridTemplateRows.split(' ');
      for (let i = 0; i < expectedRows.length; i++) {
        const expectedValue = parseFloat(expectedRows[i]);
        const actualValue = parseFloat(actualRows[i]);
        expect(Math.abs(expectedValue - actualValue)).to.be.lessThan(0.1);
      }
    })
    
  })

  it('home button redirects to starting page',()=>{
    cy.get('#home-button')
    .should('have.css', 'position', 'absolute')
      .and('have.css', 'top', '20px')
      .and('have.css', 'left', '20px')
      .and('have.css', 'padding', '10px 20px')
      .and('have.css', 'background-color', 'rgb(0, 123, 255)') // Equivalent to #007bff
      .and('have.css', 'color', 'rgb(255, 255, 255)') // Equivalent to white
      .and('have.css', 'border', '0px none rgb(255, 255, 255)') // Equivalent to border: none;
      .and('have.css', 'border-radius', '5px')
      .and('have.css', 'cursor', 'pointer')
      .and('have.css', 'font-size', '16px')
      .and('have.text','Home')
      .trigger('mouseover') 
      .should('have.css', 'background-color', 'rgb(0, 123, 255)') // Equivalent to #0056b3
      .click();
      cy.url().should('equal', 'http://localhost:3000/');  
  })

  it('map-container is visible and configured correctly',()=>{
    cy.get('.map-container')
    .should('be.visible').and('exist')
    .and('have.css', 'grid-row', '2 / auto')       
    .and('have.css', 'position', 'relative') 
    .and('have.css', 'overflow', 'hidden'); 
  })

  // MapComponent cannot be tested in component testing, it has references into other objects
  // Here is tested the structure of Map.jsx, without interactions or buttons.
  // Those are tested after, with the functionality of open such menus, for example.
  it('map is visible and configured correctly',()=>{
    cy.get('#map',{ timeout: 500 }) //given 0.5 seconds to show
    .should('be.visible').and('exist')
    .and('have.class', 'leaflet-container')
    .and('have.class', 'leaflet-touch')
    .and('have.class', 'leaflet-fade-anim')
    .and('have.class', 'leaflet-grab')
    .and('have.class', 'leaflet-touch-drag')
    .and('have.class', 'leaflet-touch-zoom')
    .and('have.css', 'height', '810px')
    .and('have.css', 'width', '1920px');
  })


  it('control-container is not visible and configured correctly',()=>{
    cy.get('.control-container')
    .should('not.be.visible').and('exist')
    .and('have.css', 'position', 'absolute')
    .and('have.css', 'top', '10px')
    .and('have.css', 'right', '10px')
    .and('have.css', 'background-color', 'rgb(255, 255, 255)') // Check background-color in RGB format
    .and('have.css', 'padding', '15px')
    .and('have.css', 'box-shadow', 'rgba(0, 0, 0, 0.2) 0px 0px 15px 0px')
    .and('have.css', 'border-radius', '8px')
    .and('have.css', 'font-size', '16px')
    .and('have.css', 'z-index', '1000')
    .and('have.css', 'width', '225px');
  })

  it('map-information-menu is not visible and configured correctly',()=>{
    cy.get('#map-information-menu').as('menu')
    .should('not.be.visible').and('exist')
    .and('have.class', 'flex')
    .and('have.class', 'justify-between')
    .and('have.class', 'items-center')
    .and('have.class', 'mb-4')
    .within(()=>{
      cy.get('b:first-of-type')
      .should('exist')
      .within(() => {
        cy.get('div')
          .should('exist') 
          .and('contain.text', 'Map Information Menu'); 
      });

      cy.get('b:last-of-type')
        .should('exist') 
        .within(() => {
          cy.get('button.text-black')
            .should('exist')
            .and('have.text', '✕') //unicode for text symbol
        });
    })
  })

  it('map-info is not visible and correctly configured',()=>{
    cy.get('#map-info', {timeout: 500})
    .should('not.be.visible')
    .and('exist')
    .within(()=>{
      cy.get('b:first-of-type')
      .should('exist')
      .and('have.text','Center:')
      cy.get('b:nth-of-type(2)')
      .should('exist')
      .and('have.text','Zoom:')
      cy.get('b:nth-of-type(3)')
      .should('exist')
      .and('have.text','Scale:')
    })
  })

  it('opacity-slider-container is not visible and correctly configured',()=>{
    cy.get('#opacity-slider-container')
    .should('not.be.visible')
    .and('exist')
    .and('have.css', 'display', 'none')
    .and('have.css', 'align-items', 'center')
    .and('have.css', 'justify-content', 'space-between')
    .and('have.css', 'margin-bottom', '10px')
    .within(()=>{
      cy.get('label[for="opacity-slider"]')
      .should('exist')
      .and('have.text', 'Image Opacity');

      cy.get('input[type="range"]#opacity-slider')
      .should('exist')
      .and('have.attr', 'min', '0')
      .and('have.attr', 'max', '1')
      .and('have.attr', 'step', '0.05')
      .and('have.attr', 'value', '0.7');
    })
  })

  it('checking the structure of Map.jsx',()=>{
    cy.get('.map-container')
    .within(()=>{
      cy.get('#map').should('exist');
      cy.get('.control-container').should('exist')
      .within(()=>{
        cy.get('#map-information-menu').should('exist');
        //its children are already tested in a previous test
        //see map-information-menu is not visible and configured correctly
        cy.get('hr')
        .should('have.length',1);

        cy.get('#map-info').should('exist');
        cy.get('#opacity-slider-container').should('exist');
        //its children are tested
        //see opacity-slider-container is not visible and correctly configured
      })
    })
  })
  // Here the tests for Map.jsx end

  it('controls-container is visible and configured correctly',()=>{
    cy.get('.controls-container')
      .should('be.visible').and('exist')
      .and('have.css', 'grid-row', '3 / auto')
      .and('have.css', 'background-color', 'rgb(45, 55, 72)') // CSS color converted to RGB
      .and('have.css', 'padding', '16px') // 1rem = 16px
      .and('have.css', 'display', 'flex')
      .and('have.css', 'justify-content', 'space-between')
      .and('have.css', 'align-items', 'center')
      .and('have.css', 'z-index', '10')
      .and('have.css', 'zoom', '0.7');
  })

  it('control-item are visible and configured correctly',()=>{
    cy.get('.control-item').each(($el) => {
      cy.wrap($el)
        .should('have.css', 'flex-grow', '1')
        .and('have.css', 'margin-left', '8px') // 0.5rem = 8px
        .and('have.css', 'margin-right', '8px'); // 0.5rem = 8px
    });
  })

  it('advanced_selection_button opens pop-up and closes it',()=>{
    cy.get('#advanced_selection_button')
    .should('be.visible').and('exist')
    .trigger('mouseover',{ force: true })
    .should('have.css', 'background-color', 'rgb(255, 255, 255)') // Expected lightgray color
    .click({ force: true });
    cy.get('#close-pop-up').should('be.visible').and('exist').click()
    cy.get('#advanced-selection-pop-up').should('not.exist')
  })

  it('advanced_selection_button opens pop-up and presses proceed',()=>{
    cy.get('#advanced_selection_button')
    .should('be.visible').and('exist')
    .trigger('mouseover',{ force: true })
    .should('have.css', 'background-color', 'rgb(255, 255, 255)') // Expected lightgray color
    .click({ force: true });
    cy.get('#proceed-button').should('be.visible').and('exist').click()
    cy.get('#advanced-selection-pop-up').should('not.exist')
  })

  it('center marker toggle works',()=>{
    cy.get('.custom-center-icon').should('not.exist')

    cy.get('#toggle-center-marker')
    .should('not.be.visible')
    .and('exist')
    .click({force: true})

    cy.get('.custom-center-icon')
    .should('be.visible')
    .and('exist')
    .and('have.css', 'width', '10px')
    .and('have.css', 'height', '10px')
    .and('have.css', 'background-color', 'rgba(0, 0, 0, 0)') // 'red' in RGB
    .and('have.css', 'border-radius', '0px');
  })

  it('highlight regions works',()=>{
    cy.get('.leaflet-interactive').should('not.exist')

    cy.get('#toggle-highlight-regions')
    .should('not.be.visible')
    .and('exist')
    .click({force: true})

    cy.get('.leaflet-interactive')
    .should('be.visible')
    .and('exist')
    .and('have.length',28)
    .each(($el) => {
      cy.wrap($el)
        .should('have.css', 'color', 'rgb(0, 0, 0)')
        .and('have.css', 'font-weight', '400') 
        .and('have.css', 'opacity', '1')
        .and('have.css', 'fill-opacity', '0')
        .trigger('mouseover') 
        .and('have.css', 'stroke-width', '7px')
        .and('have.css', 'stroke', 'rgb(102, 102, 102)') // '#666' in RGB
        .and('have.css', 'fill-opacity', '0.7')
        .and('have.css', 'fill', 'rgb(255, 255, 0)') // '#ff0' in RGB
    })
    
  })

  it('region lables should work',()=>{
    //setting the zoom level 9
    cy.get('.leaflet-control-zoom-in')
    .should('exist')
    .and('be.visible')
    .click()
    .click()

    //the region labels should not appear
    cy.get('.region-label').should('not.exist')

    //clicking the toggle
    cy.get('#toggle-show-region-labels')
    .should('not.be.visible')
    .and('exist')
    .click({force: true})

    //showing the map information menu to get the coordinates and zoom
    cy.get('#toggle-show-map-information')
    .should('not.be.visible').and('exist')
    .click({force:true})
    
    //getting the region labels
    cy.get('.region-label')
    .should('be.visible')
    .and('exist')
    .and('have.length',28)
    .each(($el) => {
      //each such label
      cy.wrap($el)
      .should('have.css', 'font-size', '20px')
      .and('have.css', 'color', 'rgb(0, 0, 0)')
      .trigger('mouseover', {force: true})
      .should('have.css', 'color', 'rgb(255, 255, 0)')
      .and('have.css', 'font-weight', '700') 
      .and('have.css', 'text-shadow', 'rgb(0, 0, 0) 0px 0px 5px')
      .click({force: true})
      .wait(1000)
      .wrap($el)
      //should have text
      .invoke('text').then((text)=>{
        cy.get('#control-container')
        .invoke('html').then((html)=>{
          const centerTextMatch = html.match(/<b>Center:<\/b>\s*([\d.-]+,\s*[\d.-]+)/);
          if (centerTextMatch) {
            const centerText = centerTextMatch[1];
            const centerTextSplit = centerText.split(", ");
            //ensuring that the coordinates are correct
            expect(parseFloat(centerTextSplit[0])).to.be.closeTo(regions[text][0], center_tolerance); // Example assertion
            expect(parseFloat(centerTextSplit[1])).to.be.closeTo(regions[text][1], center_tolerance); // Example assertion
          } else {
            throw new Error('Center text not found');
          }
          //ensuring the zoom level is 10
          const zoom_level = html.match(/<b>Zoom:<\/b>\s*(\d+)<br>/);
          if(zoom_level){
            expect(parseInt(zoom_level[1])).to.be.closeTo(10, zoom_tolerance); // Example assertion
          }else {
            throw new Error('Zoom text not found');
          }
        })

        //zooming out to check the next element
        cy.get('.leaflet-control-zoom-out')
        .should('exist')
        .and('be.visible')
        .click()
        .wait(1000)
      })

    })
  })

  it('region centers should work',()=>{
    //setting the zoom level 9
    cy.get('.leaflet-control-zoom-in')
    .should('exist')
    .and('be.visible')
    .click()
    .click()

    //the region labels should not appear
    cy.get('.custom-center-marker').should('not.exist')

    //clicking the toggle
    cy.get('#toggle-show-region-centers')
    .should('not.be.visible')
    .and('exist')
    .click({force: true})

    //showing the map information menu to get the coordinates and zoom
    cy.get('#toggle-show-map-information')
    .should('not.be.visible').and('exist')
    .click({force:true})
    
    //getting the region labels
    cy.get('.custom-center-marker')
    .should('be.visible')
    .and('exist')
    .and('have.length',28)
    .each(($el) => {
      //each such label
      cy.wrap($el)
      .should('have.css', 'width', '10px')
      .and('have.css', 'height', '10px')
      .and('have.css', 'background-color', 'rgba(0, 0, 0, 0)') // CSS 'blue' in RGB
      .and('have.css', 'border-radius', '0px')
      .trigger('mouseover', {force: true})
      .should('have.css', 'color', 'rgb(0, 0, 0)')
      .click({force: true})
      .wait(1000)
      .get('#control-container')
      .invoke('html').then((html)=>{
        const centerTextMatch = html.match(/<b>Center:<\/b>\s*([\d.-]+,\s*[\d.-]+)/);
        if (centerTextMatch) {
          const centerText = centerTextMatch[1];
          const centerTextSplit = centerText.split(", ");

          const elementId = $el.attr('id');
          if(elementId){
            const text = elementId.match(/^(.+)-center-marker$/);
            //ensuring that the coordinates are correct
            expect(parseFloat(centerTextSplit[0])).to.be.closeTo(regions[text[1]][0], center_tolerance); // Example assertion
            expect(parseFloat(centerTextSplit[1])).to.be.closeTo(regions[text[1]][1], center_tolerance); // Example assertion
          }
        } else {
          throw new Error('Center text not found');
        }
        //ensuring the zoom level is near 10
        const zoom_level = html.match(/<b>Zoom:<\/b>\s*(\d+)<br>/);
        if(zoom_level){
          expect(parseInt(zoom_level[1])).to.be.closeTo(10, zoom_tolerance); // Example assertion
        }else {
          throw new Error('Zoom text not found');
        }
      })

      //zooming out to check the next element
      cy.get('.leaflet-control-zoom-out')
      .should('exist')
      .and('be.visible')
      .click()
      .wait(1000)
    })
  })

  it('map information menu should work',()=>{
    cy.get('#control-container')
    .should('not.be.visible').and('exist')

    .get('#toggle-show-map-information')
    .should('not.be.visible').and('exist')
    .click({force:true})

    .get('#control-container')
    .should('be.visible').and('exist')
    .should('have.css', 'position', 'absolute')
    .and('have.css', 'top', '10px')
    .and('have.css', 'right', '10px')
    .and('have.css', 'background-color', 'rgb(255, 255, 255)') // CSS 'white' in RGB
    .and('have.css', 'padding', '15px')
    .and('have.css', 'box-shadow', 'rgba(0, 0, 0, 0.2) 0px 0px 15px 0px')
    .and('have.css', 'border-radius', '8px')
    .and('have.css', 'font-size', '16px')
    .and('have.css', 'z-index', '1000')
    .and('have.css', 'width', '225px')
    .within(()=>{
      cy.get('#map-information-menu')
      .should('exist')
      .and('be.visible')
      .should('have.class', 'flex')
      .and('have.class', 'justify-between')
      .and('have.class', 'items-center')
      .and('have.class', 'mb-4')
      .within(()=>{
        cy.get('b:first-of-type')
        .should('exist').and('be.visible')
        .within(()=>{
          cy.get('div')
          .should('exist').and('be.visible')
          .and('have.text','Map Information Menu')
        })

        .get('b:last-of-type')
        .should('exist').and('be.visible')
        .within(()=>{
          cy.get('button')
          .should('exist').and('be.visible')
          .and('have.css', 'color', 'rgb(0, 0, 0)')
          .and('have.text', '✕')
        })
      })

      .get('hr').should('exist')
      .and('be.visible')
      .and('have.length',1);

      const center = [42.54802, 25.00240]
      const zoom = 7
      const scale = 901

      cy.get('#map-info')
      .should('exist').and('be.visible')
      .and('contain', `Zoom: ${zoom}`)
      .and('contain', `Scale: 1:${scale}`)
      .invoke('html').then((html)=>{
        const centerTextMatch = html.match(/<b>Center:<\/b>\s*([\d.-]+,\s*[\d.-]+)/);
        if (centerTextMatch) {
          const centerText = centerTextMatch[1];
          const centerTextSplit = centerText.split(", ");
          //ensuring that the coordinates are correct
          expect(parseFloat(centerTextSplit[0])).to.be.closeTo(center[0], center_tolerance); // Example assertion
          expect(parseFloat(centerTextSplit[1])).to.be.closeTo(center[1], center_tolerance); // Example assertion
        } else {
          throw new Error('Center text not found');
        }})
      

    })

    .get('.leaflet-control-zoom-in')
    .should('exist')
    .and('be.visible')
    .click()


    var center = [42.54802,25.00240]
    var zoom = 8
    var scale = 450
    
    cy.get('#control-container')
    .within(()=>{
      cy.get('#map-info')
      .should('exist').and('be.visible')
      .and('contain', `Zoom: ${zoom}`)
      .and('contain', `Scale: 1:${scale}`)
    })
    .invoke('html').then((html)=>{
      const centerTextMatch = html.match(/<b>Center:<\/b>\s*([\d.-]+,\s*[\d.-]+)/);
      if (centerTextMatch) {
        const centerText = centerTextMatch[1];
        const centerTextSplit = centerText.split(", ");

        //ensuring that the coordinates are correct
        expect(parseFloat(centerTextSplit[0])).to.be.closeTo(center[0], center_tolerance); // Example assertion
        expect(parseFloat(centerTextSplit[1])).to.be.closeTo(center[1], center_tolerance); // Example assertion
      } else {
        throw new Error('Center text not found');
      }
    })
  })


  it('should render the map', () => {
    // Check if the map container is visible and configured correctly
    cy.get('.leaflet-container').should('be.visible').and('exist');
  });

  it('should render map tiles', () => {
    // Check if map tiles are loaded and visible
    cy.get('.leaflet-tile-container img').should('be.visible').and('exist');
  });

  it('should ensure map tiles are fully loaded', () => {
    // Wait for map tiles to fully load
    cy.get('.leaflet-tile-loaded', { timeout: 10000 }).should('be.visible').and('exist');
  });

  it('should show the title',()=>{
    cy.get('.header-title').should('be.visible').and('exist');
  });

  

  // THIS TEST CASE NEEDS MORE ATTENTION
  // it('should allow panning the map', () => {
  //   // Simulate panning by triggering mouse events
  //   cy.get('.leaflet-container')
  //     .trigger('mousedown', { which: 1, pageX: 600, pageY: 400 })
  //     .trigger('mousemove', { which: 1, pageX: 580, pageY: 380 })
  //     .trigger('mouseup');
  //   // Assertions to verify map panning could include checking the changed position of map elements
  // });

  // THIS TEST CASE NEEDS MORE ATTENTION
  // it('should zoom in and out', () => {
  //   // Simulate zoom in and zoom out
  //   cy.get('.leaflet-control-zoom-in').click();
  //   cy.get('.leaflet-control-zoom-out').click();
  //   // Additional assertions can be added here to verify zoom level changes
  // });

  
});
