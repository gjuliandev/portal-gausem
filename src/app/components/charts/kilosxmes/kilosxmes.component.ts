
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

  anio = new Date().getFullYear();
  
  constructor( private dashboardService: DashboardService ) { }

  ngOnInit(): void {
    this.getKilosMes();
  }

  getKilosMes() {
    this.dashboardService.getKilosMes(this.anio)
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
        this.chartData.push( [+property, value.kilos ]);
        this.categories.push(value.mes)
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
        text: 'Kilos recogidos por mes en el año ' + this.anio 
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
