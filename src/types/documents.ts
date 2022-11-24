export interface Identified {
  id: string;
}

export interface DocumentItemType extends Identified {
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
