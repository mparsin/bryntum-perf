import {ApplicationConfig, ErrorHandler, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {BryntumSchedulerProProps} from '@bryntum/schedulerpro-angular';
import {MyTimeRangeStore} from './myTimeRange';
import {AppErrorHandler} from './error.handler';

const myTimeRangeStore = new MyTimeRangeStore();

export const schedulerProProps: BryntumSchedulerProProps = {
  timeRangesFeature : {
    showCurrentTimeLine : true,
    showHeaderElements  : false
  },
  resourceTimeRangesFeature:{
    showCurrentTimeLine : false,
    showHeaderElements  : true,
  },
  dependenciesFeature: true,
  selectionMode: {
    checkboxOnly: true,
    multiSelect: false
  },
  eventDragFeature: true,
  panFeature : {
    vertical: false,
    horizontal: true,
  },
  project : {
    // use our store for time ranges (crudManager will load it automatically among other project stores)
    timeRangeStore : myTimeRangeStore
  },
  crudManager : {
    autoLoad  : true,
    transport : {
      load : {
        url : 'assets/data/data.json'
      }
    },
    // This config enables response validation and dumping of found errors to the browser console.
    // It's meant to be used as a development stage helper only so please set it to false for production systems.
    validateResponse : true
  },
  headerZoomFeature: true,
  columns    : [
    { type : 'resourceInfo', text : 'Staff', field : 'name', width : '10em' }
  ],

  startDate  : new Date(2024, 12, 1, 8),
  endDate    : new Date(2025, 3, 1, 18),
  viewPreset : {
    tickWidth : 50,
    base      : 'dayAndWeek'
  }
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),

    { provide : ErrorHandler, useClass : AppErrorHandler }
  ]
};
