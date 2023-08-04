export interface FileManagerState {
  softwareBinary: ArrayBuffer | string;
}

export type FileManagerAction =
  | { type: 'SET_SOFTWARE_BINARY_FILE'; payload: ArrayBuffer | string }
  | { type: 'REMOVE_SOFTWARE_BINARY_FILE'; }