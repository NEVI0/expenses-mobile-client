import { Component, OnInit } from '@angular/core';

import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';

import { DashService } from '../dash.service';
import { ChartDataController } from '../../interfaces/ChartDataController';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})

export class ChartsComponent implements OnInit {

    private readonly AppUserData = environment.StorageUserData;

    public chartData$: Observable<ChartDataController[] | any>;

    public barChartOptions: ChartOptions = {
        responsive: true,
        legend: {
            display: false
        },
        layout: {
            padding: {
                right: 30,
                bottom: 10
            }
        }
    };
    public barChartData: ChartDataSets[] = [{
        data: [null, null, null, null, null, null, null, null, null, null, null, null],
        label: 'Lucro'
    }, {
        data: [null, null, null, null, null, null, null, null, null, null, null, null],
        label: 'Total Gasto'
    }, {
        data: [null, null, null, null, null, null, null, null, null, null, null, null],
        label: 'Média de Gastos'
    }, {
        data: [null, null, null, null, null, null, null, null, null, null, null, null],
        label: 'Total de Despesas'
    }];

    public barChartColors: Color[] =  [{
        backgroundColor: 'rgba(0, 200, 83, 1)',
        borderColor: 'rgba(0, 200, 83, 1)',
        pointBackgroundColor: 'rgba(0, 200, 83, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(0, 200, 83, 1)'
    }, {
        backgroundColor: 'rgba(229, 57, 53, 1)',
        borderColor: 'rgba(229, 57, 53, 1)',
        pointBackgroundColor: 'rgba(229, 57, 53, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(229, 57, 53, 1)'
    }, {
        backgroundColor: 'rgba(255, 206, 0, 1)',
        borderColor: 'rgba(255, 206, 0, 1)',
        pointBackgroundColor: 'rgba(255, 206, 0, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 206, 0, 1)'
    }, {
        backgroundColor: 'rgba(124, 77, 255, 1)',
        borderColor: 'rgba(124, 77, 255, 1)',
        pointBackgroundColor: 'rgba(124, 77, 255, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(124, 77, 255, 1)'
    }];

    public barChartLabels: Label[] = ['Jane.', 'Feve.', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agos.', 'Sete.', 'Outu.', 'Nove.', 'Dezem.'];
    public barChartType: ChartType = 'horizontalBar';
    public barChartLegend: boolean = true;

    constructor(
        private dashService: DashService,
        private storage: Storage
    ) {}

    ngOnInit() {
        this.onStart();
    }

    ionViewWillEnter() {
        this.onStart();
    }

    onStart() {
        this.storage.get(this.AppUserData).then(value => {
            const user = JSON.parse(value);

            this.chartData$ = this.dashService.getChartData(user._id, user.token).pipe(
                tap(resp => {
                    resp.forEach(item => {
                        this.barChartData[0].data[(item._id - 1)] = user.salary - item.sum;
                        this.barChartData[1].data[(item._id - 1)] = item.sum;
                        this.barChartData[2].data[(item._id - 1)] = item.avg;
                        this.barChartData[3].data[(item._id - 1)] = item.total;
                    });
                })
            );
        });
    }

    onRefresh(event) {
        setTimeout(() => {
            this.onStart();
            event.target.complete();
        }, 1500);
    }

}
