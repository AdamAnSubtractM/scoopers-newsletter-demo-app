import Image from 'next/image';
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import cherry from '../public/cherry.png';
import chocolateIcecream from '../public/chocolate-supreme.png';
import strawberryCherrySupreme from '../public/strawberry-cherry-supreme.png';
import strawberryCherry from '../public/strawberry-cherry.png';
import strawberryVanilla from '../public/strawberry-vanilla.png';
import vanilla from '../public/vanilla.png';

export default function IcecreamCarousel() {
  const imageList = [
    {
      src: chocolateIcecream,
      alt: 'Chocolate Icecream in a cone.',
    },
    {
      src: cherry,
      alt: 'Cherry Icecream in a cone.',
    },
    {
      src: strawberryCherrySupreme,
      alt: 'Strawberry Cherry Supreme Icecream in a cone.',
    },
    {
      src: strawberryCherry,
      alt: 'Strawberry Cherry Icecream in a cone.',
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
          <Image
            src={image.src}
            alt={image.alt}
            // layout="fill"
            // objectFit="contain"
            width={216.7}
            height={400}
          />
        </div>
      ))}
    </Carousel>
  );
}
