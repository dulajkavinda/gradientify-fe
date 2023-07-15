import * as React from "react";

import LoadingIcon from "./LoadingIcon";
import styles from "./LoadingIcon.module.css";

interface ILoading {
  styles?: React.CSSProperties;
}

const Loading: React.FC<ILoading> = (props) => {
  const { styles: customStyles } = props;

  return (
    <div className={styles.container} style={{ ...customStyles }}>
      <LoadingIcon />
    </div>
  );
};

Loading.defaultProps = {
  styles: {},
};

export default Loading;
