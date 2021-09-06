import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { StyledFlexContainer } from '../styles/FlexContainer';
import { StyledMaxContainer } from '../styles/MaxContainer';

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
                  <a title={link.title}>{link.text}</a>
                </Link>
              ))
            : null}
        </StyledFlexContainer>
      </StyledHeader>
    </StyledMaxContainer>
  );
}
