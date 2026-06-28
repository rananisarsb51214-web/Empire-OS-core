export class SftpAdapter implements StorageAdapter {
  async upload(local: string, remote: string): Promise<UploadResult> {
    // SFTP logic here (Vendor locked logic moves here)
    return { success: true };
  }

  async verify(remote: string): Promise<boolean> {
    // Checksum logic here
    return true;
  }
}
