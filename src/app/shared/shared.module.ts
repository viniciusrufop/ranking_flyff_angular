import { GridModule } from '@progress/kendo-angular-grid';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatDividerModule} from '@angular/material/divider';

import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    CommonModule,
    GridModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    ChartsModule
  ]
})
export class SharedModule { }
