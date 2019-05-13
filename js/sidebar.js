
$(window).on('load',function(){
$('#exampleModal').modal('show');
});


$('.btn-expand-collapse').click(function(e) {
  $('.navbar-primary').toggleClass('collapsed');
  $(".rotate").toggleClass("down");
});

$('.filter-manager').hide();
$('.interaction-manager').hide();
$('.chart-container').hide();
$('.hr-scrl').hide();
$('.legend').hide();

$('.Interact').click(function(e){
  $('.filter-manager').hide();
  $('.chart-container').hide();
  $('.hr-scrl').hide();
  $('.legend').hide();
  $('.interaction-manager').show();
});

$('.Filter').click(function(e) {
  $('.interaction-manager').hide();
  $('.filter-manager').show();
  $('.chart-container').show();
  $('.hr-scrl').show();
  $('.legend').show();
  map.setLayoutProperty('grids', 'visibility', 'visible');
  map.setLayoutProperty('grid-highlighted', 'visibility', 'none');
});


$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus');
  $('#chart2').show();
});

var fishinfo =  function () {
    $('.filter-manager').hide();
    $('.chart-container').hide();
    $('.hr-scrl').hide();
    $('.legend').hide();
    $('.interaction-manager').show();
};

function colpa () {
    $('.navbar-primary').toggleClass('collapsed');
    $(".rotate").toggleClass("down");
  };




$(".filt-list li a").click(function(){
  $(this).parents(".dropdown").find('.btn-secondary').html($(this).text() + ' <span class="item-dropdown"></span>');
  $(this).parents(".dropdown").find('.btn-secondary').val($(this).html());
  red= $(this).parents(".dropdown").find('.btn-secondary').val($(this).html()).context.text;
  console.log(red);
  return red;
});

function getWeather(r){
  if(r=="Cloudy"){
    return "cloudy";
  }else if (r =="Rainy") {
    return "rainy";
  }
}

$('#demolist li a').on('click', function(){
    $('#datebox').val($(this).html());
});


// var mt,weekD,chartJson,chartM ;



function getWeekday(n){
  if(n==1){
    return "Monday";
  } else if (n==2) {
    return "Tuesday";
  } else if(n==3) {
    return "Wednesday";
  }else if(n==4) {
    return "Thursday";
  } else if(n==5) {
    return "Friday";
  }else if(n==6) {
    return "Saturday";
  }else if(n==7) {
    return "Sunday";
  }
};

function getMonth(n){
  if(n==1){
    return "January";
  } else if (n==2) {
    return "Febuary";
  } else if(n==3) {
    return "March";
  }else if(n==4) {
    return "April";
  } else if(n==5) {
    return "May";
  }else if(n==6) {
    return "June";
  }else if(n==7) {
    return "July";
  }else if(n==8) {
    return "August";
  }else if(n==9) {
    return "September";
  }else if(n==10) {
    return "October";
  }else if(n==11) {
    return "November";
  }else if(n==12) {
    return "December";
  }
};

function getFreeway(n){
  if(n==1){
    return "Freeway";
  } else if (n==0) {
    return "Other road";
  }
}



var a =1;

$('#mslider').slider().on('change', function(e) {
     a = parseInt(e.target.value);
    if(a!==1){
      console.log("changed",a);
    } else {
      console.log("still on ", a);
    }
    return chMonth(a),chartFilter(a,chartPar);
});

function yetano(gr){


  var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });


  map.on('mouseenter', gr, function (e) {
        map.getCanvas().style.cursor = 'pointer';

        var coordinates = e.lngLat;

        var id =  "Grid ID: " +e.features[0].properties.FishnetID.toString();
        var Month = getMonth(e.features[0].properties.Mnth);
        var Wday = e.features[0].properties.Weekday;
        var Weat = e.features[0].properties.Weather;
        var fway = getFreeway(e.features[0].properties.Freeway);
        var hr = e.features[0].properties.Hour.toString() +" hrs";
        var obs = e.features[0].properties.Observed.toString() +" mins";
        var Pred = e.features[0].properties.Predicted.toString()+" mins";
        var er =e.features[0].properties.MAE.toString()+" mins";

        var forHTML = "<strong>"+id.fontsize(2)+"</strong>"+"<br>"+"<br>"+ Month+" "+Wday+ " "+ hr+"<br>"+"Weather: "+Weat+"<br>"+ "Road type: "+fway+"<br>"+"Predicted: "+Pred+"<br>"+"Observed: "+obs+"<br>"+"Error: "+er;

        popup.setLngLat(coordinates)
          .setHTML(forHTML)
          .addTo(map);

    });


  map.on('mouseleave', gr, function () {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });

}



function chMonth(n){
  var grprev, gr,gr3;
  if(n==1){
    gr  = 'grids';
    grprev='none';
    gr3 = 'grids-f'
    } else if(n==2) {
      grprev= 'grids';
      gr  = 'grids-f';
      gr3 = 'grids-m'
    } else if (n==3) {
      grprev= 'grids-f';
      gr = 'grids-m';
      gr3 = 'grids-a'
    } else if(n==4) {
      grprev= 'grids-m';
      gr = 'grids-a';
      gr3 = 'grids-j'
    }

    if(gr!=='grids'){

    map.setLayoutProperty(gr, 'visibility', 'visible');
    map.setLayoutProperty(grprev, 'visibility', 'none');
    map.setLayoutProperty(gr3, 'visibility', 'none');
  }else {
     map.setLayoutProperty(gr, 'visibility', 'visible');
     map.setLayoutProperty(gr3, 'visibility', 'none');
  }
    console.log("other month turned on!");

    yetano(gr);
    sliderRegi(gr);
};



function chartFilter (m,arr){
    chartM = arr.filter(f=>f.Mnth ===m);
    console.log(chartM);
    };


function chartWeek (w,arr){
  // let w = weekD;
  chartJson= arr.filter(f=> f.Weekday===w);
  console.log(chartJson);
  // return chartJson;
}

function sliderRegi(gr){

  $('#wslider').on('input', function(e) {
      var wDay = parseInt(e.target.value);
       weekD = getWeekday(wDay);
      // update the map
        // flt_wDay = ['==',"Weekday", weekD];
        flt_wDay = ['==','Weekday',weekD]
        console.log(flt_wDay,flt_hr);
        map.setFilter(gr, ['all',flt_wDay, flt_hr]);
        chartWeek(weekD,chartM);
        createChart(chartJson);
        console.log("inside function",weekD);
      });

      // flt_wea = ['==',"Weather",red];

      function filterBy(hour) {

          var flt_hr = ['==',"Hour", hour];
          map.setFilter(gr, ['all',flt_wDay, flt_hr]);
          // map.setLayoutProperty('grids_empty', 'visibility', 'none');
      }

    $('#hslider').on('input', function(e) {
      var hour= parseInt(e.target.value);
        console.log(hour);
        filterBy(hour);
    });

}
