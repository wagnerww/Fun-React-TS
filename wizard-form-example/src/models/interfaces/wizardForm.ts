export interface IPageDetails {
  page: number;
  pageDescription: string;
}

export interface IPage {
  pageActual: number;
  pages: IPageDetails[];
}

export enum TswitchPage {
  Next = 1,
  Previous = 2
}
