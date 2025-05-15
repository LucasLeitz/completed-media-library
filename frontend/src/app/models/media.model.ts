export enum MediaType {
  BOOK = 'BOOK',
  MOVIE = 'MOVIE',
  TV_SHOW = 'TV_SHOW',
  VIDEO_GAME = 'VIDEO_GAME'
}

export interface Media {
  id: number;
  title: string;
  imageUrl: string;
  completedDate: string;
  mediaType: MediaType;
  status: MediaStatus;
}

export enum MediaStatus {
  BACKLOG = 'BACKLOG',
  COMPLETED = 'COMPLETED'
}

