import { environment } from './../../../environments/environment';
import { FlyffService } from './../../core/services/flyff.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { PlayerInfo } from 'src/app/core/interfaces/player-info';

@Component({
  selector: 'app-ranking-level',
  templateUrl: './ranking-level.component.html',
  styleUrls: ['./ranking-level.component.scss']
})
export class RankingLevelComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;

  public ranking: Array<PlayerInfo> = [];
  public classes = {
    26: 'Jester',
    29: 'Billposter',
    32: 'Knight',
    33: 'Blade',
    34: 'Jester',
    35: 'Ranger',
    36: 'Ringmaster',
    37: 'Billposter',
    38: 'Psykeeper',
    39: 'Elementor',
  }
  public refresh = false;
  public maiorTempo: PlayerInfo;
  public menorTempo: PlayerInfo;
  public qtdeClasses: Array<{classe: string, quantidade: number}>;
  public mobile: boolean;

  public dataTeste: any[] = [{
    kind: 'Hydroelectric', share: 0.175
  }, {
    kind: 'Nuclear', share: 0.238
  }, {
    kind: 'Coal', share: 0.118
  }, {
    kind: 'Solar', share: 0.052
  }, {
    kind: 'Wind', share: 0.225
  }, {
    kind: 'Other', share: 0.192
  }];

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.mobile = (window.innerWidth <= 415);
  }

  constructor(
    private flyffService: FlyffService
  ) { }

  ngOnInit(): void {
    this.mobile = (window.innerWidth <= 415);
    this.getHtmlCode();
  }

  labelContent(e: any): string {
    return `${e.category} (${e.dataItem.quantidade})`;
  }

  getHtmlCode(): void {
    this.blockUI.start();

    this.flyffService.ranking().subscribe((res: string) => {
      this.pushArray(res);
      this.refresh = false;
    }, error => {
      console.log('Error', error);
      this.refresh = true;
    }).add(() => { this.blockUI.stop(); });
  }

  pushArray(htmlCode: string): void {
    const div = document.createElement('div');

    div.innerHTML = htmlCode.trim();

    let table = div.querySelector('.tabela_rank');

    let rowsTable = table.querySelector("tbody").querySelectorAll("tr");

    rowsTable.forEach((row, rowIndex) => {

      let cols = row.querySelectorAll('td');

      let rank = cols[0].querySelector('img');

      let numClass = this.getNumClass(cols[2].querySelector('img').src.split('/').slice(-1)[0].split('.')[0]);

      this.ranking.push({
        rank: rank ? `${environment.flyffUrl}/${rank.src.split('/').slice(-2).join('/')}` : cols[0].innerHTML.trim(),
        nome: cols[1].innerHTML.trim(),
        classe: {
          num: numClass,
          url1: `${environment.flyffUrl}/${cols[2].querySelector('img').src.split('/').slice(-3).join('/')}`,
          url2: `${environment.flyffUrl}/${cols[2].querySelectorAll('img')[1].src.split('/').slice(-3).join('/')}`,
          className: this.classes[numClass]
        },
        tempoOn: parseInt(cols[3].innerHTML.trim()),
        level: cols[4].innerHTML.trim(),
      });

    });

    if (this.ranking) {
      this.getMenorTempo();
      this.getMaiorTempo();
      this.getQdeClasses();
    }
  }

  getNumClass(num): number | string {
    if (num == 26 ) return 34;
    if (num == 29 ) return 37;
    return parseInt(num);
  }

  getMenorTempo() {
    this.menorTempo = this.ranking.reduce((a,b)=>{
      if(b.tempoOn < a.tempoOn) a = b;
      return a;
    });
  }

  getMaiorTempo() {
    this.maiorTempo = this.ranking.reduce((a,b)=>{
      if(b.tempoOn > a.tempoOn) a = b;
      return a;
    });
  }

  getQdeClasses() {
    let objClass = {
      'Knight': 0,
      'Blade': 0,
      'Jester': 0,
      'Ranger': 0,
      'Ringmaster': 0,
      'Billposter': 0,
      'Psykeeper': 0,
      'Elementor': 0,
    }

    for(let item of this.ranking) {
      objClass[this.classes[item.classe.num]] += 1;
    }

    this.qtdeClasses = Object.entries(objClass).map(array => {
      return {
        classe: array[0],
        quantidade: array[1]
      }
    });
  }

}
