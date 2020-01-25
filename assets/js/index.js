window.onload = init;

function init(){
    const map = new ol.Map({
        view: new ol.View({
            projection: 'EPSG:4326',
            center: [122.5, 21.5],
            zoom: 3,
            maxZoom: 10,
            minZoom: 3,
            extent: [67.9833333229790355,-13.1416666689759580, 150.9333333196610170,46.6916666619640353]
        }),
        target: 'js-map'
    })

    const rasterSRTM = new ol.layer.Image({
        source: new ol.source.ImageStatic({
            url: './data/srtm.png',
            projection: map.getView().getProjection(),
            imageExtent: [67.9833333229790355,-13.1416666689759580, 150.9333333196610170,46.6916666619640353]
        }),
        visible: true,
        title: 'RasterSRTM'
    })

    map.addLayer(rasterSRTM);

    const strokeStyle = new ol.style.Stroke({
        color: [255, 255,255, 1],
        width: 1.2
    })

    const circleStyle = new ol.style.Circle({
        fill: new ol.style.Fill({
            color: [0,0,140,1]
        }),
        radius: 6,
        stroke: strokeStyle
    })

    const iconStyle = new ol.style.Icon({
        anchor: [0.1, 10],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        // size: [10,10],
        scale: 0.1,
        opacity: 0.80,
        src: 'data/project-icon3.png'
    })

    // Vector Layers
    const projectsGeoJSON = new ol.layer.VectorImage({
        source: new ol.source.Vector({
            url: './data/projects.geojson',
            format: new ol.format.GeoJSON()
        }),
        visible: true,
        title: 'ProjectsGeoJSON',
        style: new ol.style.Style({
            image: iconStyle
        })
    })
    map.addLayer(projectsGeoJSON);

    var container = document.getElementById('popup');
    var content = document.getElementById('popup-content');
    var closer = document.getElementById('popup-closer');

    var overlay = new ol.Overlay({
        element: container,
        autoPan: true,
        positioning: 'bottom-left',
        autoPanAnimation: {
            duration: 250
        },
        offset: [0, -5]
    });
    map.addOverlay(overlay);

    closer.onclick = function() {
        overlay.setPosition(undefined);
        closer.blur;
        return false;
    };

    // display popup on click
    map.on('click', function(event) {
        var feature = map.forEachFeatureAtPixel(event.pixel,
            function(feature) {
              return feature;
            });
        if (feature) {
            var coordinates = feature.getGeometry().getCoordinates();
            content.innerHTML = feature.get('location') + ": " + feature.get('projects');
            overlay.setPosition(coordinates);
        }else{
            overlay.setPosition(undefined);
            closer.blur();
        }
      });

      map.on("pointermove", function (evt) {
        var hit = this.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
            return true;
        }); 
        if (hit) {
            this.getTargetElement().style.cursor = 'pointer';
        } else {
            this.getTargetElement().style.cursor = '';
        }
    });
}