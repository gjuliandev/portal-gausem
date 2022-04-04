
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as moment from 'moment';
import { DashboardService } from 'src/app/providers/dashboard/dashboard.service';

@Component({
  selector: 'app-kilosxmes',
  templateUrl: './kilosxmes.component.html',
  styleUrls: ['./kilosxmes.component.scss']
})
export class KilosxmesComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = Object(null);

  chartData: Array<any> = [];
  categories: Array<any> = [];
  
  constructor( private dashboardService: DashboardService ) { }

  ngOnInit(): void {
    this.getKilosMes();
  }

  getKilosMes() {
    this.dashboardService.getKilosMes(2022)
      .subscribe( (resp: any) =>  {
        if (resp) {
          this.cargarDatos(resp).
            then( x => {
              this.cargarChart();
          });
        }
      });
  }

  cargarDatos( resp: any ) {
    this.chartData = [];
    this.categories = [];
    return new Promise( ( resolve, reject) => {
      Highcharts.objectEach(resp, (value, property) => {
        this.chartData.push( [+property, value.kilos, 'MARZO' ]);
        this.categories.push(moment(value.fecha).format('DD-MM'))
      });
      resolve(true);
    });
  }

  async cargarChart() {
    this.chartOptions = {
      chart: {
        zoomType: 'x'
      },

      title: { 
        text: 'Kilos recogidos por mes' 
      },
      legend: {
        enabled: false
      },
      xAxis: {
        categories: this.categories,
        type: 'datetime',
        crosshair: true
      },
      yAxis: {
        title: {
          'text': 'Kilos'
        }
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: false
          },
          enableMouseTracking: false
        }
      },
      series: [{
        type: 'column',
        name: '',
        data: this.chartData
      }]
    }
  }

}
