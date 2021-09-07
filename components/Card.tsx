import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.section`
  background-color: var(--color-text);
  color: var(--color-accent);
  border-radius: 12px;
  padding: var(--gutter);
  text-shadow: none;
  h2,
  h3,
  h4,
  h5 {
    font-size: 2rem;
  }
`;
type CardProps = { children: React.ReactNode };

export default function Card({ children }: CardProps) {
  return <StyledCard>{children}</StyledCard>;
}
