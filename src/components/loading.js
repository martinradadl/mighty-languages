import React from "react";

export const LoadingWrapper = (props) => {
  const { children, isLoading } = props;
  return isLoading ? <p>Cargando...</p> : children;
};
