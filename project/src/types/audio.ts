export interface DownloadStatus {
  isDownloaded: boolean;
  progress: number;
  localUri?: string;
}

export interface DownloadState {
  [key: string]: DownloadStatus;
}