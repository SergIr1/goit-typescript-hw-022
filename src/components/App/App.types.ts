export interface Photo {
  id: string;
  urls: { small: string; regular: string };
  slug: string;
  likes: number;
  user: { name: string };
  description: string;
}
