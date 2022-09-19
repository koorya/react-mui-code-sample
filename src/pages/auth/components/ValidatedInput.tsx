import React from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";

export type InputValidationProps = {
  isValid: (arg0: string) => boolean;
  value: string;
  setValue: (arg0: string) => void;
  label?: string;
} & React.ComponentProps<typeof OutlinedInput>;

export const ValidatedInput = (props: InputValidationProps) => {
  const { isValid, value, setValue, label, ...otherProps } = props;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <FormControl
      variant="outlined"
      error={!!value && isValid(value)}
      fullWidth={otherProps?.fullWidth}
    >
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <OutlinedInput
        {...otherProps}
        value={value}
        onChange={handleChange}
        label={label}
      />
    </FormControl>
  );
};
