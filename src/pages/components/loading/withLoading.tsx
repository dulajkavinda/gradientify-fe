const withLoading = (Component: any) => {
  return function withLoadingWrapped() {
    return <Component />;
  };
};

export default withLoading;
