import React from "react";
import styles from "./Info.module.css";
import { Button, Icon } from "folio-ui";
import { REPO } from "@/config/constants";

export type InfoProps = {};

const Info: React.FC<InfoProps> = () => {
  return (
    <div className={styles.info_container}>
      <Button
        onClick={() => {
          window.open(REPO, "_blank");
        }}
        color="dark"
        icon={<Icon symbol="github" size="4" />}
      >
        Github
      </Button>
    </div>
  );
};

export default Info;
