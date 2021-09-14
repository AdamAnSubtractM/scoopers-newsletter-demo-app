import Image from 'next/image';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import cherryCordial from '../public/cherry-cordial.png';
import mexicanChocolate from '../public/mexican-chocolate.png';
import strawberryCherrySupreme from '../public/strawberry-cherry-supreme.png';
import whitehouse from '../public/whitehouse.png';
import strawberryVanilla from '../public/strawberry-vanilla.png';
import vanilla from '../public/vanilla.png';

export default function IcecreamCarousel() {
  const imageList = [
    {
      title: `Mexican Chocolate`,
      src: mexicanChocolate,
      alt: 'Chocolate with a hint of heat from cinnamon and cayenne.',
    },
    {
      title: `Cherry Cordial`,
      src: cherryCordial,
      alt: '(Pink) vanilla with Maraschino chunks and chocolate chips in a cone.',
    },
    {
      title: `Strawberry Cherry Supreme`,
      src: strawberryCherrySupreme,
      alt: 'Strawberry Cherry Supreme Icecream in a cone.',
    },
    {
      title: `Whitehouse`,
      src: whitehouse,
      alt: '(White) vanilla with Maraschino cherrry chunks.',
    },
    {
      title: `Strawberry Vanilla`,
      src: strawberryVanilla,
      alt: 'Strawberry Vanilla Icecream in a cone.',
    },
    {
      title: `Vanilla`,
      src: vanilla,
      alt: 'Vanilla Icecream in a cone.',
    },
  ];

  return (
    <Carousel
      renderThumbs={() =>
        imageList.map((image, idx) => (
          <Image key={`thumbnail-${idx}`} src={image.src} alt={image.alt} />
        ))
      }
    >
      {imageList.map((image, idx) => (
        <div key={`image-${idx}`}>
          <Image src={image.src} alt={image.alt} width={216.7} height={400} />
          <p style={{ marginBottom: `2rem` }}>{image.title}</p>
        </div>
      ))}
    </Carousel>
  );
}
