import { Component, Input, OnInit } from '@angular/core';
import { PlayerInfo } from "../../core/interfaces/player-info";

@Component({
  selector: 'app-ranking-level-table',
  templateUrl: './ranking-level-table.component.html',
  styleUrls: ['./ranking-level-table.component.scss']
})
export class RankingLevelTableComponent implements OnInit {

  @Input() ranking: Array<PlayerInfo>;

  constructor() { }

  ngOnInit(): void {
  }

}
