export type GalleryItem = {
  file: string;
  caption: { ru: string; en: string };
  /** 'wide' — landscape covers the full row, 'tall' — portrait for the masonry feel */
  shape?: 'wide' | 'tall';
  /** true for shots taken in the simulator */
  sim?: boolean;
};

/**
 * Photos of the community gallery.
 * Files live in public/assets/ — drop replacements with the same names to swap images.
 */
export const GALLERY: GalleryItem[] = [
  {
    file: '/assets/night-flight.jpg',
    caption: { ru: 'Ночной полёт под луной', en: 'Night flight under the moon' },
    shape: 'wide',
  },
  {
    file: '/assets/gallery-a350-gate.jpg',
    caption: { ru: 'Airbus A350 у терминала ночью', en: 'Airbus A350 at the gate at night' },
  },
  {
    file: '/assets/gallery-united-tail.jpg',
    caption: { ru: 'Хвост Boeing 787 в свете перрона', en: 'Boeing 787 tail in apron light' },
  },
  {
    file: '/assets/gallery-ryanair-dusk.jpg',
    caption: { ru: 'Хвосты на закате', en: 'Tails at sunset' },
  },
  {
    file: '/assets/gallery-aa-cargo.jpg',
    caption: { ru: 'Погрузка на Boeing 777', en: 'Loading a Boeing 777' },
  },
  {
    file: '/assets/gallery-su34-takeoff.jpg',
    caption: { ru: 'Су-34 в наборе высоты', en: 'Su-34 climbing out' },
    sim: true,
  },
  {
    file: '/assets/gallery-su34-sunset.jpg',
    caption: { ru: 'Су-34 на перроне на закате', en: 'Su-34 on the apron at sunset' },
    sim: true,
  },
  {
    file: '/assets/gallery-f18-dusk.jpg',
    caption: { ru: 'F/A-18 с форсажем в сумерках', en: 'F/A-18 afterburner at dusk' },
    sim: true,
  },
];
