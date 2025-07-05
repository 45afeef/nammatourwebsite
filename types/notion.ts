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
