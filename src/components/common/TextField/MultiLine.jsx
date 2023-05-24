import { TextareaAutosize } from '@mui/material';

function MultiLineTextField({ name, ...rest }) {
  return (
    <TextareaAutosize
      id={name}
      name={name}
      label={name}
      aria-label={name}
      placeholder={name}
      {...rest}
      style={{ width: 600 }}
    />
  );
}

export default MultiLineTextField;
