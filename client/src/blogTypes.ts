export type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PostFormValues = {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  published: boolean;
};
