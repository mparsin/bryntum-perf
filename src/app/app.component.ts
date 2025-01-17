import {Component, viewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BryntumSchedulerProComponent, BryntumSchedulerProModule} from '@bryntum/schedulerpro-angular';
import {ResourceTimeRangeModel, SchedulerPro, SchedulerResourceModel} from '@bryntum/schedulerpro';
import { schedulerProProps } from './app.config';
import { projectData } from './app.data';
import {MyTimeRangeStore} from './myTimeRange';

@Component({
  selector: 'app-root',
  imports: [BryntumSchedulerProModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bryntum-perf';

  private schedulerPro?: SchedulerPro;
  schedulerProComponent = viewChild.required<BryntumSchedulerProComponent>('schedulerpro');

  schedulerProProps = schedulerProProps;
  // projectData = projectData;

  timeRangeStore = new MyTimeRangeStore();

  /**
   * Called after View is initialized
   */
  ngAfterViewInit(): void {
    // SchedulerPro instance
    this.schedulerPro = this.schedulerProComponent().instance;
  }

  resourceTimeRangeRenderer = (detail: {
    resourceTimeRangeRecord: ResourceTimeRangeModel;
    resourceRecord: SchedulerResourceModel;
    renderData: any
  }) => {


    if (detail.renderData['width'] > 50 ) {  // Adjust the width threshold to your needs
      // @ts-ignore
      return detail.resourceTimeRangeRecord['data'].name
    } else {
      return '';  // No label if space is insufficient
    }
  }
}
