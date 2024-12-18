import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.fullscreen/Control.FullScreen.css';
import 'leaflet.fullscreen';
import '../styles/MapComponent.css';
import regionsData from './RegionData';
import cData from './CountryData';

// OSM
const osmUrl = 'https://{s}.tile.osm.org/{z}/{x}/{y}.png';
const osmContribution = '&copy; OpenStreetMap contributors';

// Server
const serverRoute = `http://localhost:8000/`;
const tilesEndpoint = `tiles/`;
const leafletTilePath = `/{z}/{x}/{y}.png`;
const initialImageOpacity = 0.7;

// Map
const mapHeight = '75vh';
const mapWidth = '100%';
const minZoomLevel = 6;
const maxZoomLevel = 13;
const initialZoom = 10;

// Bulgaria
const bulgariaCenter = [42.7339, 25.4858];
const latLongBoundsBulgaria = [[40.0, 21.0], [45.0, 29.0]];
const boundsViscosity = 0.8;

// Fullscreen
const isPseudoFullscreen = false;
const fullscreenTitle = "Toggle fullscreen";
const fullscreenExitTitle = "Exit fullscreen";

// Center Icon
const centerIconClass = 'custom-center-icon';
const centerIconHTML = '<div class="inner-marker" style="width: 10px; height: 10px; background-color: blue; border-radius: 50%;"></div>';
const centerIconSize = [10, 10];
const centerIconAnchor = [5, 5];
const centerIconDraggable = false;

// Regions general
const regionsColor = "#15a5d1"; //  color for borders
const regionsWeight = 5; // Thicker borders
const regionsOpacity = 1;
const regionsFillOpacity = 0; // Transparent inside
const regionsToggleClass = 'toggle-highlight-regions';

// Regions mouseover
const regionsMouseoverColor = '#666';
const regionsMouseoverWeight = 7;
const regionsMouseoverFillOpacity = 0.7;
const regionsMouseoverFillColor = '#ff0';

// Region Label general
const regionLabelClass = 'region-label';
const regionsLabelsToggleClass = 'toggle-show-region-labels';

// Region Label Mouseover
const regionLabelMouseoverColor = '#ff0';
const regionLabelMouseoverWeight = 'bold';
const regionLabelMouseoverShadow = '0 0 5px #000';

// Region Label mouseout
const regionLabelMouseoutColor = '';
const regionLabelMouseoutWeight = '';
const regionLabelMouseoutShadow = '';

// Center Marker
const centerMarkerClass = 'custom-center-marker';
const centerMarkerHTML = '<div style="width: 10px; height: 10px; background-color: blue; border-radius: 50%;"></div>';
const centerMarkerSize = [10, 10];
const centerMarkerAnchor = [5, 5];
const centerMarkerToggleClass = 'toggle-center-marker';

const innerMarkerClass = '.inner-marker';

// Center Marker mouseover
const centerMarkerMouseoverColor = 'yellow';

// Center Marker mouseout
const centerMarkerMouseoutColor = 'blue';

// Opacity Slider
const opacitySliderContainerClass = 'opacity-slider-container';
const opacitySliderClass = 'opacity-slider';
const opacitySliderType = 'range';
const opacitySliderMin = '0';
const opacitySliderMax = '1';
const opacitySliderStep = '0.05';

// Map Info
const mapContainerClass = 'control-container';
const mapInfoClass = 'map-info';
const mapInfoContainerClass = "flex justify-between items-center mb-4";
const mapInfoToggleClass = 'toggle-show-map-information';

// Toggle extended
const toggleClass = 'toggle-container';
const imageToggleClass = 'toggle-show-satellite-image';
const regionsCenterToggleClass = 'toggle-show-region-centers';
const toggleButtonClass = 'text-black';
const cropImageToggleClass = 'toggle-crop-images';

// Events
const onChange = 'change';
const onInput = 'input';

// Styles
const styleFlex = 'flex';
const styleInitial = 'initial';
const styleNone = 'none';

