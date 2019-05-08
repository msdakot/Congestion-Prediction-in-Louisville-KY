
$(window).on('load',function(){
$('#exampleModal').modal('show');
});

// $('#close').click( function(){
//    $('.navbar-primary').collapse('toggle');
//  });

  $('.btn-expand-collapse').click(function(e) {
    $('.navbar-primary').toggleClass('collapsed');
    $(".rotate").toggleClass("down");
  });

  $('.filter-manager').hide();
  $('.interaction-manager').hide();
  $('.chart-container').hide();
  $('.hr-scrl').hide();

  $('.Interact').click(function(e){
    $('.filter-manager').hide();
    $('.chart-container').hide();
    $('.hr-scrl').hide();
    $('.interaction-manager').show();
  });

  $('.Filter').click(function(e) {
    $('.interaction-manager').hide();
    $('.filter-manager').show();
    $('.chart-container').show();
    $('.hr-scrl').show();
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
      $('.interaction-manager').show();
  };

function colpa () {
      $('.navbar-primary').toggleClass('collapsed');
      $(".rotate").toggleClass("down");
  };
//
  $(".filt-list li a").click(function(){
  $(this).parents(".dropdown").find('.btn-secondary').html($(this).text() + ' <span class="item-dropdown"></span>');
  $(this).parents(".dropdown").find('.btn').val($(this).html());
  var red= $(this).parents(".dropdown").find('.btn').val($(this).html());
  var txt = $(this).parents(".dropdown").find('.btn-secondary').html($(this).text());
  console.log(red);
});


$('#demolist li a').on('click', function(){
    $('#datebox').val($(this).html());
});


var mt;

// document.getElementById('mslider').addEventListener('input', function(e) {
//   mt = parseInt(e.target.value);
//     console.log(mt);
// });

function choosepoly(n){
  if(n==1){return polyAr[0];
  } else if (n==2) {
    return polyAr[1];}
  // }else if (n==3) {
  //   return poly[2];
  // }else if (n==4) {
  //   return poly[3];
  // }else if (n==5) {
  //   return poly[4];
  // } else if (n==6) {
  //   return poly[5];
  // }
}

// $('.mslider').Slider({ id: "slider12b", min: 1, max: 12, range: true, value:[3, 7] });

// $('.mslider').on('change', function(event) {
//   .addEventListener('input', function(e) {
//     mt = parseInt(e.target.value);
//         console.log(mt);
//   });
// });
var a =1;

$('#mslider').slider().on('change', function(e) {
     a = parseInt(e.target.value);
    if(a!==1){
      console.log("changed",a);
    } else {
      console.log("still on ", a);
    }

    return chMonth(a);
});


//
function chMonth(n){
  var grprev, gr;
  if(n==2) {
      grprev= 'grids';
      gr  = 'grids-f';
    } else if (n==3) {
      grprev= 'grids-f';
      gr = 'grids-m';
    } else if(n==4) {
      grprev= 'grids-m';
      gr = 'grids-a';
    }
    map.setLayoutProperty(gr, 'visibility', 'visible');
    map.setLayoutProperty(grprev, 'visibility', 'none');
    console.log("other month turned on!");

    yetano(gr);
};


function yetano(gr){
  map.on('mouseenter', gr, function (e) {
        map.getCanvas().style.cursor = 'pointer';
    });


  map.on('mouseleave', gr, function () {
        map.getCanvas().style.cursor = '';
    });
      //
      document.getElementById('wslider').addEventListener('input', function(e) {
        var wDay = parseInt(e.target.value);
        var weekD = getWeekday(wDay);
        // update the map
          flt_wDay = ['==', "Weekday", weekD];
          map.setFilter(gr, ['all',flt_wDay, flt_hr]);
          console.log("inside function",weekD);
        });

        function filterBy(hour) {

            var flt_hr = ['==', "Hour", hour];
            map.setFilter(gr, ['all',flt_wDay, flt_hr]);
            // map.setLayoutProperty('grids_empty', 'visibility', 'none');
        }

      document.getElementById('hslider').addEventListener('input', function(e) {
        var hour= parseInt(e.target.value);
          console.log(hour);
          filterBy(hour);
      });
}
