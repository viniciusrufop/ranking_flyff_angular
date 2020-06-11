import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';

import { RankingRoutingModule } from './ranking-routing.module';
import { RankingLevelComponent } from './ranking-level/ranking-level.component';
import { RankingPlayerInfoComponent } from './ranking-player-info/ranking-player-info.component';
import { RankingLevelTableComponent } from './ranking-level-table/ranking-level-table.component';


@NgModule({
  declarations: [
    RankingLevelComponent,
    RankingPlayerInfoComponent,
    RankingLevelTableComponent
  ],
  imports: [
    SharedModule,
    RankingRoutingModule
  ]
})
export class RankingModule { }
