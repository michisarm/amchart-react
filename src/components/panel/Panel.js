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
  ...others
}) => {
  return (
    <>
        {isLoading ? (
            <div>loading...</div>
        ) : error ? (
            <div>error...</div>
        ) : isEmpty ? (
            <div>empty...</div>
        ) : (
            children
        )}
    </>
  );
};
export default Panel;