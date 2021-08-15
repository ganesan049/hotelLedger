import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment'

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent implements OnInit {

  currentDate = moment();
  todayDate = this.currentDate.format('YYYY-MM-DD');
  yesterdayDate = this.currentDate.subtract(1,'days').format('YYYY-MM-DD');
  startWeekDate = this.currentDate.clone().startOf('week').format('YYYY-MM-DD');
  endWeekDate = this.currentDate.clone().endOf('week').format('YYYY-MM-DD');
  startMonthDate = this.currentDate.clone().startOf('month').format('YYYY-MM-DD');
  endMonthDate = this.currentDate.clone().endOf('month').format('YYYY-MM-DD');
  filters = [{value:'Today',date:{startDate:this.todayDate,endDate:this.todayDate},selected:true},{value:'Yesterday',date:{startDate:this.yesterdayDate,endDate:this.yesterdayDate}},{value:'Week',date:{startDate:this.startWeekDate,endDate:this.endWeekDate}},{value:'Month',date:{startDate:this.startMonthDate,endDate:this.endMonthDate}}];
  filtersDefault = [{value:'Today',date:{startDate:this.todayDate,endDate:this.todayDate}},{value:'Yesterday',date:{startDate:this.yesterdayDate,endDate:this.yesterdayDate}},{value:'Week',date:{startDate:this.startWeekDate,endDate:this.endWeekDate}},{value:'Month',date:{startDate:this.startMonthDate,endDate:this.endMonthDate}}];
  selectedFilter = 'Today';

  @Output() date = new EventEmitter();
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log(this.startWeekDate,this.endWeekDate)
  }
  toggleSelection(value: any) {
    let date:any;
    this.filters = [...this.filtersDefault];
    this.filters.forEach(list => {
      if(list.value == value){
        list.selected = true;
        let {startDate,endDate} = {...list.date};
        date = {startDate,endDate,value}
      }
    });
    this.cdr.detectChanges();
    this.date.emit(date)
 }
}
