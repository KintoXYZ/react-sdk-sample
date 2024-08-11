import React from 'react';
import styled from 'styled-components';
import { TextInput } from '../';
import { NumericFormat } from 'react-number-format';

const NumberInputField = (props: NumberInputProps) => {
  return (
    <TextInput
      name={props.name}
      value={props.value.toString()}
      onChange={props.onChange}
      valid={!!props.valid}
      multiline={false}
      label={props.label}
      width={props.width}
      type={'number'}
      fontSize={props.fontSize}
      required={props.required}
      preSpan={props.preSpan}
      tooltip={props.tooltip}
      postSpan={props.postSpan}
      className={props.className}
      disabled={props.disabled}
      inverse={false}
      errorText={props.errorText}
    />
  );
}

interface NumberInputProps {
  name: string;
  value: number;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  valid?: boolean;
  label?: string;
  width?: string;
  required?: boolean;
  preSpan?: string;
  tooltip?: string;
  fontSize?: string;
  postSpan?: string;
  className?: string;
  prefix?: string;
  suffix?: string;
  step?: string;
  noDecimals?: boolean;
  min?: number;
  max?: number;
  innerRef?: any;
  disabled?: boolean;
  errorText?: string;
}

const NumberInput = (props: NumberInputProps) => {
  const valueWithEmpty = props.value === 0 ? '' : props.value;
  return (
    <NumberInputWrapper className={props.className}>
      <NumericFormat 
        {...props}
        value={valueWithEmpty.toString()}
        allowNegative={false}
        decimalScale={props.noDecimals ? 0 : 4}
        decimalSeparator="."
        prefix={props.prefix}
        suffix={props.suffix}
        valid={!!(props.min !== undefined && props.value >= props.min) && !!(props.max !== undefined && props.value <= props.max)}
        customInput={NumberInputField} 
        />
    </NumberInputWrapper>
  );
};

const NumberInputWrapper = styled.div`
  display: flex;
  font-family: 'SpaceGrotesk';
  input, div {
    font-size: 32px !important;
    color: #AFAFAF !important;
  }
`;

export default React.memo(NumberInput);
