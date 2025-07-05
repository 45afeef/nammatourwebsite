export interface NotionPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  cover?: string;
  excerpt?: string;
}

export interface NotionBlock {
  id: string;
  type: string;
  content: any;
}

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  date: string;
  cover: string;
  excerpt: string;
  author: string;
  authorAvatar: string;
  tags: string[];
  readingTime: string;
  featured: boolean;
  views?: number;
  likes?: number;
};
