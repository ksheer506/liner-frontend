export interface DocumentItem {
  id: string;
  faviconUrl: string;
  imageUrl: string;
  title: string;
  url: string;
  netloc: string;
  isSaved: boolean;
}

export interface DocumentsResponse {
  documents: DocumentItem[];
  isLast: boolean;
}
