import React, { useState } from "react";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import convertToBase64 from "@/utils/conver-to-base64";
import getGradient from "@/services/get-gradient";
import { ChangeEvent } from "react";
import { HERO_TITLE, SUB_TITLE } from "@/config/constants";
import Upload from "./components/upload/Upload";
import Info from "./components/info/Info";
import Prompt from "./components/prompt/Prompt";

export default function Home() {
  const [gradient, setGradient] = useState<string | ArrayBuffer | null>(null);

  const onFileUploadChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const base64Image = await convertToBase64(selectedFile);

    if (base64Image) {
      const gradient = await getGradient(base64Image.toString());
      setGradient(gradient.data);
    }
  };

  return (
    <>
      <Head>
        <title>gradientify.io 🌈</title>
        <meta name="description" content="Covert your images into gradients!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        style={{
          background: gradient?.toString(),
        }}
        className={styles.main}
      >
        <div className={styles.headings}>
          <h1>{HERO_TITLE}</h1>
          <p>{SUB_TITLE}</p>
        </div>

        <Info />
        <Upload />
      </main>
    </>
  );
}
