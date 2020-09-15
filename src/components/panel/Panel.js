import React from 'react';
import { StyledPanel } from './Panel.styled';

export const defaultProps = {
  title: undefined,
  toolbar: undefined,
  timeRange: undefined,
  isLoading: false,
  isEmpty: false,
};

const Panel = ({
  children,
  className,
  error,
  isEmpty,
  isLoading,
  isRefresh,
  ...others
}) => {
  return (
    <StyledPanel>
        {isLoading ? (
            <div>loading...</div>
        ) : error ? (
            <div>error...</div>
        ) : isEmpty ? (
            <div>empty...</div>
        ) : (
            children
        )}
    </StyledPanel>
  );
};
export default Panel;