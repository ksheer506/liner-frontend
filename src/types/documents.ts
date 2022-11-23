export interface DocumentItemType {
  id: string;
  faviconUrl: string;
  imageUrl: string;
  title: string;
  url: string;
  netloc: string;
  isSaved: boolean;
}

export interface DocumentsResponse {
  documents: DocumentItemType[];
  isLast: boolean;
}
