import * as React from "react";

export interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

/**
 * UX4G FileUpload — drag-and-drop dropzone with a removable selected-file list.
 *
 * @startingPoint section="Forms" subtitle="Drag-and-drop file upload with file list" viewport="700x340"
 */
export interface FileUploadProps {
  label?: string;
  hint?: string;
  accept?: string;
  multiple?: boolean;
  files?: UploadedFile[];
  onChange?: (files: UploadedFile[]) => void;
}

export declare function FileUpload(props: FileUploadProps): JSX.Element;
export default FileUpload;