// Calculation
const locationDecimals = 5;
const notSureHowToCallThis = 156543.03392;
const circle = 360;

export const algorithms = {
    "True Color": 0,
    "NDVI": 1,
    "NDWI": 2,
    "NDMI": 3,
};

export const provinceNames = {
    BLA: "Blagoevgrad",
    BGS: "Burgas",
    VAR: "Varna",
    VTR: "Veliko Tarnovo",
    VID: "Vidin",
    VRC: "Vratsa",
    GAB: "Gabrovo",
    DOB: "Dobrich",
    KRZ: "Kardzhali",
    KNL: "Kyustendil",
    LOV: "Lovech",
    MON: "Montana",
    PAZ: "Pazardzhik",
    PER: "Pernik",
    PVN: "Pleven",
    PDV: "Plovdiv",
    RAZ: "Razgrad",
    RSE: "Ruse",
    SLS: "Silistra",
    SLV: "Sliven",
    SML: "Smolyan",
    SFO: "Sofia Province",
    SOF: "Sofia City",
    SZR: "Stara Zagora",
    TGV: "Targovishte",
    HKV: "Haskovo",
    SHU: "Shumen",
    JAM: "Yambol",
};

export const regions = {
    "Blagoevgrad": [41.7742, 23.1016],
    "Burgas": [42.5048, 27.4678],
    "Dobrich": [43.5726, 27.8273],
    "Gabrovo": [42.8747, 25.3342],
    "Haskovo": [41.9340, 25.5653],
    "Kardzhali": [41.6370, 25.3685],
    "Kyustendil": [42.2833, 22.6911],
    "Lovech": [43.1374, 24.7150],
    "Montana": [43.4125, 23.2251],
    "Pazardzhik": [42.1928, 24.3337],
    "Pernik": [42.6054, 23.0370],
    "Pleven": [43.4170, 24.6253],
    "Plovdiv": [42.1354, 24.7453],
    "Razgrad": [43.5330, 26.5373],
    "Ruse": [43.8356, 25.9711],
    "Shumen": [43.2700, 26.9229],
    "Silistra": [44.1171, 27.2621],
    "Sliven": [42.6814, 26.3221],
    "Smolyan": [41.5730, 24.6947],
    "Sofia City": [42.6977, 23.3219],
    "Sofia Province": [42.5660, 23.7128],
    "Stara Zagora": [42.4258, 25.6269],
    "Targovishte": [43.2529, 26.5723],
    "Varna": [43.2141, 27.9147],
    "Veliko Tarnovo": [43.0757, 25.6172],
    "Vidin": [43.9910, 22.8810],
    "Vratsa": [43.2102, 23.5626],
    "Yambol": [42.4849, 26.5102],
};

