import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import { StyledFlexContainer } from '../styles/FlexContainer';
import Button from '../components/Button';
import Card from '../components/Card';
import { StyledGridContainer } from '../styles/GridContainer';

const StyledIcecreamPage = styled.div`
  h1 {
    text-align: center;
  }
  .intro-section {
    border-bottom: 1px solid var(--color-text);
    margin-bottom: var(--gutter);
  }
  .intro-text {
    font-size: 1.8rem;
    text-align: center;
    max-width: 70%;
    margin: 2rem auto;
  }
  .desc {
    min-height: 100px;
  }
`;

export default function IcecreamTruck() {
  const saleItems = [
    {
      name: 'Black Cherry',
      price: `$5.50`,
      desc: `(Pink) vanilla with black cherrry chunks.`,
      cta: `Reserve`,
      onClick: () => console.log(`black cherry`),
    },
    {
      name: 'Black Forest',
      price: `$5.50`,
      desc: `Dark chocolate with black cherry chunks, chocolate chips, and marshmallow.`,
      cta: `Reserve`,
      onClick: () => console.log(`black forest`),
    },
    {
      name: 'Cherry Cordial',
      price: `$5.50`,
      desc: `(Pink) vanilla with Maraschino chunks and chocolate chips.`,
      cta: `Reserve`,
      onClick: () => console.log(`cherry cordial`),
    },
    {
      name: 'Mexican Chocolate',
      price: `$5.50`,
      desc: `Chocolate with a hint of heat from cinnamon and cayenne.`,
      cta: `Reserve`,
      onClick: () => console.log(`mexican chocolate`),
    },
    {
      name: 'Vampire',
      price: `$5.50`,
      desc: `Dark chocolate with Maraschino chunks and chocolate chips.`,
      cta: `Reserve`,
      onClick: () => console.log(`vampire`),
    },
    {
      name: 'Vanilla',
      price: `$5.50`,
      desc: `Classic vanilla with Madagascar vanilla bean`,
      cta: `Reserve`,
      onClick: () => console.log(`vanilla`),
    },
    {
      name: 'WhiteHouse',
      price: `$5.50`,
      desc: `(White) vanilla with Maraschino cherrry chunks.`,
      cta: `Reserve`,
      onClick: () => console.log(`whitehouse`),
    },
  ];
  return (
    <div className="container">
      <Head>
        <title>Scoopers' Icecream Truck | Push Notifications Demo</title>
      </Head>

      <main>
        <StyledFlexContainer as="section">
          <StyledIcecreamPage>
            <div className="intro-section">
              <h1>Huge Icecream Truck Sale</h1>
              <p className="intro-text">
                Scoopers' has a surplus of Icecream that must go! Our Icecream
                Truck will be coming to your town <strong>today only</strong>{' '}
                from 12PM - 9:00PM.
              </p>
              <p className="intro-text">
                The below flavors will be available in pre-packaged Pints for
                $5.50 each. Reserve yours while its still cold and supplies
                last!
              </p>
            </div>
            <StyledGridContainer>
              {saleItems.map((item, idx) => (
                <Card key={`card-${idx}`}>
                  {item.name && <h3>{item.name}</h3>}
                  {item.desc && <p className="desc">{item.desc}</p>}
                  {item.price && <p className="price">{item.price}</p>}
                  {item.cta && (
                    <Button onClick={item.onClick}>{item.cta}</Button>
                  )}
                </Card>
              ))}
            </StyledGridContainer>
          </StyledIcecreamPage>
        </StyledFlexContainer>
      </main>
    </div>
  );
}
