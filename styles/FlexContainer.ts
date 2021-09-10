import styled from 'styled-components';
import { sizes } from '../helpers/contants';

type FlexContainerProps = {
  stack?: boolean;
  stackBelowSize?: Constants['size'];
  alignItems?: 'flex-start' | 'flex-end' | 'center';
};

export const StyledFlexContainer = styled.div<FlexContainerProps>`
  display: flex;
  align-items: ${({ alignItems }) => alignItems || `center`};
  justify-content: space-between;
  flex-flow: ${({ stack }) => (stack ? 'column nowrap' : 'row nowrap')};
  gap: var(--gutter);
  @media all and (min-width: ${({ stackBelowSize }) =>
      sizes[stackBelowSize] || sizes.md}px) {
    justify-content: space-between;
    flex-flow: row nowrap;
  }
`;
