/* eslint-disable react/display-name */
/* eslint-disable no-console */
import Head from 'next/head';
import Link from 'next/link';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styled from 'styled-components';
import Button from '../components/Button';
import IcecreamCarousel from '../components/IcecreamCarousel';
import UnsubscribeButton from '../components/UnsubscribeButton';
import { sizes } from '../helpers/contants';
import { useNotifications } from '../hooks';
import { StyledFlexContainer } from '../styles/FlexContainer';

const StyledIntro = styled.div`
  max-width: 800px;
  h2 {
    font-size: 2.8rem;
    margin-bottom: 2rem;
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
  .button-wrap {
    display: flex;
    justify-content: center;
    @media all and (min-width: ${sizes.lg}px) {
      justify-content: flex-start;
    }
  }
  p {
    font-size: 1.2rem;
    @media all and (min-width: ${sizes.md}px) {
      font-size: 1.8rem;
    }
    @media all and (min-width: ${sizes.lg}px) {
      font-size: 2.2rem;
    }
  }
`;

const StyledCarousel = styled.div`
  width: 100%;
  max-width: 800px;
  h3 {
    margin-top: 4.5rem;
  }
  @media all and (min-width: ${sizes.lg}px) {
    max-width: 400px;
  }
`;

export default function Home() {
  const { isNotificationStatus, isSubscribed, setIsSubscribed } =
    useNotifications();
  const defaultMsg = {
    heading: `The best place to stay updated on Scoopers' latest flavors and releases!`,
    body: () => (
      <>
        Visit <Link href="/icecream-truck">our icecream truck</Link> page to
        view our current menu and deals.
      </>
    ),
  };

  return (
    <div className="container">
      <Head>
        <title>Scoopers' Icecream | Push Notifications Demo</title>
      </Head>

      <main>
        <StyledFlexContainer
          as="section"
          stack
          stackBelowSize="lg"
          alignItems="flex-start"
        >
          <StyledIntro>
            {isNotificationStatus !== 'denied' && (
              <>
                <h2>
                  {isNotificationStatus === 'granted'
                    ? `Stay up to date with our latest flavors and releases!`
                    : defaultMsg.heading}
                </h2>
                <p>
                  {isNotificationStatus === 'granted'
                    ? `Click the subscribe button to recieve notifications when we release new flavors or have great deals.`
                    : defaultMsg.body()}
                </p>
              </>
            )}
            {isNotificationStatus === 'denied' && (
              <>
                <h2>
                  Get the most out of Scoopers' Newsletter by allowing
                  notifications. We'll keep you updated on our latest flavors
                  and releases!
                </h2>
                <p>{defaultMsg.body()}</p>
              </>
            )}
            {isNotificationStatus === 'granted' && (
              <div className="button-wrap">
                <Button
                  onClick={() => {
                    // showNotification(`Thanks for subscribing!`, {
                    //   body: `We will send important updates that look like this. Select this notification to see more info!`,
                    //   icon: `icecream-logo.png`,
                    //   actions: [
                    //     {
                    //       action: `icecream-truck`,
                    //       title: `See Our Latest Updates`,
                    //     },
                    //     { action: `close`, title: `Dismiss` },
                    //   ],
                    // });
                    setIsSubscribed(true);
                  }}
                  disabled={isSubscribed ? 'disabled' : null}
                >
                  {isSubscribed
                    ? `${String.fromCharCode(
                        10004
                      )} - You are subscribed to updates`
                    : `Subscribe to Updates`}
                </Button>
                {isSubscribed ? (
                  <UnsubscribeButton onClick={() => setIsSubscribed(false)}>
                    Unsubscribe
                  </UnsubscribeButton>
                ) : null}
              </div>
            )}
          </StyledIntro>
          <StyledCarousel>
            <h3>Our Top Sellers:</h3>
            <IcecreamCarousel />
          </StyledCarousel>
        </StyledFlexContainer>
      </main>
    </div>
  );
}
