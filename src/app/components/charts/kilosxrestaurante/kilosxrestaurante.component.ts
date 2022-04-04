import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DashboardService } from 'src/app/providers/dashboard/dashboard.service';
import * as moment from 'moment';

@Component({
  selector: 'app-kilosxrestaurante',
  templateUrl: './kilosxrestaurante.component.html',
  styleUrls: ['./kilosxrestaurante.component.scss']
})
export class KilosxrestauranteComponent implements OnInit {


  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  chartData: Array<any> = [];
  categories: Array<any> = [];

  constructor( private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getKilosRestaurante();
  }

  getKilosRestaurante() {
    this.dashboardService.getKilosRestaurante(2022)
      .subscribe( resp => {
        this.cargarDatos(resp).
        then( x => {
          this.cargarChart();
      });
        }
      );
  }

  cargarDatos( resp: any ) {
    this.chartData = [];
    this.categories = [];
    return new Promise( ( resolve, reject) => {
      Highcharts.objectEach(resp, (value, property) => {
        this.chartData.push( [+property, value.kilos ]);
        this.categories.push(value.restaurante);
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
        text: 'Top 20 restaurantes en recogida de kilos de aceite' 
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
        data: this.chartData.slice(0,20)
      }],
      

    }
  }

}
