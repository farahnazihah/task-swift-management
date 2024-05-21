export interface FileProps {
  Key: string;
  LastModified: string;
  StorageClass: string;
  Owner: {
    DisplayName: string;
    ID: string;
  };
}
