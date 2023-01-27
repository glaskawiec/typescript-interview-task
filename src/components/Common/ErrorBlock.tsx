import { FC, memo } from 'react';

interface IErrorBlock {
  error: String;
  className?: string;
}

const ErrorBlock: FC<IErrorBlock> = ({ error, className }) => {
  return <div className={className}>{error}</div>;
};

export default memo(ErrorBlock);
