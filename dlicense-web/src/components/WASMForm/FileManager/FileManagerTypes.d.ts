export interface FileManagerState {
  softwareBinary: File;
}

export type FileManagerAction =
  | { type: 'SET_SOFTWARE_BINARY_FILE'; payload: File }
  | { type: 'REMOVE_SOFTWARE_BINARY_FILE'; }