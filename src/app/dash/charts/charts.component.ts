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
                right: 30
            }
        }
    };
    public barChartData: ChartDataSets[] = [{
        data: [null, null, null, null, null, null, null, null, null, null, null, null],
        label: 'Média'
    }, {
        data: [null, null, null, null, null, null, null, null, null, null, null, null],
        label: 'Total'
    }];

    public barChartColors: Color[] =  [{
        backgroundColor: 'rgba(98, 0, 234, 1)',
        borderColor: 'rgba(98, 0, 234, 1)',
        pointBackgroundColor: 'rgba(98, 0, 234, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(98, 0, 234, 1)'
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

    onStart() {
        this.storage.get(this.AppUserData).then(value => {
            const user = JSON.parse(value);

            this.chartData$ = this.dashService.getChartData(user._id, user.token).pipe(
                tap(resp => {
                    resp.forEach(item => {
                        this.barChartData[0].data[(item._id - 1)] = item.avg;
                        this.barChartData[1].data[(item._id - 1)] = item.total;
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
