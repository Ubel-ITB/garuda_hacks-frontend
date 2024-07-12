export interface IPost {
  _id: string;
  AuthorId: string;
  authorName?: string;
  authorProfilePictureUrl?: string;
  title: string;
  content: string;
  imgUrl: string;
  CategoryId: string;
  categoryName?: string;
}
