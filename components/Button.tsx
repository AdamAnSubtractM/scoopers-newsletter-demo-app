import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  cursor: pointer;
  text-transform: lowercase;
  text-align: center;
  margin: 1rem 0;
  padding: 1rem 2rem;
  border-radius: var(--size-button-radius);
  color: var(--color-text);
  background: var(--color-accent);
  font-weight: bold;
  font-size: 1rem;
  border: none;
  &:hover {
    background: var(--color-accent-light);
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
