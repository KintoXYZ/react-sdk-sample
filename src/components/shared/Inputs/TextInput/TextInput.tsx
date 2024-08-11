import React from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import { Icon } from 'components/shared/Icons/Icon';
import { IconName } from 'models';
import { BREAKPOINTS } from 'config';

interface TextInputProps {
  name: string;
  value: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  valid: boolean;
  label?: string;
  height?: string;
  width?: string;
  fontSize?: string;
  placeholder?: string;
  required?: boolean;
  preSpan?: string;
  type?: string;
  tooltip?: string;
  postSpan?: string;
  disabled?: boolean;
  inverse?: boolean;
  multiline?: boolean;
  postButtonCopy?: string;
  className?: string;
  errorText?: string;
}

const TextInput = (props: TextInputProps) => (
  <TextInputWrapper className={props.className}>
    <ActionItemLabelWrapper>
      <span>{props.label}</span>
      {/* {props.tooltip && 
        <HoverTooltip content={props.tooltip} placement={'up'} />
      } */}
    </ActionItemLabelWrapper>
    <InsideWrapper height={props.height}>
      {props.preSpan && <InputSpanBefore>{props.preSpan}</InputSpanBefore>}
      <StyledBaseField>
        <StyledTextInput
          variant={"standard"}
          type={props.type || 'text'}
          required={props.required}
          error={!props.valid}
          helperText={!props.valid ? (props.errorText !== '' ? props.errorText : 'invalid') : ''}
          placeholder={props.placeholder}
          multiline={props.multiline}
          fontSize={parseInt(props.fontSize || '10')}
          disabled={props.disabled}
          width={props.width || '100%'}
          inverse={props.inverse ? props.inverse : undefined}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value || e.target.value === '') {
              props.onChange(e);
            }
          }}
          name={props.name}
          value={props.value || ''}
        />
      </StyledBaseField>
      {props.postSpan && <InputSpanAfter>{props.postSpan}</InputSpanAfter>}
      {props.postButtonCopy &&
        <InputSpanAfter>
          <button type="submit">
            {props.postButtonCopy}
            <Icon name={IconName.chevronRight} color={'var(--dark-grey)'} size={25} />
          </button>
        </InputSpanAfter>
      }
    </InsideWrapper>
  </TextInputWrapper>
);

const TextInputWrapper = styled.div`
  margin: 10px 0;
  display: flex;
  flex-flow: column nowrap;
  color: var(--primary);
  font-family: 'SpaceGrotesk';
`;

const InsideWrapper = styled.div<{ height?: string }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  justify-content: space-between;
  height: ${(p) => (p.height ? p.height : 'auto')};
  width: auto;
`;

const ActionItemLabelWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
`;

const InputSpanBefore = styled.div`
  height: 100%;
  font-size: 18px;
  padding-right: 16px;
  display: flex;
  margin-top: -2px;
  align-items: center;
  padding-bottom: 0px;
`;

const InputSpanAfter = styled.div`
  height: 100%;
  font-size: 18px;
  border-bottom: 1px solid var(--light-grey3);
  display: inline-flex;
  align-items: center;

  button {
    padding: 0;
    padding-top: 1px;
    font-family: 'SpaceGrotesk';
    min-width: 150px;
    display: flex;
    height: 27px;
    justify-content: flex-end;
    background: none;
    border: none;
    appearance: none;
    color: var(--dark-grey);
    font-weight: 700;
    font-size: 18px;
    cursor: pointer;

    @media only screen and (max-width: ${BREAKPOINTS.mobile}) {
      font-size: 12px;
    }

    &:hover {
      opacity: 0.7;
    }
  }
`;

const StyledBaseField = styled.div`
  display: flex;
  margin: 0;
  width: 100%;
  border: none;
  box-shadow: none;
`;

const StyledTextInput = styled(TextField)<{ required: any, error?: boolean, fontSize: number, inverse?:boolean, type: string, width: string }>`
  width: ${(props) => (props.width ? `${props.width}` : '100%')};
  background: none;
  box-shadow: none;
  border: none;
  border-radius: 0;
  padding-left: 0;
  font-family: 'SpaceGrotesk';
  font-size: ${(props) => (props.fontSize ? `${props.fontSize}` : '24px')};
  font-feature-settings: 'pnum' on, 'lnum' on !important;
  -webkit-font-feature-settings: 'pnum' on, 'lnum' on !important;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  @media only screen and (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 12px;
  }

  input {
    padding-left: 10px;
    color: ${props => !props.error ? (props.inverse ? 'var(--white)' : 'var(--primary)') : 'var(--orange)'} !important;
    border-bottom: 1px solid var(--light-grey3) !important;
    border-radius: 0 !important;
  }

  textarea {
    background: rgba(109, 109, 109, 0.15);
    min-height: 190px;
    color: var(--white);
    padding: 16px 10px;
  }

  div:before {
    border: none !important;
  }

  &:hover {
    box-shadow: none;
  }

  p {
    min-height: 20px;
  }

  label {
    width: ${(props) => (props.width ? `${props.width}` : '100%')};
  }
`;

export default React.memo(TextInput);
