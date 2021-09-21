import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import Card from '../components/Card';
import { showNotification } from '../helpers';
import { sizes } from '../helpers/contants';
import { useNotifications } from '../hooks';
import cherryCordial from '../public/cherry-cordial.png';
import imageComingSoon from '../public/image-coming-soon.png';
import mexicanChocolate from '../public/mexican-chocolate.png';
import vanilla from '../public/vanilla.png';
import whitehouse from '../public/whitehouse.png';
import { StyledFlexContainer } from '../styles/FlexContainer';
import { StyledGridContainer } from '../styles/GridContainer';

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
  const {
    addToNotificationQueue,
    isNotificationStatus,
    isSubscribed,
    setIsSubscribed,
  } = useNotifications();
  const saleItems = [
    {
      name: 'Black Cherry',
      price: `$5.50`,
      desc: `(Pink) vanilla with black cherrry chunks.`,
      img: imageComingSoon,
      cta: `Reserve`,
      onClick: () =>
        addToNotificationQueue({
          title: `Black Cherry icecream ready for pickup!`,
          body: `Your order of Black Cherry icecream is ready for pickup.`,
          icon: `icecream-logo.png`,
          actions: [
            { action: 'accept', title: "I'm coming!" },
            { action: 'close', title: 'Forget it.' },
          ],
        }),
    },
    {
      name: 'Black Forest',
      price: `$5.50`,
      desc: `Dark chocolate with black cherry chunks, chocolate chips, and marshmallow.`,
      img: imageComingSoon,
      cta: `Reserve`,
      onClick: () =>
        addToNotificationQueue({
          title: `Black Forest icecream ready for pickup!`,
          body: `Your order of Black Forest icecream is ready for pickup.`,
          icon: `icecream-logo.png`,
          actions: [
            { action: 'accept', title: "I'm coming!" },
            { action: 'close', title: 'Forget it.' },
          ],
        }),
    },
    {
      name: 'Cherry Cordial',
      price: `$5.50`,
      desc: `(Pink) vanilla with Maraschino chunks and chocolate chips.`,
      img: cherryCordial,
      cta: `Reserve`,
      onClick: () =>
        addToNotificationQueue({
          title: `Cherry Cordial icecream ready for pickup!`,
          body: `Your order of Cherry Cordial icecream is ready for pickup.`,
          icon: `icecream-logo.png`,
          actions: [
            { action: 'accept', title: "I'm coming!" },
            { action: 'close', title: 'Forget it.' },
          ],
        }),
    },
    {
      name: 'Mexican Chocolate',
      price: `$5.50`,
      desc: `Chocolate with a hint of heat from cinnamon and cayenne.`,
      img: mexicanChocolate,
      cta: `Reserve`,
      onClick: () =>
        addToNotificationQueue({
          title: `Mexican Chocolate icecream ready for pickup!`,
          body: `Your order of Mexican Chocolate icecream is ready for pickup.`,
          icon: `icecream-logo.png`,
          actions: [
            { action: 'accept', title: "I'm coming!" },
            { action: 'close', title: 'Forget it.' },
          ],
        }),
    },
    {
      name: 'Vampire',
      price: `$5.50`,
      desc: `Dark chocolate with Maraschino chunks and chocolate chips.`,
      img: imageComingSoon,
      cta: `Reserve`,
      onClick: () =>
        addToNotificationQueue({
          title: `Vampire icecream ready for pickup!`,
          body: `Your order of Vampire icecream is ready for pickup.`,
          icon: `icecream-logo.png`,
          actions: [
            { action: 'accept', title: "I'm coming!" },
            { action: 'close', title: 'Forget it.' },
          ],
        }),
    },
    {
      name: 'Vanilla',
      price: `$5.50`,
      desc: `Classic vanilla with Madagascar vanilla bean`,
      img: vanilla,
      cta: `Reserve`,
      onClick: () =>
        addToNotificationQueue({
          title: `Vanilla icecream ready for pickup!`,
          body: `Your order of Vanilla icecream is ready for pickup.`,
          icon: `icecream-logo.png`,
          actions: [
            { action: 'accept', title: "I'm coming!" },
            { action: 'close', title: 'Forget it.' },
          ],
        }),
    },
    {
      name: 'WhiteHouse',
      price: `$5.50`,
      desc: `(White) vanilla with Maraschino cherrry chunks.`,
      img: whitehouse,
      cta: `Reserve`,
      onClick: () =>
        addToNotificationQueue({
          title: `WhiteHouse icecream ready for pickup!`,
          body: `Your order of WhiteHouse icecream is ready for pickup.`,
          icon: `icecream-logo.png`,
          actions: [
            { action: 'accept', title: "I'm coming!" },
            { action: 'close', title: 'Forget it.' },
          ],
        }),
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
                    <>
                      {isNotificationStatus === 'granted' && (
                        <>
                          {!isSubscribed.value ? (
                            <Button
                              onClick={() => {
                                showNotification(`Subscribed to Updates!`, {
                                  body: `You can now reserve icecream and will notify you like this when it's ready!`,
                                  icon: `icecream-logo.png`,
                                  actions: [
                                    { action: `close`, title: `Dismiss` },
                                  ],
                                });
                                setIsSubscribed({
                                  ...isSubscribed,
                                  value: true,
                                });
                              }}
                            >
                              Subscribe to Updates to Reserve
                            </Button>
                          ) : (
                            <Button
                              onClick={item.onClick}
                              disabled={!isSubscribed.value}
                            >
                              {item.cta}
                            </Button>
                          )}
                        </>
                      )}
                      {isNotificationStatus === 'denied' && (
                        <p>
                          Please allow notifications to reserve icecream.
                          Otherwise, stop by our truck today!
                        </p>
                      )}
                      {!isNotificationStatus && (
                        <p>Stop by our truck today to reserve!</p>
                      )}
                    </>
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
