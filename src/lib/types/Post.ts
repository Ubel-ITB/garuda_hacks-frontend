export interface IPost {
  _id: string;
  AuthorId: string;
  authorName?: string;
  authorProfilePicUrl?: string;
  title: string;
  content: string;
  imgUrl: string;
  CategoryId: string;
  categoryName?: string;
}
