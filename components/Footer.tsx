import React from 'react';
import styled from 'styled-components';
import { StyledMaxContainer } from '../styles/MaxContainer';

const StyledFooter = styled.footer`
  min-height: var(--size-footer-height);
  text-align: center;
`;

export default function Footer() {
  return (
    <StyledMaxContainer>
      <StyledFooter>
        <p>
          Powered by Scoopers' Icecream. This is not a real business, this site
          is used for Demo purposes only.
        </p>
      </StyledFooter>
    </StyledMaxContainer>
  );
}
