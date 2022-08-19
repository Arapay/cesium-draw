import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-echartstest',
  templateUrl: './echartstest.component.html',
  styleUrls: ['./echartstest.component.scss']
})
export class EchartstestComponent implements OnInit {
  options:any
  constructor() { }

  ngOnInit(): void {
    this.options = {
      tooltip: {
          show: true
      },
      legend: {
          data:['销量']
      },
      xAxis : [
          {
              type : 'category',
              data : ["1","2","3","4","5","6"]
          }
      ],
      yAxis : [
          {
              type : 'value'
          }
      ],
      series : [
          {
              "name":"销量",
              "type":"bar",
              "data":[5, 20, 40, 10, 10, 20]
          }
      ]
  	};

  }

}
