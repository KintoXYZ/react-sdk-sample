import React from 'react';
import styled from 'styled-components';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

interface TextSelectorProps {
  name: string;
  value: string;
  onChange(e: any): void;
  valid?: boolean;
  label: string;
  options: string[];
  disabled?: boolean;
  hidePrefixLabel?: boolean;
  className?: string;
}

const TextSelector = ({ className, hidePrefixLabel, name, disabled, options, value, label, onChange }: TextSelectorProps) => {
  return (
    <TextSelectorWrapper className={className}>
      <FormControl disabled={disabled}>
        <InputLabel>{label}</InputLabel>
        <Select
          labelId={name}
          id={name}
          value={value}
          label={label}
          disabled={disabled}
          onChange={onChange}
        >
          {options.map((option, index) => (
            <MenuItem key={option} value={option}>
              {!hidePrefixLabel && (option === '' ? 'Select recipient' : `${index === 0 ? 'Turnkey' : ' External'} - ${option}`)}
              {hidePrefixLabel && (option === '' ? 'Select recipient' : `${option}`)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </TextSelectorWrapper>
  );
};

const TextSelectorWrapper = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid var(--sand);
  margin-top: 16px;

  > div {
    width: 100%;
  }

  legend {
    display: none;
  }

  fieldset {
    border: none;
  }

  label {
    font-size: 16px;
    font-weight: 400;
    color: var(--light-grey3);
  }
`;

export default React.memo(TextSelector);
