export interface UploadResult {
  success: boolean;
  checksum?: string;
  error?: string;
}

export interface StorageAdapter {
  upload(localPath: string, remotePath: string): Promise<UploadResult>;
  verify(remotePath: string): Promise<boolean>;
}