const MapComponent = forwardRef((props, ref) => {
    const mapContainer = useRef(null);
    const mapInstance = useRef(null);
    const centerMarker = useRef(null);
    const sentinelLayer = useRef(null);
    const maskLayer = useRef(null);
    const regionsLayer = useRef(null);
    const regionLabels = useRef([]);
    const regionCenters = useRef([]);
    const image = useRef(0);
    const algorithm = useRef(0);

    useImperativeHandle(ref, () => ({
        setView: (coords, zoom) => {
            if (mapInstance.current) {
                mapInstance.current.setView(coords, zoom);
            }
        },
        // Set the algorithm ID to be used
        setAlgorithm: (algorithmId) => {
            if (mapInstance.current) {
                algorithm.current = algorithmId;
            }
        },
        // Update the map overview
        updateView: () => {
            if (mapInstance.current) {
                sentinelLayer.current.setUrl(`${serverRoute}${tilesEndpoint}${image.current}/${algorithm.current}${leafletTilePath}`);
                sentinelLayer.current.redraw();
            }
        },
    }));

    useEffect(() => {
        if (mapContainer.current !== null && mapInstance.current === null) {
            // Define expanded bounds around Bulgaria
            const bulgariaBounds = L.latLngBounds(latLongBoundsBulgaria);

            // Base layer
            const osmLayer = L.tileLayer(`${osmUrl}`, {
                attribution: osmContribution,
                minZoom: minZoomLevel,
                maxZoom: maxZoomLevel,
            });

            // Overlay layer (TMS)
            sentinelLayer.current = L.tileLayer(`${serverRoute}${tilesEndpoint}${image.current}/${algorithm.current}${leafletTilePath}`, {
                tms: true,
                opacity: initialImageOpacity,
                minZoom: minZoomLevel,
                maxZoom: maxZoomLevel,
            });

            // Initialize the map
            mapInstance.current = L.map(mapContainer.current, {
                center: bulgariaCenter,
                zoom: minZoomLevel,
                minZoom: minZoomLevel,
                maxZoom: maxZoomLevel,
                layers: [osmLayer, sentinelLayer.current],
                fullscreenControl: {
                    pseudoFullscreen: isPseudoFullscreen,
                    title: fullscreenTitle,
                    titleCancel: fullscreenExitTitle
                },
                maxBounds: bulgariaBounds,
                maxBoundsViscosity: boundsViscosity,
            });

            // Add fullscreen control only once
            L.control.fullscreen({
                pseudoFullscreen: isPseudoFullscreen,
                title: fullscreenTitle,
                titleCancel: fullscreenExitTitle
            }).addTo(mapInstance.current);

            // Ensure the map cannot be panned outside of the specified bounds
            mapInstance.current.setMaxBounds(bulgariaBounds);

            // Custom center marker icon
            const centerIcon = L.divIcon({
                className: centerIconClass,
                html: centerIconHTML,
                iconSize: centerIconSize,
                iconAnchor: centerIconAnchor,
            });

            // Center marker
            centerMarker.current = L.marker(mapInstance.current.getCenter(), {
                icon: centerIcon,
                draggable: centerIconDraggable,
            });

            // Update center marker position on map move
            function updateCenterMarker() {
                const center = mapInstance.current.getCenter();
                centerMarker.current.setLatLng(center);
            }

            mapInstance.current.on('move', updateCenterMarker);
            mapInstance.current.on('zoom', updateCenterMarker);

            // Function to add or remove regions layer with hover and click interactions
            function toggleRegionsLayer(show) {
                if (show) {
                    if (!regionsLayer.current) {
                        regionsLayer.current = L.geoJSON(regionsData, {
                            style: function (feature) {
                                return {
                                    color: regionsColor,
                                    weight: regionsWeight,
                                    opacity: regionsOpacity,
                                    fillOpacity: regionsFillOpacity,
                                };
                            },
                            onEachFeature: function (feature, layer) {
                                layer.on({
                                    mouseover: function (e) {
                                        const layer = e.target;
                                        layer.setStyle({
                                            color: regionsMouseoverColor,
                                            weight: regionsMouseoverWeight,
                                            fillOpacity: regionsMouseoverFillOpacity,
                                            fillColor: regionsMouseoverFillColor,
                                        });
                                    },
                                    mouseout: function (e) {
                                        regionsLayer.current.resetStyle(e.target);
                                    },
                                    click: function (e) {
                                        mapInstance.current.setView(regions[provinceNames[e.target.feature.properties.nuts3]], initialZoom);
                                    },
                                });
                            },
                        });
                    }
                    regionsLayer.current.addTo(mapInstance.current);
                } else {
                    if (regionsLayer.current) {
                        mapInstance.current.removeLayer(regionsLayer.current);
                    }
                }
            }

            // Add region labels and center markers
            function addRegionLabelsAndCenters() {
                Object.keys(regions).forEach((regionName) => {
                    const coords = regions[regionName];

                    // Add labels
                    const label = L.marker(coords, {
                        icon: L.divIcon({
                            className: regionLabelClass,
                            html: `<div>${regionName}</div>`,
                        }),
                    })
                        .on('mouseover', function () {
                            this.getElement().style.color = regionLabelMouseoverColor;
                            this.getElement().style.fontWeight = regionLabelMouseoverWeight;
                            this.getElement().style.textShadow = regionLabelMouseoverShadow;
                        })
                        .on('mouseout', function () {
                            this.getElement().style.color = regionLabelMouseoutColor;
                            this.getElement().style.fontWeight = regionLabelMouseoutWeight;
                            this.getElement().style.textShadow = regionLabelMouseoutShadow;
                        })
                        .on('click', () => {
                            mapInstance.current.setView(coords, initialZoom); // Set zoom level to initial zoom value (usually 10)
                        });
                    regionLabels.current.push(label);

                    // Add center markers
                    const centerMarker = L.marker(coords, {
                        icon: L.divIcon({
                            id:"${regionName}-center-marker",
                            className: centerMarkerClass,
                            html: centerMarkerHTML,
                            iconSize: centerMarkerSize,
                            iconAnchor: centerMarkerAnchor,
                        }),
                    })
                        .on('mouseover', function () {
                            const innerDiv = this.getElement().querySelector(innerMarkerClass);
                            if (innerDiv) {
                                innerDiv.style.backgroundColor = centerMarkerMouseoverColor;
                            }
                        })
                        .on('mouseout', function () {
                            const innerDiv = this.getElement().querySelector(innerMarkerClass);
                            if (innerDiv) {
                                innerDiv.style.backgroundColor = centerMarkerMouseoutColor;
                            }
                        })
                        .on('click', () => {
                            mapInstance.current.setView(coords, initialZoom); // Set zoom level to initial zoom value (usually 10)
                        });
                    regionCenters.current.push(centerMarker);
                });
            }

            // Function to toggle visibility of region labels and centers
            function toggleRegionLabels(show) {
                if (show) {
                    if (regionLabels.current.length === 0) {
                        addRegionLabelsAndCenters();
                    }
                    regionLabels.current.forEach((label) => {
                        label.addTo(mapInstance.current);
                    });
                } else {
                    regionLabels.current.forEach((label) => {
                        mapInstance.current.removeLayer(label);
                    });
                }
            }

            function toggleRegionCenters(show) {
                if (show) {
                    if (regionCenters.current.length === 0) {
                        addRegionLabelsAndCenters();
                    }
                    regionCenters.current.forEach((marker) => {
                        marker.addTo(mapInstance.current);
                    });
                } else {
                    regionCenters.current.forEach((marker) => {
                        mapInstance.current.removeLayer(marker);
                    });
                }
            }

            // Create the mask layer for the Sentinel layer
            function createMaskLayer() {
                const maskStyle = {
                    color: 'white',
                    fillColor: 'white',
                    fillOpacity: 1,
                    weight: 0,
                };

                const worldMaskData = {
                    "type": "FeatureCollection",
                    "features": [
                        {
                            "type": "Feature",
                            "geometry": {
                                "type": "Polygon",
                                "coordinates": [
                                    [
                                        [-180, -90],
                                        [180, -90],
                                        [180, 90],
                                        [-180, 90],
                                        [-180, -90],
                                    ],
                                    cData.features[0].geometry.coordinates[0]
                                ],
                            },
                        },
                    ],
                };

                const maskLayer = L.geoJSON(worldMaskData, {
                    style: maskStyle,
                });

                return maskLayer;
            }

            // Toggle layers and center marker
            document.getElementById(imageToggleClass).addEventListener(onChange, function () {
                const opacitySliderContainer = document.getElementById(opacitySliderContainerClass);
                if (this.checked) {
                    mapInstance.current.addLayer(sentinelLayer.current);
                    opacitySliderContainer.style.display = styleFlex;
                } else {
                    mapInstance.current.removeLayer(sentinelLayer.current);
                    opacitySliderContainer.style.display = styleNone;
                }
            });

            document.getElementById(centerMarkerToggleClass).addEventListener(onChange, function () {
                if (this.checked) {
                    centerMarker.current.addTo(mapInstance.current);
                } else {
                    mapInstance.current.removeLayer(centerMarker.current);
                }
            });

            document.getElementById(regionsToggleClass).addEventListener(onChange, function () {
                toggleRegionsLayer(this.checked);
            });

            document.getElementById(regionsCenterToggleClass).addEventListener(onChange, function () {
                toggleRegionCenters(this.checked);
            });

            document.getElementById(regionsLabelsToggleClass).addEventListener(onChange, function () {
                toggleRegionLabels(this.checked);
            });

            document.getElementById(cropImageToggleClass).addEventListener(onChange, function () {
                if (this.checked) {
                    if (!maskLayer.current) {
                        maskLayer.current = createMaskLayer();
                    }
                    mapInstance.current.addLayer(maskLayer.current); // Add the mask layer
                } else {
                    if (maskLayer.current) {
                        mapInstance.current.removeLayer(maskLayer.current); // Remove the mask layer
                    }
                }
            });

            // Opacity slider for sentinel layer
            document.getElementById(opacitySliderClass).addEventListener(onInput, function () {
                sentinelLayer.current.setOpacity(this.value);
            });

            // Update map info
            function toggleMapInformation(show) {
                const container = document.getElementById(mapContainerClass);
                if (show) {
                    container.style.display = styleInitial;
                } else {
                    container.style.display = styleNone;
                }
            }
            document.getElementById(mapInfoToggleClass).addEventListener(onChange, function () {
                toggleMapInformation(this.checked);
            });

            function updateMapInfo() {
                const infoDiv = document.getElementById(mapInfoClass);
                const center = mapInstance.current.getCenter();
                const zoom = mapInstance.current.getZoom();
                infoDiv.innerHTML = `<b>Center:</b> ${center.lat.toFixed(locationDecimals)}, ${center.lng.toFixed(locationDecimals)}<br>
                    <b>Zoom:</b> ${zoom}<br>
                    <b>Scale:</b> 1:${Math.round(notSureHowToCallThis * Math.cos(center.lat * Math.PI / (circle / 2)) / Math.pow(2, zoom))}`;
            }

            mapInstance.current.on('moveend', updateMapInfo);
            mapInstance.current.on('zoomend', updateMapInfo);
            updateMapInfo(); // Initial update

            // Fit map to expanded bounds
            mapInstance.current.fitBounds(bulgariaBounds);

            // Error handling for tile loading
            sentinelLayer.current.on('tileerror', function (error, tile) {
                console.error('Tile loading error: ', error);
            });

        // Cleanup function to remove the map instance when the component unmounts
        return () => {
            if (mapInstance.current) {
                mapInstance.current.remove();
                mapInstance.current = null;
            }
            };
        };

        
    });

    return (
        <div>
            <div id='map'ref={mapContainer} style={{height: mapHeight, width: mapWidth}}></div>
            <div className={mapContainerClass} id={mapContainerClass} style={{display: styleNone}}>
                <div className={mapInfoContainerClass} id='map-information-menu'>
                    <b><div>Map Information Menu</div></b>
                    <b>
                        <button className={toggleButtonClass} onClick={() => {document.getElementById(mapInfoToggleClass).click()}}>
                            &#10005;
                        </button>
                    </b>
                </div>
                <div id={mapInfoClass}></div>
                <hr/>

                <div className={toggleClass} id={opacitySliderContainerClass} style={{display: styleNone}} >
                    <label htmlFor={opacitySliderClass}>Image Opacity</label>
                    <input type={opacitySliderType} id={opacitySliderClass} min={opacitySliderMin} max={opacitySliderMax} step={opacitySliderStep} defaultValue={initialImageOpacity}/>
                </div>
            </div>
        </div>
    );

});

export default MapComponent;
