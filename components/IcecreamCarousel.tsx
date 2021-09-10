import Image from 'next/image';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import cherryCordial from '../public/cherry-cordial.png';
import mexicanChocolate from '../public/mexican-chocolate.png';
import strawberryCherrySupreme from '../public/strawberry-cherry-supreme.png';
import blackCherry from '../public/black-cherry.png';
import strawberryVanilla from '../public/strawberry-vanilla.png';
import vanilla from '../public/vanilla.png';

export default function IcecreamCarousel() {
  const imageList = [
    {
      src: mexicanChocolate,
      alt: 'Chocolate with a hint of heat from cinnamon and cayenne.',
    },
    {
      src: cherryCordial,
      alt: '(Pink) vanilla with Maraschino chunks and chocolate chips in a cone.',
    },
    {
      src: strawberryCherrySupreme,
      alt: 'Strawberry Cherry Supreme Icecream in a cone.',
    },
    {
      src: blackCherry,
      alt: '(Pink) vanilla with black cherrry chunks in a cone.',
    },
    {
      src: strawberryVanilla,
      alt: 'Strawberry Vanilla Icecream in a cone.',
    },
    {
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
        </div>
      ))}
    </Carousel>
  );
}
