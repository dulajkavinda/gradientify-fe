import getGradient from "@/services/get-gradient";
import convertToBase64 from "@/utils/conver-to-base64";
import React, { ChangeEvent, useState, useCallback } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import styles from "./Upload.module.css";

const Upload = () => {
  const [gradient, setGradient] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: any) => {
    const selectedFile = acceptedFiles?.[0];
    if (!selectedFile) return;

    const base64Image = await convertToBase64(selectedFile);

    if (base64Image) {
      const gradient = await getGradient(base64Image.toString());
      setGradient(gradient.data);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className={styles.container}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p className={styles.fileDrop}>drag your image here</p>
      </div>

      <div
        className={styles.preview}
        style={{
          background: gradient?.toString(),
        }}
      ></div>
    </div>
  );
};

export default Upload;
