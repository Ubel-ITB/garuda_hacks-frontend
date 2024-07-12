export interface ILocation {
  lat: number;
  lng: number;
}

export interface IReportForm {
  address: string;
  text: string;
  imgUrl: string | null;
  location: ILocation;
  selectedFile: File | null;
  selectedCategory: string;
}
