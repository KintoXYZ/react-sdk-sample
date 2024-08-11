import React from 'react';
import styled from 'styled-components';
import { PrimaryButton, WhiteButton } from 'components/shared';
import { BREAKPOINTS } from 'config';

interface TableProps {
  children?: React.ReactNode;
  headers?: string[];
  className?:string;
}

interface TableRowProps {
  children?: React.ReactNode;
  className?:string;
  onClickRow?: () => void;
}

interface TableCellProps {
  children?: React.ReactNode;
  className?:string;
}

export const TableCell = ({ children, className }:TableCellProps) => {
  return (
    <TableCellWrapper className={className}>
      {children}
    </TableCellWrapper>
  );
}

export const TableRow = ({ className, onClickRow, children }: TableRowProps) => {
  return (
    <TableRowWrapper onClick={onClickRow} className={className}>
      {children}
    </TableRowWrapper>
  );
}

const Table = ({ className, children, headers }: TableProps) => {
  return (
    <TableWrapper className={className}>
      {headers && (
        <TableHeaderRow>
          {headers.map((header, index) => (
            <TableHeader key={index}>{header}</TableHeader>
          ))}
        </TableHeaderRow>
      )}
      {children}
    </TableWrapper>
  );
};

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
  width: 100%;
`;

const TableHeaderRow = styled.div`
  display: flex;
  padding-bottom: 0px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  @media only screen and (max-width: ${BREAKPOINTS.mobile}) {
    display: none;
  }
`;

const TableHeader = styled.div`
  color: #7D7A78;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  text-transform: uppercase;
`;

const TableRowWrapper = styled.div`
  display: flex;
  padding-bottom: 0px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-top: 1px solid var(--light-grey3);
  height: 48px;
  padding: 24px 0 0;
  &:last-child {
    border-top: 2px solid var(--light-grey3);
    border-bottom: 2px solid var(--light-grey3);
    padding: 24px 0 24px 0;
  }
`;

const TableCellWrapper = styled.div`
  color: var(--dark-grey);
  font-size: 18px;
  font-style: normal;
  font-weight: 400;

  @media only screen and (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 16px;
  }
`;
 

export default React.memo(Table);
