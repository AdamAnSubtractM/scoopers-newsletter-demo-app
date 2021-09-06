/* eslint-disable no-console */
import Head from 'next/head';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styled from 'styled-components';
import Button from '../components/Button';
import IcecreamCarousel from '../components/IcecreamCarousel';
import { useNotifications } from '../hooks';
import { StyledFlexContainer } from '../styles/FlexContainer';
import { showNotification } from '../helpers';

const StyledIntro = styled.div`
  max-width: 800px;
  h2 {
    font-size: 6rem;
    margin: 0 0 4rem 0;
  }
`;

const StyledCarousel = styled.div`
  max-width: 400px;
`;

export default function Home() {
  const { isNotificationStatus } = useNotifications();

  return (
    <div className="container">
      <Head>
        <title>Scoopers' Icecream | Push Notifications Demo</title>
      </Head>

      <main>
        <StyledFlexContainer as="section">
          <StyledIntro>
            {isNotificationStatus && isNotificationStatus !== 'blocked' && (
              <h2>
                {isNotificationStatus === 'granted'
                  ? `Stay up to date with our latest flavors and releases!`
                  : `The best place to stay updated on Scoopers' latest news!`}
              </h2>
            )}
            {isNotificationStatus === 'blocked' && (
              <h2>
                Get the most out of Scoopers' Newsletter by allowing
                notifications.
              </h2>
            )}
            {isNotificationStatus === 'granted' && (
              <Button
                onClick={() =>
                  showNotification(`Thanks for subscribing!`, {
                    body: `We will send important updates that look like this. Select "options" to see more info!`,
                    icon: `icecream-logo.png`,
                    actions: [
                      {
                        action: `icecream-truck`,
                        title: `See Our Latest Updates`,
                      },
                      { action: `close`, title: `Dismiss` },
                    ],
                  })
                }
              >
                Subscribe to Updates
              </Button>
            )}
          </StyledIntro>
          <StyledCarousel>
            <IcecreamCarousel />
          </StyledCarousel>
        </StyledFlexContainer>
      </main>
    </div>
  );
}
