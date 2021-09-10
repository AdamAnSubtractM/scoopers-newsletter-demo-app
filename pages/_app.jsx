/* eslint-disable no-console */
/* eslint-disable react/prop-types */
// import App from "next/app";
import 'sanitize.css';
import styled, { createGlobalStyle, css } from 'styled-components';
import Head from 'next/head';
import Link from 'next/link';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { StyledMaxContainer } from '../styles/MaxContainer';

const StyledPageWrapper = styled.main`
  min-height: calc(100vh - 100px - 20px);
  padding: var(--gutter);
`;

const GlobalStyles = createGlobalStyle`${css`
  :root {
    --gutter: 2rem;
    --color-background: radial-gradient(
      circle,
      rgba(248, 131, 112, 1) 0%,
      rgba(255, 135, 141, 1) 35%,
      rgba(248, 131, 112, 1) 100%
    );
    --color-text: #f2f2f2;
    --color-accent: #282828;
    --color-accent-light: #333;
    --color-gray: #ccc;
    --font-main: 'Bangers', cursive;
    --size-extra-space: 20px;
    --size-header-height: 50px;
    --size-footer-height: 50px;
    --size-button-radius: 2rem;
    --text-shadow: 1px 1px 1px var(--color-accent-light);
    --text-shadow-contrast: 1px 1px 1px #ffa0a0;
    --box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    --box-shadow-raised: 0 14px 28px rgba(0, 0, 0, 0.25),
      0 10px 10px rgba(0, 0, 0, 0.22);
    --transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
  html {
    background: rgb(248, 131, 112);
    background: var(--color-background);
    color: var(--color-text);
    min-height: 100vh;
    width: 100%;
    font-family: var(--font-main);
    letter-spacing: 1px;
    text-shadow: var(--text-shadow);
    overflow: ${({ isModalOpen }) => (isModalOpen ? 'hidden' : 'initial')};
  }
  header,
  footer {
    padding: var(--gutter);
  }
  a {
    color: var(--color-accent);
    font-size: 1.5rem;
    letter-spacing: 1px;
    cursor: pointer;
    text-shadow: var(--text-shadow-contrast);
    &:visited {
      color: var(--color-accent);
    }
    &:hover {
      text-decoration: none;
      color: var(--color-accent-light);
    }
  }
  .logo a {
    color: var(--color-text);
    letter-spacing: 1px;
    text-shadow: var(--text-shadow);
    text-decoration: none;
    font-size: 2rem;
    &:visited,
    &:hover {
      color: var(--color-text);
    }
  }
  h1 {
    font-size: 4rem;
  }
  h2 {
    font-size: 3rem;
  }
  h3 {
    font-size: 2.2rem;
  }
`}`;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <Head>
        <link rel="icon" href="/icecream-logo.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bangers&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header
        title={
          <Link href="/">
            <a title="Click to go to homepage">Scoopers' Newsletter</a>
          </Link>
        }
        internalLinks={[
          {
            text: 'Our Icecream Truck',
            href: '/icecream-truck',
            title: 'View our Icecream Truck Deals!',
          },
        ]}
      />
      <StyledMaxContainer>
        <StyledPageWrapper>
          <Component {...pageProps} />
        </StyledPageWrapper>
      </StyledMaxContainer>
      <Footer />
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp;
