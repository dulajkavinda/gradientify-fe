import getGradient from "@/services/get-gradient";
import convertToBase64 from "@/utils/conver-to-base64";
import React, { ChangeEvent, useState, useCallback } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import LoadingIcon from "../loading/LoadingIcon";
import Compressor from "compressorjs";
import styles from "./Upload.module.css";

const Upload = () => {
  const [gradient, setGradient] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: any) => {
    setIsUploading(true);
    const selectedFile = acceptedFiles?.[0];
    if (!selectedFile) return;

    new Compressor(selectedFile, {
      quality: 0.1,
      success: async (compressedImage: File) => {
        const base64Image = await convertToBase64(compressedImage);
        if (base64Image) {
          const gradient = await getGradient(base64Image.toString());
          setGradient(gradient.data);
          setIsUploading(false);
        }
      },
      error(err) {
        setIsUploading(false);
        alert(err.message);
      },
    });
  }, []);

  const copyGradient = () => {
    if (gradient) {
      navigator.clipboard.writeText(gradient);
      setIsClicked(true);
      setTimeout(() => {
        setIsClicked(false);
      }, 1000);
    }
  };

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
      >
        {isUploading && <LoadingIcon />}
        {gradient && !isUploading && (
          <div onClick={copyGradient} className={styles.copy}>
            {isClicked ? "COPIED" : "COPY"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
