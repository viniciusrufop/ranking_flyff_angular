import { Component, OnInit, Input } from '@angular/core';
import { PlayerInfo } from 'src/app/core/interfaces/player-info';

@Component({
  selector: 'app-ranking-player-info',
  templateUrl: './ranking-player-info.component.html',
  styleUrls: ['./ranking-player-info.component.scss']
})
export class RankingPlayerInfoComponent implements OnInit {

  @Input() player: PlayerInfo;
  @Input() title: string;

  constructor() { }

  ngOnInit(): void {
  }

}
