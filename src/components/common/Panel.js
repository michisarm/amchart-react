import React, { useMemo } from 'react';

export const defaultProps = {
  title: undefined,
  toolbar: undefined,
  timeRange: undefined,
  isLoading: false,
  isEmpty: false,
};

const Panel = ({
  id,
  title,
  tooltip,
  children,
  className,
  error,
  isEmpty,
  isLoading,
  isRefresh,
  toolbar,
  input,
  // ref,
  ...others
}) => {
  return (
    <div>
        test
        <p>{toolbar}</p>
        <p>{input}</p>
    </div>
  );
};
export default Panel;