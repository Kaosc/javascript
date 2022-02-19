
var public_spreadsheet_url = '###PUBLIC GOOGLE SHEETS CSV LINK HERE###';

function init() {
  Papa.parse(public_spreadsheet_url, {
    download: true,
    header: true,
    complete: showInfo
  })
}

window.addEventListener('DOMContentLoaded', init)

function showInfo(results) {
  var Sheetdata = results.data

  // ---------- PARSE DATA TO EACH LISTS ----------

  var names = Sheetdata.map(function(name){
    return name.Name;
  });

  var salarys = Sheetdata.map(function(salary){
    return salary.Salary;
  });

  var totalData = Sheetdata.length; 

  console.log(salarys[0]);


  // ---------- GOOGLE CHART START ----------

  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);

  function drawChart() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Name');
    data.addColumn('number', 'Salary');
    data.addRows(totalData);

    for (let i = 0; i < totalData; i++) {
      data.setCell(i, 0, names[i]);
      data.setCell(i, 1, salarys[i]);
    }

    // Set chart options
    var options = {'title':'How Much Pizza I Ate Last Night',
                  "is3D": true,
                  'width':1280,
                  'height':720};

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.LineChart(document.getElementById('table_div'));
    chart.draw(data, options);
  }

  // ---------- GOOGLE CHART END ----------

}


