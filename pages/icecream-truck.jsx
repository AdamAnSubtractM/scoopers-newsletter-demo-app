import Head from 'next/head';
import React from 'react';
import { StyledFlexContainer } from '../styles/FlexContainer';

export default function IcecreamTruck() {
  return (
    <div className="container">
      <Head>
        <title>Scoopers' Icecream Truck | Push Notifications Demo</title>
      </Head>

      <main>
        <StyledFlexContainer as="section">Ice Cream Page</StyledFlexContainer>
      </main>
    </div>
  );
}
