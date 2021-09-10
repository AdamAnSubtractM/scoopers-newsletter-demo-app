import styled from 'styled-components';
import { sizes } from '../helpers/contants';

export const StyledGridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  gap: var(--gutter);
  @media all and (min-width: ${sizes.md}px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }
  @media all and (min-width: ${sizes.lg}px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
`;
