
function createChart (arr){

  var labels = [], data=[];

  chartJson.forEach(function(p) {
      labels.push(p.Hour);
      data.push(p.countP);
    });
    console.log(labels,data);

    var tempData = {
          labels : labels,
          datasets : [{
              label:"Number of Jams per hour",
              data: data,
              fill: false,
              backgroundColor: "rgb(75, 192, 192)",
              borderWidth: 0,

              // lineTension:0.1

          }]
        };
        // var ctx = document.getElementById("chart2");

        // Instantiate a new chart
      new Chart(document.getElementById("chart"),
          {"type":"bar",
           "data":tempData,
           "options":{
               legend: {
                  display: false,
                  position: 'right',
                },
              scales:{
                xAxes: [{
                   ticks: {
                     fontSize: 8,
                   }
                 }],
              },}
        });

      new Chart(document.getElementById("chart2"),
        {"type":"bar",
         "data":tempData,
         "options":{
             legend: {
                display: false,
                position: 'right',
              },
            scales:{
              xAxes: [{
                 ticks: {
                   fontSize: 10,
                   fontColor: '#fff'
                 }
               }],
            },}
      });

}
