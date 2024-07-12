export interface IReport {
  _id: string;
  address: string;
  text: string;
  imgUrl: string | null;
  lat: number;
  lng: number;
  selectedFile: File | null;
  CategoryId: string;
  totalshares: number;
  status: string;
  progress: {
    officerId: string;
    text: string;
    imgUrl: string;
  };
  UpvotedUserIds: [];
  DownVotedUserIds: [];
}

export interface IReportForm {
  address: string;
  text: string;
  imgUrl: string | null;
  lat: number;
  lng: number;
  selectedFile: File | null;
  CategoryId: string;
  totalshares: number;
  status: string;
  progress: {
    officerId: string;
    text: string;
    imgUrl: string;
  };
  UpvotedUserIds: [];
  DownVotedUserIds: [];
}

export interface IReportProgressForm {
  text: string;
  imgUrl: string;
}
