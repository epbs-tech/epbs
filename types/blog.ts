// types/blog.ts
export interface BlogContent {
  id: number;
  type: 'TEXT' | 'NUMBERED_LIST' | 'BULLET_LIST' | 'TABLE';
  order: number;
  text?: string;
  listItems?: string[];
  listType?: 'NUMBERED' | 'BULLET';
  tableData?: {
    headers: string[];
    rows: string[][];
  };
}

export interface BlogSection {
  id: number;
  title: string;
  order: number;
  contents: BlogContent[];
}

export interface BlogData {
  title: string;
  author: string;
  description?: string;
  published?: boolean;
  sections: BlogSection[];
}