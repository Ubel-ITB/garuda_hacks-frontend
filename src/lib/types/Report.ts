export interface IReportForm {
  address: string;
  text: string;
  imgUrl: string | null;
  lat: number;
  lng: number;
  selectedFile: File | null;
  CategoryId: string;
}
