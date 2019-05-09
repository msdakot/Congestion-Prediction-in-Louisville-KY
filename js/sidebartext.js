
var defaultMapview = function(){
  map.setView([38.242,-85.793], 13);
};

var clearMap = function(){
  if (typeof featureGroup !== 'undefined') {
    map.removeLayer(featureGroup);
  }
};


mapboxgl.accessToken = 'pk.eyJ1IjoiZGhydXZzMDQiLCJhIjoiY2psZWkxem45MDZuNjNrcWhkZDMxdXo5byJ9.O_pXu61MgF8AfZiWLaR5pA';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/dhruvs04/cjtehgcvh31ym1fleyjaq7cu3',
  center: [-85.793,38.242],
  zoom: 12
});

var colorRamp = ["#bcbcbc","#21BFD7", "#26A1E3","#6955F5" ,"#A626FB", "#D01B1B"];

// var colorRamp = ["#bcbcbc",'#21BFD7', '#2C84F0' ,'#A626FB', '#D01B1B','#21D78F'];
var  brks = [-1.562,2.5,5,10,25,90];

var plot1Func = function() {
  // clearMap();
  // defaultMapview();
  //
  // colorRampCon = ["#F2F2F2", "#93BFAF","#6DA67B","#6DA6A0","#192E40"];
  //
  // colorPolygons = function(feature){
  //   if (feature.properties.prdctns <= 100) {
  //     return colorRampCon[0];
  //   } else if (feature.properties.prdctns <= 200 &&feature.properties.prdctns > 300 ) {
  //     return colorRampCon[1];
  //   } else if (feature.properties.prdctns <= 300 && feature.properties.prdctns> 400) {
  //     return colorRampCon[2];
  //   } else if (feature.properties.prdctns <= 400 && feature.properties.prdctns > 500 ) {
  //     return colorRampCon[3];
  //   }  else if (feature.properties.prdctns > 500 ) {
  //     return colorRampCon[4];
  //   }
  // };
  //
  //
  // myStyle = function(feature){
  //   var theStyle = {
  //     color: colorPolygons(feature),//colorPolygons(feature,inputs),
  //     fillOpacity: 0.5,
  //     stroke: true,
  //     strokeOpacity: 1,
  //     weight: 1
  //   };
  //   return(theStyle);
  // };
  //
  // featureGroup = L.geoJson(polyparsed, {
  //   style: myStyle,
  //
  //   onEachFeature: function(feature, layer) {
  //       layer.bindPopup(polyPopUp(feature));
  //   }
  // });
  //
  // map.addLayer(featureGroup);

};

function addr(dat) {
  var feat = dat.features[0];
  var neigh = feat.context[0].text;
  var adr = feat.place_name;

  var fHtml =  neigh + "\n" + adr;
  return fHtml;
}

var mt,weekD,chartJson,chartM,red;


var polyAr = [
  // "https://raw.githubusercontent.com/msdakot/Congestion-Prediction-in-Louisville-KY/master/database/fishJan.geojson",
  "https://raw.githubusercontent.com/msdakot/Congestion-Prediction-in-Louisville-KY/master/database/fishJan_W.geojson",
  "https://raw.githubusercontent.com/msdakot/Congestion-Prediction-in-Louisville-KY/master/database/fishFeb.geojson",
  "https://raw.githubusercontent.com/msdakot/Congestion-Prediction-in-Louisville-KY/master/database/fishMar.geojson",
  "https://raw.githubusercontent.com/msdakot/Congestion-Prediction-in-Louisville-KY/master/database/fishApr.geojson"
  // "https://raw.githubusercontent.com/msdakot/Congestion-Prediction-in-Louisville-KY/master/database/fishMay.geojson",
  // "https://raw.githubusercontent.com/msdakot/Congestion-Prediction-in-Louisville-KY/master/database/fishJun.geojson"
];





