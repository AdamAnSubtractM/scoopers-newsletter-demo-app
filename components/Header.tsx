import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { StyledFlexContainer } from '../styles/FlexContainer';
import { StyledMaxContainer } from '../styles/MaxContainer';
import { sizes } from '../helpers/contants';

type internalLink = {
  text: string;
  href: string;
  title?: string;
};

type HeaderProps = {
  title: React.ReactNode;
  internalLinks?: internalLink[];
};

const StyledHeader = styled.header`
  min-height: var(--size-header-height);
  h1 {
    margin: 0;
    line-height: 1;
    font-size: 1.8rem;
    @media all and (min-width: ${sizes.lg}px) {
      font-size: 4rem;
    }
  }
  .link {
    font-size: 1rem;
    @media all and (min-width: ${sizes.lg}px) {
      font-size: 1.5rem;
    }
  }
`;

export default function Header({ title, internalLinks }: HeaderProps) {
  return (
    <StyledMaxContainer>
      <StyledHeader>
        <StyledFlexContainer>
          {title && <h1 className="logo">{title}</h1>}
          {internalLinks
            ? internalLinks.map((link, idx) => (
                <Link key={`link-${idx}`} href={link.href}>
                  <a title={link.title} className="link">
                    {link.text}
                  </a>
                </Link>
              ))
            : null}
        </StyledFlexContainer>
      </StyledHeader>
    </StyledMaxContainer>
  );
}
