import React from "react";

import LoadingIcon from "./LoadingIcon";
import styles from "./LoadingIcon.module.css";

interface LoadingWithIconProps {
  title: string;
  customStyles?: React.CSSProperties;
  loading?: boolean;
}

const LoadingWithIcon: React.FC<LoadingWithIconProps> = (props) => {
  const { title, customStyles, loading } = props;
  return (
    <div className={styles.loading_title}>
      <span style={customStyles}>{title}</span>
      {loading && <LoadingIcon />}
    </div>
  );
};

LoadingWithIcon.defaultProps = {
  customStyles: {
    color: "#7e8c9a",
    fontSize: "1.6rem",
    fontWeight: 600,
  },
  loading: false,
};

export default LoadingWithIcon;
