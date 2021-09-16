import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  cursor: pointer;
  text-transform: lowercase;
  text-align: center;
  margin: 1rem 0;
  padding: 0 2rem;
  border-radius: none;
  color: var(--color-text);
  background: none;
  font-weight: lighter;
  font-size: 1rem;
  border: none;
  text-decoration: underline;
  color: var(--color-accent-light);
  &:hover {
    text-decoration: none;
  }
  &:disabled {
    background: var(--color-accent-light);
    cursor: default;
  }
`;

type ButtonProps = {
  children: React.ReactNode;
  onClick: (x?: any) => any;
  disabled: boolean;
};

export default function Button({ children, onClick, disabled }: ButtonProps) {
  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
}