// var poly = "https://raw.githubusercontent.com/msdakot/Congestion-Prediction-in-Louisville-KY/master/database/fishJan.geojson";
var poly = polyAr[0];
var polysb = polyAr[1];
var fishHr = "https://raw.githubusercontent.com/msdakot/Congestion-Prediction-in-Louisville-KY/master/database/fish_av_hour.geojson";
var fishwDay = "https://raw.githubusercontent.com/msdakot/Congestion-Prediction-in-Louisville-KY/master/database/fish_av_wday.geojson";
var charturl ="https://raw.githubusercontent.com/msdakot/Congestion-Prediction-in-Louisville-KY/master/database/chart.json";
var fishhour,fishWeek,polyparsed,chartPar;

$.ajax(charturl).done(function(fd) {
  chartPar = JSON.parse(fd);
  console.log("chart json done!");
});

$.ajax(fishHr).done(function(fdat) {
  // Parse JSON
  fish = JSON.parse(fdat);
  console.log("hour done!");
});

$.ajax(fishwDay).done(function(fdat) {
  // Parse JSON
  fishWeek = JSON.parse(fdat);
  console.log("weekday done!");
});

// either run the code below or directly call it from url
// $.ajax(x).done(function(poly){
//   // Parse JSON
//   polyparsed = JSON.parse(poly);
//   // Show the initial slide
//   console.log("done!");
// });


  // var flt_month = ['==', "Mnth", 1];
  var flt_wDay = ['==', "Weekday", 1];
  var flt_hr = ['==', "Hour", 10];
  var flt_wea = ['==', "Weather", ""];

