import Image from 'next/image';
import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import { StyledFlexContainer } from '../styles/FlexContainer';
import Button from '../components/Button';
import Card from '../components/Card';
import { StyledGridContainer } from '../styles/GridContainer';
import { sizes } from '../helpers/contants';
import blackCherry from '../public/black-cherry.png';
import imageComingSoon from '../public/image-coming-soon.png';
import vanilla from '../public/vanilla.png';
import cherryCordial from '../public/cherry-cordial.png';
import mexicanChocolate from '../public/mexican-chocolate.png';

const StyledIcecreamPage = styled.div`
  h1 {
    font-size: 2.8rem;
    margin-bottom: 2rem;
    text-align: center;
    @media all and (min-width: ${sizes.md}px) {
      font-size: 4rem;
    }
    @media all and (min-width: ${sizes.lg}px) {
      margin-bottom: 4rem;
      font-size: 4.5rem;
    }
    @media all and (min-width: ${sizes.xl}px) {
      font-size: 6rem;
    }
  }
  .intro-section {
    border-bottom: 1px solid var(--color-text);
    margin-bottom: var(--gutter);
  }
  .intro-text {
    font-size: 1.2rem;
    text-align: center;
    max-width: 70%;
    margin: 2rem auto;
    @media all and (min-width: ${sizes.sm}px) {
      font-size: 1.4rem;
    }
    @media all and (min-width: ${sizes.md}px) {
      font-size: 1.8rem;
    }
  }
  .desc {
    min-height: 50px;
  }
`;

export default function IcecreamTruck() {
  const saleItems = [
    {
      name: 'Black Cherry',
      price: `$5.50`,
      desc: `(Pink) vanilla with black cherrry chunks.`,
      img: blackCherry,
      cta: `Reserve`,
      onClick: () => console.log(`black cherry`),
    },
    {
      name: 'Black Forest',
      price: `$5.50`,
      desc: `Dark chocolate with black cherry chunks, chocolate chips, and marshmallow.`,
      img: imageComingSoon,
      cta: `Reserve`,
      onClick: () => console.log(`black forest`),
    },
    {
      name: 'Cherry Cordial',
      price: `$5.50`,
      desc: `(Pink) vanilla with Maraschino chunks and chocolate chips.`,
      img: cherryCordial,
      cta: `Reserve`,
      onClick: () => console.log(`cherry cordial`),
    },
    {
      name: 'Mexican Chocolate',
      price: `$5.50`,
      desc: `Chocolate with a hint of heat from cinnamon and cayenne.`,
      img: mexicanChocolate,
      cta: `Reserve`,
      onClick: () => console.log(`mexican chocolate`),
    },
    {
      name: 'Vampire',
      price: `$5.50`,
      desc: `Dark chocolate with Maraschino chunks and chocolate chips.`,
      img: imageComingSoon,
      cta: `Reserve`,
      onClick: () => console.log(`vampire`),
    },
    {
      name: 'Vanilla',
      price: `$5.50`,
      desc: `Classic vanilla with Madagascar vanilla bean`,
      img: vanilla,
      cta: `Reserve`,
      onClick: () => console.log(`vanilla`),
    },
    {
      name: 'WhiteHouse',
      price: `$5.50`,
      desc: `(White) vanilla with Maraschino cherrry chunks.`,
      img: imageComingSoon,
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
                  {item.img && (
                    <div className="img-wrapper">
                      <Image
                        src={item.img}
                        alt={item.desc}
                        width={108.35}
                        height={200}
                      />
                    </div>
                  )}
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
