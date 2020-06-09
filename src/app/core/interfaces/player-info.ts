export interface PlayerInfo {
  rank: any;
  nome: string;
  classe: {
    num: number | string;
    url1: string;
    url2: string;
    className: string;
  };
  tempoOn: number;
  level: number | string;
}