map.on('style.load',function(){


      map.addSource('fishnets_grids', {
        type: 'geojson',
        data: "https://raw.githubusercontent.com/msdakot/Congestion-Prediction-in-Louisville-KY/master/database/fishnets.geojson"
      });

      map.addLayer({
        "id":"grids_empty",
        "type":"fill",
        'source': 'fishnets_grids',
        // 'source-layer':'fishJan-bhb97l',
        'layout': {
          'visibility': 'visible'},
        'paint':{
          // 'fill-color':'#f3f333',
          'fill-opacity': 0.1,
          'fill-outline-color':'#000',
        }
        });

      map.addSource('fishnets', {
        type: 'geojson',
        data: poly
          // url:"mapbox://dhruvs04.8wuu9ip0"
      });

      map.addLayer({
        "id":"grids",
        "type":"fill",
        'source': 'fishnets',
        // 'source-layer':'fishJan-bhb97l',
        'layout': {
          'visibility': 'visible'},
        'filter': ['all', flt_wDay,flt_hr],
        'paint':{
          // 'fill-color':'#f3f333',
          "fill-color": {
            property: 'Predicted',
            stops: [
              [brks[0], colorRamp[0]],
              [brks[1], colorRamp[1]],
              [brks[2], colorRamp[2]],
              [brks[3], colorRamp[3]],
              [brks[4], colorRamp[4]],
              [brks[5], colorRamp[5]]]
            },
          'fill-opacity': 0.6,
          'fill-outline-color':'#fff',
        }
        });

        chartFilter(1,chartPar);
        chartWeek("Monday",chartM);
        createChart(chartJson);


        map.addSource('fishnetsF', {
          type: 'geojson',
          data: polyAr[1]
        });

        map.addLayer({
          "id":"grids-f",
          "type":"fill",
          'source': 'fishnetsF',
          'layout': {
            'visibility': 'none'},
          // 'filter': ['all', flt_wDay, flt_hr],
          'paint':{
            // 'fill-color':'#f3f333',
            "fill-color": {
              property: 'Predicted',
              stops: [
                [brks[0], colorRamp[0]],
                [brks[1], colorRamp[1]],
                [brks[2], colorRamp[2]],
                [brks[3], colorRamp[3]],
                [brks[4], colorRamp[4]],
                [brks[5], colorRamp[5]]]
              },
            'fill-opacity': 0.6,
            'fill-outline-color':'#fff',
          }
          });

          map.addSource('fishnetsM', {
            type: 'geojson',
            data: polyAr[2]
          });

          map.addLayer({
            "id":"grids-m",
            "type":"fill",
            'source': 'fishnetsM',
            'layout': {
              'visibility': 'none'},
            // 'filter': ['all', flt_wDay, flt_hr],
            'paint':{
              // 'fill-color':'#f3f333',
              "fill-color": {
                property: 'Predicted',
                stops: [
                  [brks[0], colorRamp[0]],
                  [brks[1], colorRamp[1]],
                  [brks[2], colorRamp[2]],
                  [brks[3], colorRamp[3]],
                  [brks[4], colorRamp[4]],
                  [brks[5], colorRamp[5]]]
                },
              'fill-opacity': 0.6,
              'fill-outline-color':'#fff',
            }
            });


            map.addSource('fishnetsA', {
              type: 'geojson',
              data: polyAr[3]
            });

            map.addLayer({
              "id":"grids-a",
              "type":"fill",
              'source': 'fishnetsA',
              'layout': {
                'visibility': 'none'},
              // 'filter': ['all', flt_wDay, flt_hr],
              'paint':{
                // 'fill-color':'#f3f333',
                "fill-color": {
                  property: 'Predicted',
                  stops: [
                    [brks[0], colorRamp[0]],
                    [brks[1], colorRamp[1]],
                    [brks[2], colorRamp[2]],
                    [brks[3], colorRamp[3]],
                    [brks[4], colorRamp[4]],
                    [brks[5], colorRamp[5]]]
                  },
                'fill-opacity': 0.6,
                'fill-outline-color':'#fff',
              }
              });


              yetano("grids");



      // Single Gridcell selection
      map.addLayer({
          "id": "grid-highlighted",
          "type": "fill",
          "source": "fishnets_grids",
          // 'source-layer':'fishJan-bhb97l',
          'layout': {
            'visibility': 'visible'},
          "paint": {
          "fill-outline-color": "#484896",
          "fill-color": "#6e599f",
          "fill-opacity": 0.6
          },
          "filter": ["in", "fishnet_id", ""]
          });

      map.on('click', function(e) {
        // set bbox as 5px reactangle area around clicked point
        var bbox = [[e.point.x - 5, e.point.y - 5], [e.point.x + 5, e.point.y + 5]];
        var features = map.queryRenderedFeatures(bbox, { layers: ['grids_empty'] });
        var filter = features.reduce(function(memo, feature) {
        memo.push(feature.properties.fishnet_id);
        return memo;
        }, ['in', 'fishnet_id']);

        console.log(filter);

        map.setFilter("grid-highlighted", filter);
        map.setLayoutProperty('grid-highlighted', 'visibility', 'visible');
        fishinfo();
        map.setLayoutProperty('grids', 'visibility', 'none');
        // map.setLayoutProperty('grids_empty', 'visibility', 'none');
        // updating the ID info
        var id = filter[2];
        document.getElementById('fid').innerText = id;
        gethrinfoID(id);
        // getting the address info
        var coords = e.lngLat;

        var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + coords.lng.toString()+','+coords.lat.toString()+".json?access_token="+mapboxgl.accessToken;
        $.get(url, function(data){
            var dat = data;
            document.getElementById('neigh').innerText =addr(dat);
          });
        });
});


// map.on('style.load',function(){
//   map.addSource('fishnets', {
//         type: 'vector',
//         // data: poly
//         url:"mapbox://dhruvs04.8wuu9ip0"
//         });
//         map.addLayer({
//               "id":"grids",
//               "type":"fill",
//               'source': 'fishnets',
//               'source-layer':'fishJan-bhb97l',
//               'layout': {
//                 'visibility': 'visible'},
//               'paint':{
//                 'fill-color':'#f3f333',
//                 'fill-opacity': 0.3,
//                 'fill-outline-color':'#fff',
//               }
//               });
//
// });
