import React, { useState, useEffect, useMemo } from 'react';

const customStyleBlock = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@300;400;500;600;700;800;900&family=Montserrat:wght@100;200;300;400;500;600;700;800&display=swap');

  /* Typography pairs */
  .font-serif {
    font-family: 'Cinzel', serif;
  }
  .font-sans {
    font-family: 'Montserrat', sans-serif;
  }

  /* Ultra-Premium Cinematic Transitions */
  *, *::before, *::after {
    transition: background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
                border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
                color 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
                transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), 
                letter-spacing 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* Keyframe Animations for Luxury Reveal */
  @keyframes revealTextUp {
    from {
      transform: translateY(25px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes premiumFadeIn {
    from { 
      opacity: 0; 
      transform: translateY(10px);
    }
    to { 
      opacity: 1; 
      transform: translateY(0);
    }
  }

  @keyframes subtleLuxuryZoom {
    from { transform: scale(1.04); }
    to { transform: scale(1); }
  }

  @keyframes floatingSoft {
    0% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-5px) rotate(0.25deg); }
    100% { transform: translateY(0px) rotate(0deg); }
  }

  @keyframes elegantPulse {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
  }

  .animate-reveal-up { 
    animation: revealTextUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
  }
  .animate-premium-fade { 
    animation: premiumFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
  }
  .animate-luxury-zoom {
    animation: subtleLuxuryZoom 8s cubic-bezier(0.16, 1, 0.3, 1) infinite alternate;
  }
  .animate-elegant-pulse {
    animation: elegantPulse 3s infinite ease-in-out;
  }
  .animate-floating {
    animation: floatingSoft 6s infinite ease-in-out;
  }

  /* Luxury Interactive Hovers */
  .hover-text-expand:hover {
    letter-spacing: 0.28em !important;
    color: #B76E79 !important; /* Rose Gold Accent */
  }

  .hover-underline-gold {
    position: relative;
  }
  .hover-underline-gold::after {
    content: '';
    position: absolute;
    width: 0;
    height: 1px;
    bottom: -2px;
    left: 0;
    background-color: #B76E79; /* Rose Gold Accent */
    transition: width 0.3s ease;
  }
  .hover-underline-gold:hover::after {
    width: 100%;
  }

  /* Custom Sleek Scrollbar in Premium Beige/Burgundy */
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  ::-webkit-scrollbar-track {
    background: #FAF5EF; 
  }
  .dark ::-webkit-scrollbar-track {
    background: #120d0e;
  }
  ::-webkit-scrollbar-thumb {
    background: #800020; /* Burgundy */
    border-radius: 999px;
  }
`;

const PRODUCTS = [
  {
    id: 'f-1',
    name: 'Silk Drapery Evening Gown',
    category: 'Fashion',
    subCategory: 'Women Dresses',
    price: 349.00,
    discountPrice: 299.00,
    rating: 4.9,
    reviews: 124,
    badge: 'Trending',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Elevate your evening look with this exquisitely draped evening gown in premium Italian mulberry silk. Featuring a subtle thigh-slit, elegant open back, and delicate hand-stitched details.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Emerald', 'Midnight Black', 'Rose Champagne']
  },
  {
    id: 'f-2',
    name: 'Tailored Wool-Blend Double Blazer',
    category: 'Fashion',
    subCategory: 'Men Dresses',
    price: 289.00,
    discountPrice: null,
    rating: 4.8,
    reviews: 86,
    badge: 'Exclusive',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Perfect for formal and elevated casual wear. Designed with structured shoulders, peak lapels, and custom tortoiseshell buttons. Crafted from lightweight, breathable virgin wool blend.',
    sizes: ['48', '50', '52', '54'],
    colors: ['Oatmeal', 'Navy', 'Charcoal']
  },
  {
    id: 'f-3',
    name: 'Minimalist Lino Casual Shirt',
    category: 'Fashion',
    subCategory: 'Casual Wear',
    price: 89.00,
    discountPrice: 75.00,
    rating: 4.6,
    reviews: 54,
    badge: 'Summer Collection',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1621072156002-e2fcc103e869?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Relaxed fit shirt constructed from organic European flax. Superbly soft, breathable, and pre-washed to prevent shrinking. Ideal for sunset gatherings or everyday elegant comfort.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Pure White', 'Sage Green', 'Warm Sand']
  },
  {
    id: 'f-4',
    name: 'Belgrave Double-Breasted Wool Coat',
    category: 'Fashion',
    subCategory: 'Winter Collection',
    price: 395.00,
    discountPrice: 340.00,
    rating: 4.9,
    reviews: 79,
    badge: 'Limited Edition',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Command cold-weather seasons with this exquisite structural overcoat. Featuring premium Italian heavy wool, bespoke satin inner linings, and custom horn-style tailored buttons.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Camel', 'Chic Onyx', 'Winter Cream']
  },
  {
    id: 'f-5',
    name: 'Golden Hour Pleated Midi Dress',
    category: 'Fashion',
    subCategory: 'Trending Collection',
    price: 245.00,
    discountPrice: 195.00,
    rating: 4.8,
    reviews: 62,
    badge: 'Trending',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'A radiant fluid midi dress that catches the breeze and the light beautifully. Detailed with a dynamic hand-pleated tiered structure and customizable halterneck tie.',
    sizes: ['S', 'M', 'L'],
    colors: ['Rose Gold', 'Sunset Coral']
  },
  {
    id: 'f-6',
    name: 'Classic Midnight Tuxedo Suit',
    category: 'Fashion',
    subCategory: 'Formal Wear',
    price: 499.00,
    discountPrice: null,
    rating: 5.0,
    reviews: 38,
    badge: 'Bespoke',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'The pinnacle of luxury evening wear. Hand-crafted formal tuxedo with pure satin lapels, streamlined jacket contour, and structured elegant straight-leg trousers.',
    sizes: ['48', '50', '52', '54'],
    colors: ['Midnight Obsidian']
  },
  {
    id: 'c-1',
    name: 'Nectar Glow Velvet Lipstick',
    category: 'Beauty / Cosmetics',
    subCategory: 'Lipsticks',
    price: 45.00,
    discountPrice: 38.00,
    rating: 4.9,
    reviews: 215,
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Infused with hydrating hyaluronic acid and white rose extract, this award-winning formulation delivers intense pigment payoff in a single swipe with a velvety satin-luxe finish.',
    sizes: ['Standard Size'],
    colors: ['Rose Gold Tint', 'Crimson Noir', 'Dusk Nude']
  },
  {
    id: 'c-2',
    name: 'Radiant Luminous Skin Foundation',
    category: 'Beauty / Cosmetics',
    subCategory: 'Foundations',
    price: 58.00,
    discountPrice: null,
    rating: 4.7,
    reviews: 198,
    badge: 'Award Winner',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'A buildable, medium-coverage foundation that mirrors natural skin luminosity while hydrating with squalane and filtering harmful blue-light elements.',
    sizes: ['30ml'],
    colors: ['Porcelain', 'Beige Sand', 'Warm Honey', 'Deep Amber']
  },
  {
    id: 'c-3',
    name: 'Elysian Bloom Eau De Parfum',
    category: 'Beauty / Cosmetics',
    subCategory: 'Perfumes',
    price: 135.00,
    discountPrice: 115.00,
    rating: 4.9,
    reviews: 312,
    badge: 'Luxury',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Notes of Parisian Jasmine, Bergamot, and rich Madagascan Vanilla converge with a warm cedarwood base to define this elegant, hypnotic fragrance of signature memories.',
    sizes: ['50ml', '100ml'],
    colors: ['Glass Gold Bottle']
  },
  {
    id: 'c-4',
    name: 'Retinol & Peony Regenerative Serum',
    category: 'Beauty / Cosmetics',
    subCategory: 'Skincare',
    price: 95.00,
    discountPrice: 80.00,
    rating: 4.9,
    reviews: 142,
    badge: 'Vegan Skincare',
    image: 'https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'An overnight botanical miracle. Reverses dry lines and enhances cellular rejuvenation using patented micro-encapsulated organic retinol and wild peonies.',
    sizes: ['50ml'],
    colors: ['Opal Glass Jar']
  },
  {
    id: 'sh-1',
    name: 'Prism Metallic Stiletto Heels',
    category: 'Footwear',
    subCategory: 'Women Heels',
    price: 195.00,
    discountPrice: 165.00,
    rating: 4.8,
    reviews: 94,
    badge: 'Trending',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Turn heads with these modern structural stilettos. Crafted in premium mirrored leather with soft memory foam footbeds for unmatched all-night style and exquisite poise.',
    sizes: ['36', '37', '38', '39', '40'],
    colors: ['Champagne Mirror', 'Sleek Silver', 'Noir Onyx']
  },
  {
    id: 'sh-2',
    name: 'Apex Air Knit Luxury Sneakers',
    category: 'Footwear',
    subCategory: 'Sneakers',
    price: 160.00,
    discountPrice: null,
    rating: 4.7,
    reviews: 147,
    badge: 'New Arrival',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Minimalist athletic design meets unparalleled comfort. Featuring an eco-knit upper that moves with you and an advanced absorption cup-sole for elite daily responsiveness.',
    sizes: ['40', '41', '42', '43', '44', '45'],
    colors: ['Frost White', 'Asphalt Grey', 'Carbon Black']
  },
  {
    id: 'sh-3',
    name: 'Amalfi Braided Leather Sandals',
    category: 'Footwear',
    subCategory: 'Men Sandals',
    price: 110.00,
    discountPrice: 95.00,
    rating: 4.5,
    reviews: 33,
    badge: 'Hand-Crafted',
    image: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Artisanal Italian leather straps braided smoothly for optimal breathability and timeless style during oceanside retreats.',
    sizes: ['41', '42', '43', '44'],
    colors: ['Chestnut Brown', 'Tuscan Tan']
  }
];

const HERO_SLIDES = [
  {
    title: 'THE COUTURE EDIT',
    subtitle: 'HERITAGE MEETS CHIC',
    badge: 'NEW COUTURE 2026',
    description: 'Immerse in fluid, handcrafted silk gowns, deep burgundy wool overcoats, and modern elements structured to move gracefully.',
    bgImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=2000&auto=format&fit=crop',
    ctaText: 'Explore Couture',
    category: 'Fashion'
  },
  {
    title: 'GLOW REIMAGINED',
    subtitle: 'THE MODERN BEAUTY STANDARD',
    badge: 'BOTANICAL LAB FORMULATION',
    description: 'Enrich your beauty ritual with hydration active-infused luxury serums, velvet lipsticks, and radiant skin foundations.',
    bgImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2000&auto=format&fit=crop',
    ctaText: 'Discover Cosmetics',
    category: 'Beauty / Cosmetics'
  },
  {
    title: 'POISE & WALK',
    subtitle: 'CONTEMPORARY FOOTWEAR',
    badge: 'EDITORIAL DESIGNS',
    description: 'Step into architectural heel contours and minimal sneakers engineered for sophisticated day-to-night versatility.',
    bgImage: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2000&auto=format&fit=crop',
    ctaText: 'Shop Footwear',
    category: 'Footwear'
  }
];

const Icons = {
  ShoppingBag: ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
  ),
  Heart: ({ className = 'w-6 h-6', filled = false }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill={filled ? '#B76E79' : 'none'} viewBox="0 0 24 24" strokeWidth="1" stroke={filled ? '#B76E79' : 'currentColor'} className={`${className} ${filled ? 'text-[#B76E79]' : ''}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  ),
  User: ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  ),
  Search: ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.637 10.637Z" />
    </svg>
  ),
  Menu: ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
    </svg>
  ),
  X: ({ className = 'w-6 h-6' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  ),
  ChevronDown: ({ className = 'w-4 h-4' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  ),
  ArrowRight: ({ className = 'w-4 h-4' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  ),
  ArrowLeft: ({ className = 'w-4 h-4' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
  ),
  Star: ({ className = 'w-4 h-4', filled = false }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill={filled ? '#B76E79' : 'none'} viewBox="0 0 24 24" strokeWidth="1" stroke={filled ? '#B76E79' : 'currentColor'} className={`${className} ${filled ? 'text-[#B76E79]' : ''}`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.15-.443.765-.443.91 0l2.122 6.54a.5.5 0 0 0 .475.345l6.879.02c.467.001.66.579.282.857l-5.564 4.093a.5.5 0 0 0-.182.557l2.128 6.52c.143.439-.364.807-.74.526l-5.564-4.137a.5.5 0 0 0-.58 0l-5.564 4.137c-.376.281-.883-.087-.74-.526l2.128-6.52a.5.5 0 0 0-.182-.557L2.9 11.262c-.378-.278-.185-.856.282-.857l6.879-.02a.5.5 0 0 0 .475-.345L11.48 3.5Z" />
    </svg>
  ),
  Eye: ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  ),
  Trash: ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
  ),
  Sun: ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21M4.22 4.22l1.51 1.51M18.27 18.27l1.51 1.51M3 12h2.25m13.5 0H21M4.22 19.78l1.51-1.51M18.27 5.73l1.51 1.51M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z" />
    </svg>
  ),
  Moon: ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
    </svg>
  ),
  Sparkles: ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l-.813-5.096L3.091 15 8.187 14.187 9 9l.813 5.187L14.909 15l-5.096.904zM19.006 5.494L18.5 8l-.506-2.506L15.488 5l2.506-.506L18.5 2l.506 2.494L21.512 5l-2.506.494z" />
    </svg>
  ),
  Filter: ({ className = 'w-5 h-5' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
    </svg>
  )
};

const handleImageError = (e) => {
  e.target.onerror = null;
  e.target.src = 'https://placehold.co/600x800/FAF5EF/800020?text=Aura+Luxe';
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); 
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // Filters State
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');
  const [activeSubCategoryFilter, setActiveSubCategoryFilter] = useState('All');
  const [priceRange, setPriceRange] = useState(500);
  const [sortBy, setSortBy] = useState('featured'); 

  // Luxury Bag and Wishlist States
  const [cart, setCart] = useState([
    { product: PRODUCTS[0], quantity: 1, color: 'Midnight Black', size: 'M' },
    { product: PRODUCTS[6], quantity: 2, color: 'Rose Gold Tint', size: 'Standard Size' }
  ]);
  const [wishlist, setWishlist] = useState([PRODUCTS[2], PRODUCTS[8]]);
  const [isLoading, setIsLoading] = useState(false);

  // Component Dialog and Layout states
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [promotionalBannerVisible, setPromotionalBannerVisible] = useState(true);

  // VIP Auth Mock
  const [user, setUser] = useState(null); 
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  // Toast Alerts & Carousels
  const [toast, setToast] = useState({ message: '', visible: false, type: 'success' });
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Elegant Interactive Cursor trail tracking color scheme
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable = target.closest('button, a, select, input, [role="button"]');
      setIsHoveringClickable(!!isClickable);
    };
    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(slideTimer);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const showToast = (message, type = 'success') => {
    setToast({ message, visible: true, type });
    setTimeout(() => {
      setToast({ message: '', visible: false, type: 'success' });
    }, 3200);
  };

  const handleAddToCart = (product, selectedColor = null, selectedSize = null, qty = 1) => {
    const targetColor = selectedColor || (product.colors ? product.colors[0] : 'N/A');
    const targetSize = selectedSize || (product.sizes ? product.sizes[0] : 'N/A');
    
    const existingIndex = cart.findIndex(item => 
      item.product.id === product.id && 
      item.color === targetColor && 
      item.size === targetSize
    );

    if (existingIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += qty;
      setCart(updatedCart);
    } else {
      setCart([...cart, { product, quantity: qty, color: targetColor, size: targetSize }]);
    }
    showToast(`Added "${product.name}" to your Aura Shopping Bag.`);
  };

  const handleRemoveFromCart = (index) => {
    const item = cart[index];
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    showToast(`Removed "${item.product.name}" from your bag.`, 'info');
  };

  const updateCartQuantity = (index, delta) => {
    const updatedCart = [...cart];
    const targetItem = updatedCart[index];
    const nextQty = targetItem.quantity + delta;
    if (nextQty <= 0) {
      handleRemoveFromCart(index);
    } else {
      targetItem.quantity = nextQty;
      setCart(updatedCart);
    }
  };

  const handleToggleWishlist = (product) => {
    const exists = wishlist.some(item => item.id === product.id);
    if (exists) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
      showToast(`Removed from your design collection wishlist.`, 'info');
    } else {
      setWishlist([...wishlist, product]);
      showToast(`Saved to your gorgeous luxury wishlist.`);
    }
  };

  const navigateToPage = (pageName) => {
    setIsLoading(true);
    setCurrentPage(pageName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const navigateToProductDetail = (product) => {
    setSelectedProduct(product);
    navigateToPage('product-detail');
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setCart([]);
    navigateToPage('home');
    showToast('Your reservation code has been generated. Welcome to Aura Privilege Lounge.', 'success');
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (!authEmail || !authPassword) {
      showToast('Please fulfill the exquisite credentials requested.', 'error');
      return;
    }
    setUser({ email: authEmail, name: authEmail.split('@')[0] });
    showToast(`Welcome back, ${authEmail.split('@')[0].toUpperCase()}. VIP Portal activated.`);
    navigateToPage('home');
  };

  const cartSubtotal = useMemo(() => {
    return cart.reduce((total, item) => {
      const activePrice = item.product.discountPrice || item.product.price;
      return total + (activePrice * item.quantity);
    }, 0);
  }, [cart]);

  const cartTotalCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(prod => {
      const matchesCat = activeCategoryFilter === 'All' || prod.category === activeCategoryFilter;
      const matchesSubCat = activeSubCategoryFilter === 'All' || prod.subCategory === activeSubCategoryFilter;
      const activePrice = prod.discountPrice || prod.price;
      const matchesPrice = activePrice <= priceRange;

      const matchesSearch = searchQuery === '' || 
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.subCategory.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCat && matchesSubCat && matchesPrice && matchesSearch;
    }).sort((a, b) => {
      const priceA = a.discountPrice || a.price;
      const priceB = b.discountPrice || b.price;
      if (sortBy === 'price-low') return priceA - priceB;
      if (sortBy === 'price-high') return priceB - priceA;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; 
    });
  }, [activeCategoryFilter, activeSubCategoryFilter, priceRange, sortBy, searchQuery]);

  return (
    <div className="min-h-screen w-full transition-all duration-700 ease-out font-sans bg-[#FAF5EF] text-[#1A1A1A] dark:bg-[#120d0e] dark:text-[#F5E6D3] overflow-x-hidden relative">
      
      {/* Custom Styles Injection */}
      <style dangerouslySetInnerHTML={{ __html: customStyleBlock }} />

      {/* Cursor Element */}
      <div 
        className="hidden md:block fixed pointer-events-none z-50 transition-all duration-300 rounded-full"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          width: isHoveringClickable ? '48px' : '14px',
          height: isHoveringClickable ? '48px' : '14px',
          transform: 'translate(-50%, -50%)',
          backgroundColor: isHoveringClickable ? 'rgba(128, 0, 32, 0.15)' : '#800020', /* Classy Burgundy */
          border: isHoveringClickable ? '2px solid #B76E79' : '1px solid #FAF5EF', /* Rose Gold hover border */
          boxShadow: isHoveringClickable 
            ? '0 0 20px rgba(183, 110, 121, 0.6)' 
            : '0 0 10px rgba(128, 0, 32, 0.4)',
        }}
      />

      {/* Progress Scroll Indicator in Burgundy & Rose Gold */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#B76E79] via-[#800020] to-[#B76E79] z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Dynamic luxury toast alert */}
      {toast.visible && (
        <div className="fixed top-6 right-6 z-50 animate-reveal-up flex items-center space-x-3 bg-[#FAF5EF]/95 dark:bg-[#1C1617]/95 backdrop-blur-xl border border-[#B76E79]/40 shadow-2xl rounded-xl px-6 py-3.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#800020] animate-ping"></span>
          <p className="text-[10px] uppercase tracking-[0.15em] font-medium text-[#1A1A1A] dark:text-[#F5E6D3]">{toast.message}</p>
        </div>
      )}

      {/* Promotional Global Banner in Burgundy and Beige */}
      {promotionalBannerVisible && (
        <div className="relative bg-[#800020] text-[#F5E6D3] text-[10px] tracking-[0.25em] py-3 px-4 text-center border-b border-[#B76E79]/30 uppercase font-semibold flex items-center justify-center space-x-2">
          <Icons.Sparkles className="w-3.5 h-3.5 text-[#B76E79] animate-spin" />
          <span className="animate-elegant-pulse">Complimentary worldwide premium shipping on orders above $150 • CODE "AURA10" FOR 10% VIP DISCOUNT</span>
          <button 
            onClick={() => setPromotionalBannerVisible(false)} 
            className="absolute right-4 hover:text-[#B76E79] transition-all p-1 text-[#F5E6D3]"
          >
            <Icons.X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header Container Optimized */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#FAF5EF]/90 dark:bg-[#120d0e]/90 border-b border-[#F5E6D3]/40 dark:border-[#B76E79]/10 transition-all duration-500 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between gap-x-4 sm:gap-x-6 w-full">
          
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button 
              onClick={() => setMobileMenuOpen(true)} 
              className="lg:hidden p-2 text-[#1A1A1A] dark:text-[#F5E6D3] hover:text-[#800020] transition-colors"
            >
              <Icons.Menu className="w-6 h-6" />
            </button>
            
            <div 
              onClick={() => navigateToPage('home')} 
              className="cursor-pointer group flex flex-col items-start"
            >
              <span className="text-xl sm:text-2xl font-black tracking-[0.35em] font-serif bg-gradient-to-r from-[#800020] via-[#B76E79] to-[#800020] bg-clip-text text-transparent group-hover:tracking-[0.42em]">AURA LUXE</span>
              <span className="text-[8px] tracking-[0.5em] text-[#1A1A1A]/60 dark:text-[#F5E6D3]/60 uppercase -mt-0.5 group-hover:text-[#B76E79] font-semibold">HAUTE COUTURE & BEAUTÉ</span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10 text-[10px] font-semibold tracking-[0.25em] uppercase flex-shrink-0">
            <button 
              onClick={() => navigateToPage('home')} 
              className={`hover-text-expand hover-underline-gold py-2 relative transition-all ${currentPage === 'home' ? 'text-[#800020] font-bold' : 'text-[#1A1A1A] dark:text-[#F5E6D3]'}`}
            >
              Home
            </button>
            <button 
              onClick={() => { setActiveCategoryFilter('All'); navigateToPage('shop'); }} 
              className={`hover-text-expand hover-underline-gold py-2 relative transition-all ${currentPage === 'shop' ? 'text-[#800020] font-bold' : 'text-[#1A1A1A] dark:text-[#F5E6D3]'}`}
            >
              Catalogue
            </button>
            
            {/* Mega menu */}
            <div className="relative group py-2 cursor-pointer">
              <span className="hover-text-expand flex items-center space-x-1.5 hover-underline-gold text-[#1A1A1A] dark:text-[#F5E6D3]">
                <span>Collections</span>
                <Icons.ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
              </span>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[540px] bg-[#FAF5EF] dark:bg-[#120d0e] border border-[#F5E6D3] dark:border-[#B76E79]/20 rounded-2xl shadow-2xl p-7 grid grid-cols-2 gap-7 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-500 z-50 backdrop-blur-2xl">
                <div>
                  <h4 className="text-[#800020] font-bold text-[9px] tracking-[0.25em] mb-4 pb-1.5 border-b border-[#F5E6D3]/40 dark:border-[#B76E79]/10 font-serif">FASHION COUTURE</h4>
                  <ul className="space-y-3 text-[#1A1A1A] dark:text-[#F5E6D3] text-xs tracking-wide font-sans">
                    <li><button onClick={() => { setActiveCategoryFilter('Fashion'); setActiveSubCategoryFilter('Women Dresses'); navigateToPage('shop'); }} className="hover:text-[#B76E79] hover:translate-x-1.5 block text-[#1A1A1A] dark:text-[#F5E6D3] text-left">Women's Premium Dresses</button></li>
                    <li><button onClick={() => { setActiveCategoryFilter('Fashion'); setActiveSubCategoryFilter('Men Dresses'); navigateToPage('shop'); }} className="hover:text-[#B76E79] hover:translate-x-1.5 block text-[#1A1A1A] dark:text-[#F5E6D3] text-left">Men's Bespoke Suits</button></li>
                    <li><button onClick={() => { setActiveCategoryFilter('Fashion'); setActiveSubCategoryFilter('Casual Wear'); navigateToPage('shop'); }} className="hover:text-[#B76E79] hover:translate-x-1.5 block text-[#1A1A1A] dark:text-[#F5E6D3] text-left">Premium Casual Wear</button></li>
                    <li><button onClick={() => { setActiveCategoryFilter('Fashion'); setActiveSubCategoryFilter('Winter Collection'); navigateToPage('shop'); }} className="hover:text-[#B76E79] hover:translate-x-1.5 block text-[#1A1A1A] dark:text-[#F5E6D3] text-left">Winter Cozy Layers</button></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[#800020] font-bold text-[9px] tracking-[0.25em] mb-4 pb-1.5 border-b border-[#F5E6D3]/40 dark:border-[#B76E79]/10 font-serif">COSMETICS & ACCENTS</h4>
                  <ul className="space-y-3 text-[#1A1A1A] dark:text-[#F5E6D3] text-xs tracking-wide font-sans">
                    <li><button onClick={() => { setActiveCategoryFilter('Beauty / Cosmetics'); setActiveSubCategoryFilter('Lipsticks'); navigateToPage('shop'); }} className="hover:text-[#B76E79] hover:translate-x-1.5 block text-[#1A1A1A] dark:text-[#F5E6D3] text-left">Hydrating Lipsticks</button></li>
                    <li><button onClick={() => { setActiveCategoryFilter('Beauty / Cosmetics'); setActiveSubCategoryFilter('Foundations'); navigateToPage('shop'); }} className="hover:text-[#B76E79] hover:translate-x-1.5 block text-[#1A1A1A] dark:text-[#F5E6D3] text-left">Silk Glow Foundations</button></li>
                    <li><button onClick={() => { setActiveCategoryFilter('Beauty / Cosmetics'); setActiveSubCategoryFilter('Skincare'); navigateToPage('shop'); }} className="hover:text-[#B76E79] hover:translate-x-1.5 block text-[#1A1A1A] dark:text-[#F5E6D3] text-left">Organic Botanicals & Serums</button></li>
                    <li><button onClick={() => { setActiveCategoryFilter('Footwear'); setActiveSubCategoryFilter('All'); navigateToPage('shop'); }} className="hover:text-[#B76E79] hover:translate-x-1.5 block text-[#1A1A1A] dark:text-[#F5E6D3] text-left">Architectural Shoes</button></li>
                  </ul>
                </div>
              </div>
            </div>

            <button onClick={() => navigateToPage('about')} className="hover-text-expand hover-underline-gold py-2 text-[#1A1A1A] dark:text-[#F5E6D3]">Maison Aura</button>
            <button onClick={() => navigateToPage('contact')} className="hover-text-expand hover-underline-gold py-2 text-[#1A1A1A] dark:text-[#F5E6D3]">Correspondence</button>
          </nav>

          {/* Icons and responsive utilities search */}
          <div className="flex items-center space-x-2 sm:space-x-4 lg:ml-6 xl:ml-12 flex-shrink-0">
            <div className="relative hidden md:block w-36 lg:w-44 xl:w-52">
              <input 
                type="text" 
                placeholder="Search elegant pieces..." 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (currentPage !== 'shop') setCurrentPage('shop');
                }}
                className="w-full text-[10px] tracking-widest py-2 px-3 pr-8 rounded-full border border-[#F5E6D3] dark:border-[#B76E79]/20 bg-white dark:bg-[#120d0e] focus:outline-none focus:border-[#B76E79] focus:ring-1 focus:ring-[#B76E79] transition-all text-[#1A1A1A] dark:text-white font-sans shadow-inner"
              />
              <Icons.Search className="w-3.5 h-3.5 text-[#1A1A1A]/40 dark:text-[#F5E6D3]/40 absolute right-3 top-2.5" />
            </div>

            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className="p-2 rounded-full hover:bg-[#F5E6D3]/30 dark:hover:bg-[#120d0e]/55 text-[#1A1A1A] dark:text-[#F5E6D3] transition-all hover:scale-110 flex-shrink-0"
              title="Toggle Theme"
            >
              {darkMode ? <Icons.Sun className="w-4 h-4 text-[#B76E79]" /> : <Icons.Moon className="w-4 h-4 text-[#800020]" />}
            </button>

            <button 
              onClick={() => navigateToPage('wishlist')} 
              className="relative p-2 rounded-full hover:bg-[#F5E6D3]/30 dark:hover:bg-[#120d0e]/55 text-[#1A1A1A] dark:text-[#F5E6D3] transition-all hover:scale-110 flex-shrink-0"
            >
              <Icons.Heart className="w-4 h-4 text-[#B76E79]" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-[#800020] text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button 
              onClick={() => setIsCartSidebarOpen(true)} 
              className="relative p-2 rounded-full hover:bg-[#F5E6D3]/30 dark:hover:bg-[#120d0e]/55 text-[#1A1A1A] dark:text-[#F5E6D3] transition-all hover:scale-110 flex-shrink-0"
            >
              <Icons.ShoppingBag className="w-4 h-4 text-[#800020]" />
              {cartTotalCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#800020] text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold animate-pulse">
                  {cartTotalCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => {
                if (user) {
                  setUser(null);
                  showToast('Signed out of Aura VIP Lounge.', 'info');
                } else {
                  navigateToPage('login');
                }
              }} 
              className="hidden sm:flex items-center space-x-1.5 p-2 rounded-full hover:bg-[#F5E6D3]/30 dark:hover:bg-[#120d0e]/55 text-[#1A1A1A] dark:text-[#F5E6D3] transition-all hover:scale-110 flex-shrink-0"
              title={user ? `Signed in as ${user.name}` : 'Aura Portal Login'}
            >
              <Icons.User className="w-4 h-4 text-[#B76E79]" />
              {user && <span className="text-[9px] uppercase font-bold text-[#800020] tracking-widest hidden md:inline">Hi, {user.name}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* Main content body */}
      <main className="pb-20 min-h-[60vh]">
        {isLoading ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-10 animate-pulse">
            <div className="h-10 bg-[#F5E6D3] dark:bg-[#1C1617] rounded-xl w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="space-y-4">
                  <div className="h-[360px] bg-[#F5E6D3] dark:bg-[#1C1617] rounded-2xl"></div>
                  <div className="h-4 bg-[#F5E6D3] dark:bg-[#1C1617] rounded w-2/3"></div>
                  <div className="h-4 bg-[#F5E6D3] dark:bg-[#1C1617] rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        ) : (() => {
          switch (currentPage) {
            case 'home':
              return (
                <div className="animate-premium-fade">
                  
                  {/* Hero segment */}
                  <section className="relative h-[85vh] overflow-hidden bg-[#120d0e]">
                    {HERO_SLIDES.map((slide, index) => {
                      const isActive = index === currentSlideIndex;
                      return (
                        <div 
                          key={index} 
                          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-[#120d0e] via-[#120d0e]/45 to-transparent z-10" />
                          <img 
                            src={slide.bgImage} 
                            alt={slide.title} 
                            onError={handleImageError}
                            className="absolute inset-0 w-full h-full object-cover object-center scale-100 animate-luxury-zoom" 
                          />
                          
                          <div className="absolute inset-0 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start text-white">
                            <div className="max-w-xl space-y-4 sm:space-y-7 animate-reveal-up text-left">
                              <span className="inline-block tracking-[0.35em] text-[10px] font-bold text-[#B76E79] bg-[#B76E79]/15 border border-[#B76E79]/30 rounded-full px-5 py-2 uppercase font-sans">
                                {slide.badge}
                              </span>
                              <h1 className="text-3xl sm:text-5xl font-serif font-extrabold tracking-widest leading-tight">
                                {slide.subtitle} <br />
                                <span className="text-[#F5E6D3] font-light italic text-2xl sm:text-4xl tracking-normal">{slide.title}</span>
                              </h1>
                              <p className="text-[#FAF5EF]/80 text-xs sm:text-sm tracking-widest leading-relaxed font-light font-sans">
                                {slide.description}
                              </p>
                              <div className="flex space-x-4 pt-4">
                                <button 
                                  onClick={() => { setActiveCategoryFilter(slide.category); navigateToPage('shop'); }}
                                  className="group flex items-center space-x-3 bg-[#800020] hover:bg-[#B76E79] text-[#FAF5EF] font-bold tracking-[0.2em] uppercase text-[10px] px-8 py-4 rounded-full transition-all duration-300 shadow-2xl font-sans"
                                >
                                  <span>{slide.ctaText}</span>
                                  <Icons.ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-2 transition-transform duration-300" />
                                </button>
                                <button 
                                  onClick={() => { setActiveCategoryFilter('All'); navigateToPage('shop'); }}
                                  className="border border-[#FAF5EF]/30 hover:bg-[#FAF5EF]/10 text-white font-semibold tracking-[0.2em] uppercase text-[10px] px-8 py-4 rounded-full transition-all duration-300 font-sans"
                                >
                                  Browse Ensembles
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <div className="absolute bottom-8 right-8 z-20 flex space-x-3">
                      {HERO_SLIDES.map((_, idx) => (
                        <button 
                          key={idx}
                          onClick={() => setCurrentSlideIndex(idx)}
                          className={`w-10 h-[2px] transition-all duration-300 ${idx === currentSlideIndex ? 'bg-[#800020] w-14' : 'bg-white/30 hover:bg-white/60'}`}
                        />
                      ))}
                    </div>
                  </section>

                  {}
                  <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-3 mb-16">
                      <span className="text-[#800020] font-bold tracking-[0.35em] text-[10px] uppercase font-sans">Premium Portfolios</span>
                      <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-widest text-[#1A1A1A] dark:text-white">The Luxury Universe</h2>
                      <div className="w-16 h-[1px] bg-[#B76E79] mx-auto mt-2"></div>
                      <p className="text-[#1A1A1A]/70 dark:text-[#F5E6D3]/70 max-w-md mx-auto text-xs tracking-widest font-light font-sans">Discover high fashion couture, organic beauty kits, and state of art contemporary footwear.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div 
                        onClick={() => { setActiveCategoryFilter('Fashion'); navigateToPage('shop'); }}
                        className="group relative h-[440px] rounded-2xl overflow-hidden cursor-pointer shadow-2xl border border-[#F5E6D3] dark:border-[#B76E79]/10"
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-[#120d0e] via-[#120d0e]/25 to-transparent z-10" />
                        <img 
                          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop" 
                          alt="Fashion" 
                          onError={handleImageError}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms]"
                        />
                        <div className="absolute bottom-8 left-8 z-20 text-white space-y-1.5 text-left">
                          <span className="text-[#B76E79] text-[9px] tracking-[0.3em] uppercase font-bold font-sans">ELEVATED SELECTION</span>
                          <h3 className="text-xl font-serif font-bold tracking-widest group-hover:text-[#F5E6D3] transition-colors">Fashion Portfolio</h3>
                          <p className="text-[10px] tracking-wide text-[#FAF5EF]/80 opacity-0 group-hover:opacity-100 transition-all duration-500 font-sans">Dresses, blazers & summer sets</p>
                        </div>
                      </div>

                      <div 
                        onClick={() => { setActiveCategoryFilter('Beauty / Cosmetics'); navigateToPage('shop'); }}
                        className="group relative h-[440px] rounded-2xl overflow-hidden cursor-pointer shadow-2xl border border-[#F5E6D3] dark:border-[#B76E79]/10"
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-[#120d0e] via-[#120d0e]/25 to-transparent z-10" />
                        <img 
                          src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1000&auto=format&fit=crop" 
                          alt="Beauty" 
                          onError={handleImageError}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms]"
                        />
                        <div className="absolute bottom-8 left-8 z-20 text-white space-y-1.5 text-left">
                          <span className="text-[#B76E79] text-[9px] tracking-[0.3em] uppercase font-bold font-sans">BOTANICAL GLOW</span>
                          <h3 className="text-xl font-serif font-bold tracking-widest group-hover:text-[#F5E6D3] transition-colors">Cosmetics & Oils</h3>
                          <p className="text-[10px] tracking-wide text-[#FAF5EF]/80 opacity-0 group-hover:opacity-100 transition-all duration-500 font-sans">Foundations, lip colors & perfumes</p>
                        </div>
                      </div>

                      <div 
                        onClick={() => { setActiveCategoryFilter('Footwear'); navigateToPage('shop'); }}
                        className="group relative h-[440px] rounded-2xl overflow-hidden cursor-pointer shadow-2xl border border-[#F5E6D3] dark:border-[#B76E79]/10"
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-[#120d0e] via-[#120d0e]/25 to-transparent z-10" />
                        <img 
                          src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop" 
                          alt="Footwear" 
                          onError={handleImageError}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms]"
                        />
                        <div className="absolute bottom-8 left-8 z-20 text-white space-y-1.5 text-left">
                          <span className="text-[#B76E79] text-[9px] tracking-[0.3em] uppercase font-bold font-sans">PRESTIGE WALKS</span>
                          <h3 className="text-xl font-serif font-bold tracking-widest group-hover:text-[#F5E6D3] transition-colors">Footwear Design</h3>
                          <p className="text-[10px] tracking-wide text-[#FAF5EF]/80 opacity-0 group-hover:opacity-100 transition-all duration-500 font-sans">Modern heels & sneakers</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {}
                  <section className="py-24 bg-[#F5E6D3]/20 dark:bg-[#120d0e]/10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#F5E6D3]/60 dark:border-[#B76E79]/10 pb-8">
                        <div className="space-y-2 text-left">
                          <span className="text-[#800020] font-bold tracking-[0.35em] text-[10px] uppercase font-serif">Highly Acclaimed</span>
                          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-widest text-[#1A1A1A] dark:text-white">Seasonal Best Sellers</h2>
                          <p className="text-[#1A1A1A]/70 dark:text-[#F5E6D3]/70 text-xs tracking-widest font-light font-sans">Indulge in seasonal favorites designed with premium luxury fabrics.</p>
                        </div>
                        <button 
                          onClick={() => { setActiveCategoryFilter('All'); navigateToPage('shop'); }} 
                          className="mt-4 md:mt-0 flex items-center space-x-2 text-[10px] font-bold tracking-[0.25em] uppercase text-[#800020] hover:text-[#B76E79] transition-all hover:translate-x-1.5 font-sans"
                        >
                          <span>Catalogue</span>
                          <Icons.ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {PRODUCTS.slice(0, 4).map((product) => (
                          <div 
                            key={product.id}
                            className="group bg-white dark:bg-[#1C1617] border border-[#F5E6D3]/60 dark:border-[#B76E79]/10 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 relative flex flex-col h-full"
                          >
                            {product.badge && (
                              <span className="absolute top-4 left-4 z-20 bg-[#800020] text-white font-bold tracking-[0.25em] text-[8px] px-3.5 py-1.5 rounded-full uppercase shadow-md animate-elegant-pulse font-sans">
                                {product.badge}
                              </span>
                            )}

                            <button 
                              onClick={() => handleToggleWishlist(product)}
                              className="absolute top-4 right-4 z-20 bg-white/90 dark:bg-[#120d0e]/90 backdrop-blur-md p-2.5 rounded-full text-[#1A1A1A]/70 dark:text-[#F5E6D3] hover:text-[#B76E79] hover:scale-110 transition-all shadow-md"
                            >
                              <Icons.Heart 
                                className="w-3.5 h-3.5" 
                                filled={wishlist.some(item => item.id === product.id)} 
                              />
                            </button>

                            <div className="relative overflow-hidden aspect-[4/5] bg-[#FAF5EF]">
                              <img 
                                src={product.image} 
                                alt={product.name} 
                                onError={handleImageError}
                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-[1200ms]"
                              />
                              
                              <div className="absolute inset-0 bg-[#120d0e]/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center space-x-3 backdrop-blur-[2px]">
                                <button 
                                  onClick={() => setQuickViewProduct(product)}
                                  className="bg-white text-[#1A1A1A] p-3.5 rounded-full hover:bg-[#800020] hover:text-white hover:scale-110 transition-all shadow-lg"
                                  title="Quick View"
                                >
                                  <Icons.Eye className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => handleAddToCart(product)}
                                  className="bg-[#120d0e] text-white p-3.5 rounded-full hover:bg-[#800020] hover:scale-110 transition-all shadow-lg"
                                  title="Add to Cart"
                                >
                                  <Icons.ShoppingBag className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            <div className="p-6 flex-grow flex flex-col justify-between text-left">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-[9px] tracking-[0.2em] text-[#1A1A1A]/70 dark:text-[#F5E6D3]/70 font-bold uppercase font-sans">
                                  <span>{product.subCategory}</span>
                                  <div className="flex items-center space-x-0.5 text-[#B76E79]">
                                    <Icons.Star className="w-3 h-3" filled={true} />
                                    <span>{product.rating}</span>
                                  </div>
                                </div>
                                
                                <h3 
                                  onClick={() => navigateToProductDetail(product)}
                                  className="font-serif font-semibold text-sm text-[#1A1A1A] dark:text-white hover:text-[#800020] cursor-pointer tracking-wider line-clamp-1 text-left"
                                >
                                  {product.name}
                                </h3>
                              </div>

                              <div className="pt-4 flex items-center justify-between border-t border-[#F5E6D3]/40 dark:border-[#B76E79]/10 mt-4">
                                <div className="flex items-center space-x-2 font-sans">
                                  {product.discountPrice ? (
                                    <>
                                      <span className="text-sm font-bold text-[#800020]">${product.discountPrice.toFixed(2)}</span>
                                      <span className="text-[10px] text-[#1A1A1A]/40 dark:text-[#F5E6D3]/40 line-through">${product.price.toFixed(2)}</span>
                                    </>
                                  ) : (
                                    <span className="text-sm font-bold text-[#1A1A1A] dark:text-white">${product.price.toFixed(2)}</span>
                                  )}
                                </div>
                                <button 
                                  onClick={() => handleAddToCart(product)}
                                  className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#800020] hover:text-[#B76E79] transition-all hover:tracking-[0.24em] font-sans"
                                >
                                  + Reserve
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  {}
                  <section className="relative py-32 bg-[#120d0e] overflow-hidden my-12">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#120d0e] via-[#120d0e]/75 to-transparent z-10" />
                    <img 
                      src="https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=2000&auto=format&fit=crop" 
                      alt="Luxury Background" 
                      onError={handleImageError}
                      className="absolute inset-0 w-full h-full object-cover object-center opacity-40 scale-105 animate-luxury-zoom"
                    />
                    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                      <div className="space-y-6 text-left">
                        <span className="text-[#B76E79] font-bold tracking-[0.35em] text-[10px] uppercase font-sans">EXCLUSIVE HERITAGE COUTURE</span>
                        <h2 className="text-3xl sm:text-5xl font-serif font-light leading-snug tracking-wider">The Artisan <br /> <strong className="font-extrabold text-[#800020] italic">Maison Runway</strong></h2>
                        <p className="text-[#FAF5EF]/80 text-xs sm:text-sm tracking-widest leading-relaxed font-light font-sans">
                          Each design within our capsule runway releases undergoes tailored mockups in our Paris studio. Hand-crafted using pure organic-certified linen and flax.
                        </p>
                        <div className="pt-2">
                          <button 
                            onClick={() => { setActiveCategoryFilter('Fashion'); navigateToPage('shop'); }}
                            className="bg-[#800020] hover:bg-[#B76E79] text-white text-[10px] tracking-[0.25em] font-bold uppercase px-8 py-4.5 rounded-full shadow-2xl transition-all font-sans"
                          >
                            Explore Editorial
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6 bg-[#FAF5EF]/5 backdrop-blur-xl p-8 rounded-3xl border border-[#FAF5EF]/10">
                        <div className="space-y-2 text-center p-4 border-r border-b border-white/10 animate-floating">
                          <h3 className="text-3xl font-serif font-extrabold text-[#B76E79] tracking-wider">100%</h3>
                          <p className="text-[8px] tracking-[0.25em] uppercase text-[#FAF5EF]/80 font-bold font-sans">Organic Silk</p>
                        </div>
                        <div className="space-y-2 text-center p-4 border-b border-white/10 animate-elegant-pulse">
                          <h3 className="text-3xl font-serif font-extrabold text-[#B76E79] tracking-wider">4.9★</h3>
                          <p className="text-[8px] tracking-[0.25em] uppercase text-[#FAF5EF]/80 font-bold font-sans">Stylists Score</p>
                        </div>
                        <div className="space-y-2 text-center p-4 border-r border-white/10">
                          <h3 className="text-3xl font-serif font-extrabold text-[#B76E79] tracking-wider">24+</h3>
                          <p className="text-[8px] tracking-[0.25em] uppercase text-[#FAF5EF]/80 font-bold font-sans">Showroom Hubs</p>
                        </div>
                        <div className="space-y-2 text-center p-4">
                          <h3 className="text-3xl font-serif font-extrabold text-[#B76E79] tracking-wider">2026</h3>
                          <p className="text-[8px] tracking-[0.25em] uppercase text-[#FAF5EF]/80 font-bold font-sans">Established</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Beauty cosmetics segment with beautiful layout */}
                  <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-3 mb-16">
                      <span className="text-[#800020] font-bold tracking-[0.35em] text-[10px] uppercase font-serif">Pristine Skincare</span>
                      <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-widest text-[#1A1A1A] dark:text-white">Bestselling Beauty</h2>
                      <div className="w-16 h-[1px] bg-[#B76E79] mx-auto mt-2"></div>
                      <p className="text-[#1A1A1A]/70 dark:text-[#F5E6D3]/70 text-xs tracking-widest font-light font-sans">Purity in bottles. Award winning active botanical elixirs.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                      {PRODUCTS.filter(p => p.category === 'Beauty / Cosmetics').slice(0, 3).map((beautyProd) => (
                        <div key={beautyProd.id} className="group bg-white dark:bg-[#1C1617] rounded-3xl overflow-hidden border border-[#F5E6D3] dark:border-[#B76E79]/10 shadow-xl flex flex-col justify-between">
                          <div className="relative aspect-square bg-[#FAF5EF] overflow-hidden">
                            <img 
                              src={beautyProd.image} 
                              alt={beautyProd.name} 
                              onError={handleImageError}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms]" 
                            />
                          </div>
                          <div className="p-7 space-y-4 text-left">
                            <span className="text-[9px] tracking-[0.25em] text-[#800020] uppercase font-bold font-sans">{beautyProd.subCategory}</span>
                            <h3 onClick={() => navigateToProductDetail(beautyProd)} className="font-serif font-bold text-base tracking-wide hover:text-[#B76E79] cursor-pointer transition-colors line-clamp-1 text-[#1A1A1A] dark:text-white">{beautyProd.name}</h3>
                            <div className="flex items-center justify-between pt-4 border-t border-[#F5E6D3]/60 dark:border-[#B76E79]/10">
                              <span className="text-base font-extrabold text-[#1A1A1A] dark:text-white font-sans">${beautyProd.price.toFixed(2)}</span>
                              <button onClick={() => handleAddToCart(beautyProd)} className="bg-[#800020] text-white text-[9px] uppercase font-bold tracking-[0.2em] px-5 py-3 rounded-full hover:bg-[#B76E79] transition-colors font-sans">Add to Bag</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {}
                  <section className="py-20 bg-[#F5E6D3]/20 dark:bg-[#120d0e]/10 border-t border-[#F5E6D3]/40 dark:border-[#B76E79]/10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 mb-12">
                      <span className="text-[#800020] font-bold tracking-[0.35em] text-[10px] uppercase font-serif">Global Lookbook</span>
                      <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-widest text-[#1A1A1A] dark:text-white">#AuraLuxeMaison</h2>
                      <p className="text-[#1A1A1A]/70 dark:text-[#F5E6D3]/70 text-xs tracking-widest font-light font-sans">Join our privileged circle of lookbooks on social portals.</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 sm:px-0 max-w-7xl mx-auto">
                      {[
                        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop",
                        "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop"
                      ].map((imgSrc, lookIdx) => (
                        <div key={lookIdx} className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-md">
                          <img 
                            src={imgSrc} 
                            alt="Lookbook" 
                            onError={handleImageError}
                            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-[1200ms]" 
                          />
                          <div className="absolute inset-0 bg-[#120d0e]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-[9px] font-bold uppercase tracking-[0.25em] font-sans">Shop Outfit</div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Private newsletter subscription */}
                  <section className="py-24 max-w-4xl mx-auto px-4 text-center space-y-6">
                    <span className="text-[#800020] font-extrabold tracking-[0.3em] text-[10px] uppercase block font-sans">Maison Dispatch Newsletter</span>
                    <h2 className="text-3xl font-serif font-bold tracking-widest text-[#1A1A1A] dark:text-white">Join The Private Showcase</h2>
                    <p className="text-[#1A1A1A]/70 dark:text-[#F5E6D3]/70 text-xs tracking-widest leading-relaxed max-w-md mx-auto font-sans">Join our dispatch to receive coordinates to seasonal trunk-show events, secret codes, and launch alerts.</p>
                    <form onSubmit={(e) => { e.preventDefault(); showToast('Welcome to Maison Dispatch circle.'); }} className="flex max-w-md mx-auto border border-[#F5E6D3] dark:border-[#B76E79]/20 rounded-full overflow-hidden p-1.5 bg-white dark:bg-[#120d0e] transition-all focus-within:border-[#B76E79]">
                      <input 
                        type="email" 
                        required 
                        placeholder="Enter email address..." 
                        className="w-full bg-transparent border-none text-xs px-5 focus:outline-none text-[#1A1A1A] dark:text-white font-sans tracking-widest"
                      />
                      <button type="submit" className="bg-[#800020] hover:bg-[#B76E79] text-white px-7 py-3 rounded-full text-[9px] font-bold uppercase tracking-[0.25em] transition-all flex-shrink-0 font-sans">Subscribe</button>
                    </form>
                  </section>

                </div>
              );

            case 'shop':
              return (
                <div className="animate-premium-fade max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
                  
                  {/* Shop header layout */}
                  <div className="border-b border-[#F5E6D3]/60 dark:border-[#B76E79]/10 pb-8 mb-10 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                    <div className="text-left">
                      <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-widest text-[#1A1A1A] dark:text-white">The Luxury Catalogue</h1>
                      <p className="text-[#1A1A1A]/70 dark:text-[#F5E6D3]/70 text-xs tracking-widest font-light mt-1.5 font-sans">Refining and curating your elegant appearance.</p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3">
                      <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value)}
                        className="text-[10px] font-bold py-2.5 px-5 tracking-[0.2em] rounded-full border border-[#F5E6D3] dark:border-[#B76E79]/20 bg-white dark:bg-[#120d0e] text-[#1A1A1A] dark:text-[#F5E6D3] focus:outline-none focus:border-[#B76E79] font-sans"
                      >
                        <option className="bg-white dark:bg-[#120d0e] text-[#1A1A1A] dark:text-white" value="featured">Featured Ensembles</option>
                        <option className="bg-white dark:bg-[#120d0e] text-[#1A1A1A] dark:text-white" value="price-low">Price: Low to High</option>
                        <option className="bg-white dark:bg-[#120d0e] text-[#1A1A1A] dark:text-white" value="price-high">Price: High to Low</option>
                        <option className="bg-white dark:bg-[#120d0e] text-[#1A1A1A] dark:text-white" value="rating">Stylist Rating</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Catalog sidebars filters */}
                    <aside className="w-full lg:w-64 space-y-6 lg:shrink-0">
                      
                      <div className="bg-white dark:bg-[#1C1617] border border-[#F5E6D3] dark:border-[#B76E79]/15 rounded-2xl p-6 space-y-5 shadow-sm text-left">
                        <h4 className="font-serif font-bold text-xs tracking-widest flex items-center space-x-2 text-[#1A1A1A] dark:text-white">
                          <Icons.Filter className="w-4 h-4 text-[#800020]" />
                          <span>Maison Universe</span>
                        </h4>
                        <div className="flex flex-col space-y-1 text-[11px] tracking-widest font-sans">
                          {['All', 'Fashion', 'Beauty / Cosmetics', 'Footwear'].map((cat) => (
                            <button
                              key={cat}
                              onClick={() => { setActiveCategoryFilter(cat); setActiveSubCategoryFilter('All'); }}
                              className={`text-left py-2.5 px-3 rounded-xl transition-all flex items-center justify-between ${activeCategoryFilter === cat ? 'bg-[#800020]/10 text-[#800020] font-bold' : 'text-[#1A1A1A]/80 dark:text-[#F5E6D3]/80 hover:bg-[#F5E6D3]/30 dark:hover:bg-[#120d0e]/55'}`}
                            >
                              <span>{cat}</span>
                              {activeCategoryFilter === cat && <span className="w-1.5 h-1.5 rounded-full bg-[#800020]"></span>}
                            </button>
                          ))}
                        </div>
                      </div>

                      {activeCategoryFilter !== 'All' && (
                        <div className="bg-white dark:bg-[#1C1617] border border-[#F5E6D3] dark:border-[#B76E79]/15 rounded-2xl p-6 space-y-4 shadow-sm animate-reveal-up text-left font-sans">
                          <h4 className="font-serif font-bold text-[9px] tracking-[0.25em] uppercase text-[#800020]">Sub-Refinement</h4>
                          <div className="flex flex-col space-y-1 text-[11px] tracking-widest font-sans">
                            <button 
                              onClick={() => setActiveSubCategoryFilter('All')}
                              className={`text-left py-2 px-3 rounded-lg ${activeSubCategoryFilter === 'All' ? 'bg-[#F5E6D3]/30 dark:bg-[#120d0e]/55 font-bold text-[#800020]' : 'text-[#1A1A1A]/70 dark:text-[#F5E6D3]/70'}`}
                            >
                              All {activeCategoryFilter}
                            </button>
                            {activeCategoryFilter === 'Fashion' && ['Women Dresses', 'Men Dresses', 'Casual Wear', 'Winter Collection', 'Trending Collection', 'Formal Wear'].map((sub) => (
                              <button 
                                key={sub}
                                onClick={() => setActiveSubCategoryFilter(sub)}
                                className={`text-left py-2 px-3 rounded-lg ${activeSubCategoryFilter === sub ? 'bg-[#F5E6D3]/30 dark:bg-[#120d0e]/55 font-bold text-[#800020]' : 'text-[#1A1A1A]/70 dark:text-[#F5E6D3]/70'}`}
                              >
                                {sub}
                              </button>
                            ))}
                            {activeCategoryFilter === 'Beauty / Cosmetics' && ['Lipsticks', 'Foundations', 'Perfumes', 'Skincare'].map((sub) => (
                              <button 
                                key={sub}
                                onClick={() => setActiveSubCategoryFilter(sub)}
                                className={`text-left py-2 px-3 rounded-lg ${activeSubCategoryFilter === sub ? 'bg-[#F5E6D3]/30 dark:bg-[#120d0e]/55 font-bold text-[#800020]' : 'text-[#1A1A1A]/70 dark:text-[#F5E6D3]/70'}`}
                              >
                                {sub}
                              </button>
                            ))}
                            {activeCategoryFilter === 'Footwear' && ['Women Heels', 'Sneakers', 'Men Sandals'].map((sub) => (
                              <button 
                                key={sub}
                                onClick={() => setActiveSubCategoryFilter(sub)}
                                className={`text-left py-2 px-3 rounded-lg ${activeSubCategoryFilter === sub ? 'bg-[#F5E6D3]/30 dark:bg-[#120d0e]/55 font-bold text-[#800020]' : 'text-[#1A1A1A]/70 dark:text-[#F5E6D3]/70'}`}
                              >
                                {sub}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="bg-white dark:bg-[#1C1617] border border-[#F5E6D3] dark:border-[#B76E79]/15 rounded-2xl p-6 space-y-5 shadow-sm text-left">
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif font-bold text-xs tracking-widest text-[#1A1A1A] dark:text-white">Investment</h4>
                          <span className="text-[10px] font-bold text-[#800020] tracking-wider font-sans">${priceRange} Max</span>
                        </div>
                        <input 
                          type="range" 
                          min="40" 
                          max="500" 
                          value={priceRange} 
                          onChange={(e) => setPriceRange(Number(e.target.value))}
                          className="w-full accent-[#800020] bg-[#FAF5EF] dark:bg-[#120d0e] h-[3px] rounded-full cursor-pointer"
                        />
                        <div className="flex justify-between text-[9px] tracking-widest text-[#1A1A1A]/50 dark:text-[#F5E6D3]/50 font-bold font-sans">
                          <span>$40</span>
                          <span>$500</span>
                        </div>
                      </div>

                    </aside>

                    {}
                    <div className="flex-grow">
                      {filteredProducts.length === 0 ? (
                        <div className="bg-white dark:bg-[#1C1617] border border-dashed border-[#F5E6D3] dark:border-[#B76E79]/20 rounded-3xl p-16 text-center space-y-4">
                          <span className="text-4xl">✨</span>
                          <h3 className="text-xl font-serif font-bold tracking-widest text-[#1A1A1A] dark:text-white">No Premium Ensembles matched</h3>
                          <p className="text-[#1A1A1A]/60 dark:text-[#F5E6D3]/60 text-xs tracking-widest font-light max-w-sm mx-auto font-sans">Try refining your filter ranges or reset parameters to explore standard collections.</p>
                          <button 
                            onClick={() => { setActiveCategoryFilter('All'); setActiveSubCategoryFilter('All'); setPriceRange(500); setSearchQuery(''); }}
                            className="bg-[#800020] text-white px-8 py-3.5 rounded-full text-[9px] font-bold uppercase tracking-[0.25em] font-sans shadow-md"
                          >
                            Reset Catalogue filters
                          </button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                          {filteredProducts.map((product) => (
                            <div 
                              key={product.id}
                              className="group bg-white dark:bg-[#1C1617] border border-[#F5E6D3] dark:border-[#B76E79]/15 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full shadow-sm"
                            >
                              <div className="relative overflow-hidden aspect-[4/5] bg-[#FAF5EF]">
                                {product.badge && (
                                  <span className="absolute top-4 left-4 z-20 bg-[#800020] text-white font-bold tracking-[0.2em] text-[8px] px-3.5 py-1.5 rounded-full uppercase font-sans">
                                    {product.badge}
                                  </span>
                                )}
                                <button 
                                  onClick={() => handleToggleWishlist(product)}
                                  className="absolute top-4 right-4 z-20 bg-white/90 dark:bg-[#120d0e]/90 p-2.5 rounded-full text-[#1A1A1A]/70 dark:text-[#F5E6D3] hover:text-[#B76E79] hover:scale-110 transition-transform"
                                >
                                  <Icons.Heart className="w-3.5 h-3.5" fill={wishlist.some(item => item.id === product.id) ? '#B76E79' : 'none'} />
                                </button>
                                
                                <img 
                                  src={product.image} 
                                  alt={product.name} 
                                  onError={handleImageError}
                                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-[1200ms]" 
                                />
                                
                                <div className="absolute inset-0 bg-[#120d0e]/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center space-x-2">
                                  <button onClick={() => setQuickViewProduct(product)} className="bg-white text-[#1A1A1A] p-3.5 rounded-full hover:bg-[#800020] hover:text-white hover:scale-110 transition-all shadow"><Icons.Eye className="w-4 h-4" /></button>
                                  <button onClick={() => handleAddToCart(product)} className="bg-[#120d0e] text-white p-3.5 rounded-full hover:bg-[#800020] hover:scale-110 transition-all shadow"><Icons.ShoppingBag className="w-4 h-4" /></button>
                                </div>
                              </div>

                              <div className="p-6 flex-grow flex flex-col justify-between">
                                <div className="space-y-1.5 text-left">
                                  <div className="flex items-center justify-between text-[9px] text-[#1A1A1A]/50 dark:text-[#F5E6D3]/50 uppercase font-bold tracking-[0.2em] font-sans">
                                    <span>{product.subCategory}</span>
                                    <div className="flex items-center space-x-0.5 text-[#B76E79]">
                                      <Icons.Star className="w-3 h-3" filled={true} />
                                      <span>{product.rating}</span>
                                    </div>
                                  </div>
                                  <h3 onClick={() => navigateToProductDetail(product)} className="font-serif font-bold text-sm tracking-widest hover:text-[#800020] transition-colors cursor-pointer line-clamp-1 text-[#1A1A1A] dark:text-white">{product.name}</h3>
                                </div>

                                <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#F5E6D3]/40 dark:border-[#B76E79]/10">
                                  <div className="flex items-center space-x-2 font-sans">
                                    {product.discountPrice ? (
                                      <>
                                        <span className="text-sm font-bold text-[#800020]">${product.discountPrice.toFixed(2)}</span>
                                        <span className="text-[10px] text-[#1A1A1A]/40 dark:text-[#F5E6D3]/40 line-through">${product.price.toFixed(2)}</span>
                                      </>
                                    ) : (
                                      <span className="text-sm font-bold text-[#1A1A1A] dark:text-white">${product.price.toFixed(2)}</span>
                                    )}
                                  </div>
                                  <button onClick={() => handleAddToCart(product)} className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#800020] hover:text-[#B76E79] font-sans">+ Reserve</button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              );

            case 'product-detail':
              return (
                <div className="animate-premium-fade max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
                  <button 
                    onClick={() => navigateToPage('shop')} 
                    className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#800020] hover:text-[#B76E79] transition-all mb-8 font-sans"
                  >
                    <Icons.ArrowLeft className="w-4 h-4" />
                    <span>Back to Catalogue</span>
                  </button>

                  {}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start text-left">
                    <div className="space-y-4">
                      <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#FAF5EF] shadow-xl border border-[#F5E6D3]">
                        <img 
                          src={selectedProduct.image} 
                          alt={selectedProduct.name} 
                          onError={handleImageError}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {selectedProduct.images.map((imgUrl, idx) => (
                          <div key={idx} className="aspect-square rounded-xl overflow-hidden bg-[#FAF5EF] cursor-pointer hover:border-2 hover:border-[#800020] transition-all">
                            <img src={imgUrl} alt={`${selectedProduct.name} view ${idx}`} onError={handleImageError} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6 lg:sticky lg:top-28 text-left">
                      <div className="space-y-3">
                        <span className="text-[#800020] font-bold tracking-[0.25em] text-[9px] uppercase bg-[#800020]/10 border border-[#800020]/20 px-4 py-2 rounded-full font-sans">{selectedProduct.badge || selectedProduct.category}</span>
                        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#1A1A1A] dark:text-white leading-tight tracking-wider">{selectedProduct.name}</h1>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center text-[#B76E79] space-x-0.5">
                            {[1, 2, 3, 4, 5].map((_, starIdx) => (
                              <Icons.Star key={starIdx} className="w-3.5 h-3.5" filled={starIdx < Math.floor(selectedProduct.rating)} />
                            ))}
                            <span className="text-xs font-bold text-[#1A1A1A] dark:text-[#F5E6D3] ml-1.5 font-sans">{selectedProduct.rating} / 5</span>
                          </div>
                          <span className="text-[10px] tracking-widest text-[#1A1A1A]/50 dark:text-[#F5E6D3]/50 font-sans">({selectedProduct.reviews} client reviews)</span>
                        </div>
                      </div>

                      <div className="p-5 bg-[#F5E6D3]/30 dark:bg-[#1C1617] rounded-2xl border border-[#F5E6D3] dark:border-[#B76E79]/15">
                        {selectedProduct.discountPrice ? (
                          <div className="flex items-baseline space-x-3 font-sans">
                            <span className="text-2xl font-black text-[#800020]">${selectedProduct.discountPrice.toFixed(2)}</span>
                            <span className="text-xs text-[#1A1A1A]/50 line-through">${selectedProduct.price.toFixed(2)}</span>
                            <span className="text-[9px] tracking-wider text-[#B76E79] font-bold bg-[#B76E79]/15 px-3 py-1 rounded-full">Save ${(selectedProduct.price - selectedProduct.discountPrice).toFixed(2)}</span>
                          </div>
                        ) : (
                          <span className="text-2xl font-black text-[#1A1A1A] dark:text-white font-sans">${selectedProduct.price.toFixed(2)}</span>
                        )}
                        <p className="text-[9px] text-[#1A1A1A]/60 dark:text-[#F5E6D3]/60 mt-1.5 uppercase tracking-wider font-sans">Tax and luxury privilege duty calculated at check-out.</p>
                      </div>

                      <p className="text-xs sm:text-sm text-[#1A1A1A]/80 dark:text-[#F5E6D3]/80 tracking-widest leading-relaxed font-light font-sans">
                        {selectedProduct.description}
                      </p>

                      {selectedProduct.colors && (
                        <div className="space-y-3">
                          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#1A1A1A]/70 dark:text-[#F5E6D3]/70 block font-sans">Maison Shade Selection</span>
                          <div className="flex space-x-3">
                            {selectedProduct.colors.map((color) => (
                              <button 
                                key={color}
                                className="px-5 py-2.5 bg-white dark:bg-[#1C1617] border border-[#F5E6D3] dark:border-[#B76E79]/15 rounded-xl text-[10px] tracking-widest text-[#1A1A1A] dark:text-white hover:border-[#800020] dark:hover:border-[#800020] transition-colors font-sans"
                              >
                                {color}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedProduct.sizes && (
                        <div className="space-y-3">
                          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#1A1A1A]/70 dark:text-[#F5E6D3]/70 block font-sans">Dimension Contour Fit</span>
                          <div className="flex flex-wrap gap-2">
                            {selectedProduct.sizes.map((size) => (
                              <button 
                                key={size}
                                className="w-11 h-11 flex items-center justify-center bg-white dark:bg-[#1C1617] border border-[#F5E6D3] dark:border-[#B76E79]/15 rounded-full hover:border-[#800020] hover:text-[#800020] font-bold text-xs text-[#1A1A1A] dark:text-white transition-colors font-sans"
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-[#F5E6D3] dark:border-[#B76E79]/15 font-sans">
                        <button 
                          onClick={() => handleAddToCart(selectedProduct)}
                          className="flex-1 bg-[#800020] hover:bg-[#B76E79] text-white font-bold uppercase tracking-[0.2em] text-[10px] py-4.5 rounded-full shadow-2xl flex items-center justify-center space-x-2"
                        >
                          <Icons.ShoppingBag className="w-4 h-4" />
                          <span>Reserve to Shopping Bag</span>
                        </button>
                        <button 
                          onClick={() => handleToggleWishlist(selectedProduct)}
                          className="border border-[#F5E6D3] dark:border-[#B76E79]/30 bg-white dark:bg-[#1C1617] hover:bg-[#FAF5EF] dark:hover:bg-[#120d0e]/60 text-[#1A1A1A] dark:text-white px-7 py-4.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center space-x-2"
                        >
                          <Icons.Heart className="w-4 h-4" filled={wishlist.some(item => item.id === selectedProduct.id)} />
                          <span>Wishlist</span>
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              );

            case 'wishlist':
              return (
                <div className="animate-premium-fade max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
                  <div className="text-center space-y-3 mb-16">
                    <span className="text-[#800020] font-bold tracking-[0.35em] text-[10px] uppercase font-sans">Your Design Collection</span>
                    <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-widest text-[#1A1A1A] dark:text-white">The Luxury Wishlist</h1>
                    <p className="text-[#1A1A1A]/70 dark:text-[#F5E6D3]/70 text-xs tracking-widest font-light font-sans">Review elegant items you have set aside for elite consideration.</p>
                  </div>

                  {}
                  {wishlist.length === 0 ? (
                    <div className="bg-white dark:bg-[#1C1617] border border-dashed border-[#F5E6D3] dark:border-[#B76E79]/20 rounded-3xl p-16 text-center space-y-4 shadow-sm">
                      <span className="text-4xl">🕊️</span>
                      <h3 className="text-lg font-serif font-bold tracking-widest text-[#1A1A1A] dark:text-white">Your Wishlist Canvas is Clear</h3>
                      <p className="text-[#1A1A1A]/60 dark:text-[#F5E6D3]/60 text-xs tracking-widest font-light max-w-sm mx-auto font-sans">Take time to browse modern evening gowns, luxury cosmetics, and sleek shoes.</p>
                      <button 
                        onClick={() => navigateToPage('shop')}
                        className="bg-[#800020] text-white px-8 py-3.5 rounded-full text-[9px] font-bold uppercase tracking-[0.25em] font-sans shadow-md"
                      >
                        Explore Catalogue
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                      {wishlist.map((item) => (
                        <div key={item.id} className="group bg-white dark:bg-[#1C1617] border border-[#F5E6D3] dark:border-[#B76E79]/15 rounded-2xl overflow-hidden relative flex flex-col h-full shadow-md">
                          <button 
                            onClick={() => handleToggleWishlist(item)}
                            className="absolute top-4 right-4 z-20 bg-white/90 dark:bg-[#120d0e]/90 p-2 rounded-full text-[#B76E79] shadow-md"
                          >
                            <Icons.X className="w-4 h-4" />
                          </button>
                          
                          <div className="relative aspect-[4/5] bg-[#FAF5EF] overflow-hidden">
                            <img src={item.image} alt={item.name} onError={handleImageError} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>

                          <div className="p-6 flex-grow flex flex-col justify-between space-y-4 text-left">
                            <div>
                              <span className="text-[9px] tracking-[0.2em] text-[#800020] font-bold uppercase block mb-1 font-sans">{item.category}</span>
                              <h3 onClick={() => navigateToProductDetail(item)} className="font-serif font-bold tracking-wide text-sm hover:text-[#800020] cursor-pointer line-clamp-1 text-[#1A1A1A] dark:text-white">{item.name}</h3>
                              <span className="text-xs font-bold block mt-1 font-sans text-[#1A1A1A] dark:text-white">${(item.discountPrice || item.price).toFixed(2)}</span>
                            </div>
                            <button 
                              onClick={() => { handleAddToCart(item); handleToggleWishlist(item); }}
                              className="w-full bg-[#800020] text-white text-[9px] font-bold uppercase tracking-[0.25em] py-3.5 rounded-full hover:bg-[#B76E79] transition-colors font-sans shadow"
                            >
                              Move To Bag
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );

            case 'checkout':
              return (
                <div className="animate-premium-fade max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* Checkout Credentials Forms details */}
                    <div className="lg:col-span-7 bg-white dark:bg-[#1C1617] border border-[#F5E6D3] dark:border-[#B76E79]/15 rounded-3xl p-6 sm:p-10 space-y-8 shadow-md">
                      <h2 className="text-xl font-serif font-bold text-[#1A1A1A] dark:text-white pb-4 border-b border-[#F5E6D3]/60 dark:border-[#B76E79]/10 tracking-wider text-left">1. Privileged Credentials</h2>
                      
                      <form onSubmit={handleCheckoutSubmit} className="space-y-6 text-left">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-sans">
                          <div>
                            <label className="block text-[9px] uppercase tracking-[0.2em] text-[#1A1A1A] dark:text-[#F5E6D3] font-bold mb-2">First Name *</label>
                            <input type="text" required className="w-full py-3.5 px-4 rounded-xl border border-[#F5E6D3] dark:border-[#B76E79]/20 bg-white dark:bg-[#120d0e] text-[#1A1A1A] dark:text-white text-xs tracking-widest focus:outline-none focus:border-[#B76E79]" />
                          </div>
                          <div>
                            <label className="block text-[9px] uppercase tracking-[0.2em] text-[#1A1A1A] dark:text-[#F5E6D3] font-bold mb-2">Last Name *</label>
                            <input type="text" required className="w-full py-3.5 px-4 rounded-xl border border-[#F5E6D3] dark:border-[#B76E79]/20 bg-white dark:bg-[#120d0e] text-[#1A1A1A] dark:text-white text-xs tracking-widest focus:outline-none focus:border-[#B76E79]" />
                          </div>
                        </div>

                        <div className="font-sans">
                          <label className="block text-[9px] uppercase tracking-[0.2em] text-[#1A1A1A] dark:text-[#F5E6D3] font-bold mb-2">Delivery Address *</label>
                          <input type="text" required className="w-full py-3.5 px-4 rounded-xl border border-[#F5E6D3] dark:border-[#B76E79]/20 bg-white dark:bg-[#120d0e] text-[#1A1A1A] dark:text-white text-xs tracking-widest focus:outline-none focus:border-[#B76E79]" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-sans">
                          <div>
                            <label className="block text-[9px] uppercase tracking-[0.2em] text-[#1A1A1A] dark:text-[#F5E6D3] font-bold mb-2">Town / City *</label>
                            <input type="text" required className="w-full py-3.5 px-4 rounded-xl border border-[#F5E6D3] dark:border-[#B76E79]/20 bg-white dark:bg-[#120d0e] text-[#1A1A1A] dark:text-white text-xs tracking-widest focus:outline-none focus:border-[#B76E79]" />
                          </div>
                          <div>
                            <label className="block text-[9px] uppercase tracking-[0.2em] text-[#1A1A1A] dark:text-[#F5E6D3] font-bold mb-2">Postal Zip *</label>
                            <input type="text" required className="w-full py-3.5 px-4 rounded-xl border border-[#F5E6D3] dark:border-[#B76E79]/20 bg-white dark:bg-[#120d0e] text-[#1A1A1A] dark:text-white text-xs tracking-widest focus:outline-none focus:border-[#B76E79]" />
                          </div>
                          <div>
                            <label className="block text-[9px] uppercase tracking-[0.2em] text-[#1A1A1A] dark:text-[#F5E6D3] font-bold mb-2">Country *</label>
                            <input type="text" required className="w-full py-3.5 px-4 rounded-xl border border-[#F5E6D3] dark:border-[#B76E79]/20 bg-white dark:bg-[#120d0e] text-[#1A1A1A] dark:text-white text-xs tracking-widest focus:outline-none focus:border-[#B76E79]" />
                          </div>
                        </div>

                        {}
                        <h2 className="text-xl font-serif font-bold text-[#1A1A1A] dark:text-white pt-6 pb-4 border-b border-[#F5E6D3]/60 dark:border-[#B76E79]/10 tracking-wider">2. Secure Settlement</h2>
                        
                        <div className="bg-[#F5E6D3]/20 dark:bg-[#120d0e] p-6 rounded-2xl border border-[#F5E6D3] dark:border-[#B76E79]/15 space-y-4 font-sans">
                          <label className="flex items-center space-x-3 cursor-pointer">
                            <input type="radio" name="payment" defaultChecked className="accent-[#800020] animate-pulse" />
                            <span className="text-xs uppercase tracking-[0.15em] font-bold text-[#1A1A1A] dark:text-[#F5E6D3]">Prestige Signature Credit Card</span>
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            <input type="text" placeholder="Cardholder Name" required className="w-full py-3 px-4 rounded-xl border border-[#F5E6D3] dark:border-[#B76E79]/20 bg-white dark:bg-[#120d0e] text-[#1A1A1A] dark:text-white text-xs tracking-widest focus:outline-none focus:border-[#B76E79]" />
                            <input type="text" placeholder="Card Number (XXXX-XXXX-XXXX)" required className="w-full py-3 px-4 rounded-xl border border-[#F5E6D3] dark:border-[#B76E79]/20 bg-white dark:bg-[#120d0e] text-[#1A1A1A] dark:text-white text-xs tracking-widest focus:outline-none focus:border-[#B76E79]" />
                          </div>
                        </div>

                        <button 
                          type="submit"
                          className="w-full bg-[#800020] hover:bg-[#B76E79] text-white font-bold uppercase tracking-[0.25em] py-4 rounded-full shadow-2xl text-[10px] font-sans"
                        >
                          Complete Secure Booking
                        </button>
                      </form>
                    </div>

                    <div className="lg:col-span-5 bg-white dark:bg-[#1C1617] border border-[#F5E6D3] dark:border-[#B76E79]/15 rounded-3xl p-6 sm:p-8 space-y-6 self-start lg:sticky lg:top-28 shadow-md">
                      <h3 className="text-lg font-serif font-bold pb-2 border-b border-[#F5E6D3]/60 dark:border-[#B76E79]/10 tracking-wider text-left text-[#1A1A1A] dark:text-white">Reservation Summary</h3>
                      
                      <div className="space-y-4 max-h-64 overflow-y-auto pr-2 text-left font-sans">
                        {cart.map((item, idx) => (
                          <div key={idx} className="flex items-center space-x-3 text-xs">
                            <img src={item.product.image} alt={item.product.name} onError={handleImageError} className="w-12 h-16 object-cover rounded" />
                            <div className="flex-grow">
                              <h4 className="font-bold tracking-wide line-clamp-1 text-[#1A1A1A] dark:text-white">{item.product.name}</h4>
                              <p className="text-[#1A1A1A]/60 dark:text-[#F5E6D3]/60 tracking-wider font-sans">Qty: {item.quantity} • {item.color}</p>
                            </div>
                            <span className="font-bold text-[#1A1A1A] dark:text-white">${((item.product.discountPrice || item.product.price) * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-[#F5E6D3]/60 dark:border-[#B76E79]/10 pt-4 space-y-2.5 text-xs text-left font-sans">
                        <div className="flex justify-between tracking-widest text-[#1A1A1A]/60 dark:text-[#F5E6D3]/60 font-medium">
                          <span>Maison Subtotal</span>
                          <span className="text-[#1A1A1A] dark:text-white">${cartSubtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between tracking-widest text-[#1A1A1A]/60 dark:text-[#F5E6D3]/60 font-medium">
                          <span>Privileged Carriage Fee</span>
                          <span className="text-[#800020] font-bold uppercase text-[9px]">Free</span>
                        </div>
                        <div className="flex justify-between text-base font-bold pt-3 border-t border-[#F5E6D3]/60 dark:border-[#B76E79]/10">
                          <span className="font-serif tracking-wider text-[#1A1A1A] dark:text-white">Final Total</span>
                          <span className="text-[#800020]">${cartSubtotal.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              );

            case 'login':
              return (
                <div className="animate-premium-fade max-w-md mx-auto mt-16 p-8 bg-white dark:bg-[#1C1617] rounded-3xl border border-[#F5E6D3] dark:border-[#B76E79]/15 shadow-2xl space-y-6">
                  
                  <div className="text-center space-y-1">
                    <span className="text-[#800020] font-bold tracking-[0.25em] text-[9px] uppercase font-sans">AURA PRIVILEGE LOUNGE</span>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-widest text-[#1A1A1A] dark:text-white">{isRegisterMode ? 'Create Account' : 'Maison Client Portal'}</h2>
                    <p className="text-[#1A1A1A]/60 dark:text-[#F5E6D3]/60 text-[10px] tracking-widest font-sans">Enter details to access private showcases.</p>
                  </div>

                  <form onSubmit={handleAuthSubmit} className="space-y-4 text-left font-sans">
                    <div>
                      <label className="block text-[9px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A] dark:text-[#F5E6D3] mb-2">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        className="w-full py-3.5 px-4 rounded-xl border border-[#F5E6D3] dark:border-[#B76E79]/20 bg-[#FAF5EF] dark:bg-[#120d0e] text-[#1A1A1A] dark:text-white text-xs tracking-widest focus:outline-none focus:border-[#B76E79]" 
                        placeholder="elegance@auramaison.com"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A] dark:text-[#F5E6D3] mb-2">Password</label>
                      <input 
                        type="password" 
                        required 
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        className="w-full py-3.5 px-4 rounded-xl border border-[#F5E6D3] dark:border-[#B76E79]/20 bg-[#FAF5EF] dark:bg-[#120d0e] text-[#1A1A1A] dark:text-white text-xs tracking-widest focus:outline-none focus:border-[#B76E79]" 
                        placeholder="••••••••••••"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-[#800020] hover:bg-[#B76E79] text-white text-[9px] font-bold uppercase tracking-[0.25em] py-4 rounded-full transition-all shadow"
                    >
                      {isRegisterMode ? 'Register' : 'Sign In'}
                    </button>
                  </form>

                  <div className="text-center pt-2 font-sans">
                    <button 
                      onClick={() => setIsRegisterMode(!isRegisterMode)}
                      className="text-[10px] text-[#B76E79] hover:underline tracking-widest font-medium"
                    >
                      {isRegisterMode ? 'patron? Sign In' : 'Request Membership'}
                    </button>
                  </div>
                </div>
              );

            case 'about':
              return (
                <div className="animate-premium-fade max-w-4xl mx-auto px-4 pt-12 space-y-12">
                  <div className="text-center space-y-3">
                    <span className="text-[#800020] font-bold tracking-[0.35em] text-[10px] uppercase font-sans">Heritage & Artisan Pride</span>
                    <h1 className="text-3xl font-serif font-bold tracking-widest text-[#1A1A1A] dark:text-white">Maison Aura Luxe</h1>
                    <p className="text-[#1A1A1A]/70 dark:text-[#F5E6D3]/70 text-xs tracking-widest font-light max-w-md mx-auto leading-relaxed font-sans">Dedicated toward ethical weaving, clean organic makeup, and architectural footwear.</p>
                  </div>

                  <div className="aspect-[21/9] rounded-3xl overflow-hidden bg-[#FAF5EF] shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1500&auto=format&fit=crop" onError={handleImageError} alt="Aura workshop studio" className="w-full h-full object-cover" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs tracking-widest leading-relaxed text-[#1A1A1A]/80 dark:text-[#F5E6D3]/80 font-light text-left font-sans">
                    <div className="space-y-4">
                      <h3 className="text-lg font-serif font-bold text-[#1A1A1A] dark:text-white tracking-widest">Our Sustainability Pledge</h3>
                      <p>
                        We operate entirely inside zero-waste guidelines. 100% of the energy consumed by our Italian silk weaving operations is derived from clean regional power grids.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-serif font-bold text-[#1A1A1A] dark:text-white tracking-widest">Bespoke Fitting Tradition</h3>
                      <p>
                        Every shoe utilizes dynamic micro-shock-absorption panels, safeguarding you against everyday walking strains while assuring an elegant poise.
                      </p>
                    </div>
                  </div>
                </div>
              );

            case 'contact':
              return (
                <div className="animate-premium-fade max-w-5xl mx-auto px-4 pt-12">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    
                    <div className="md:col-span-7 bg-white dark:bg-[#1C1617] p-8 rounded-3xl border border-[#F5E6D3] dark:border-[#B76E79]/15 space-y-6 shadow-sm text-left">
                      <h2 className="text-xl font-serif font-bold tracking-wider text-[#1A1A1A] dark:text-white">Patron Correspondence</h2>
                      <p className="text-[#1A1A1A]/50 dark:text-[#F5E6D3]/50 text-xs tracking-widest font-light font-sans">Expect responses within two business hours from an Aura concierge specialist.</p>
                      
                      <form onSubmit={(e) => { e.preventDefault(); showToast('Correspondence sent successfully.'); navigateToPage('home'); }} className="space-y-4 font-sans">
                        <div className="grid grid-cols-2 gap-4">
                          <input type="text" placeholder="Your Name" required className="w-full py-3.5 px-4 rounded-xl border border-[#F5E6D3] dark:border-[#B76E79]/20 bg-[#FAF5EF] dark:bg-[#120d0e] text-[#1A1A1A] dark:text-white text-xs tracking-widest focus:outline-none focus:border-[#B76E79]" />
                          <input type="email" placeholder="Your Email" required className="w-full py-3.5 px-4 rounded-xl border border-[#F5E6D3] dark:border-[#B76E79]/20 bg-[#FAF5EF] dark:bg-[#120d0e] text-[#1A1A1A] dark:text-white text-xs tracking-widest focus:outline-none focus:border-[#B76E79]" />
                        </div>
                        <input type="text" placeholder="Private Reservation Code (Optional)" className="w-full py-3.5 px-4 rounded-xl border border-[#F5E6D3] dark:border-[#B76E79]/20 bg-[#FAF5EF] dark:bg-[#120d0e] text-[#1A1A1A] dark:text-white text-xs tracking-widest focus:outline-none focus:border-[#B76E79]" />
                        <textarea placeholder="Write your luxury inquiry..." rows="4" required className="w-full py-3.5 px-4 rounded-xl border border-[#F5E6D3] dark:border-[#B76E79]/20 bg-[#FAF5EF] dark:bg-[#120d0e] text-[#1A1A1A] dark:text-white text-xs tracking-widest focus:outline-none focus:border-[#B76E79]" />
                        
                        <button type="submit" className="bg-[#800020] hover:bg-[#B76E79] text-white font-bold uppercase tracking-[0.25em] text-[9px] px-8 py-4 rounded-full shadow-2xl">Send Message</button>
                      </form>
                    </div>

                    <div className="md:col-span-5 space-y-6 text-left font-sans">
                      <div className="bg-white dark:bg-[#1C1617] p-6 rounded-2xl border border-[#F5E6D3] dark:border-[#B76E79]/15 space-y-2 shadow-sm">
                        <h4 className="font-serif font-bold text-[#800020] tracking-widest text-left">Parisian Showroom</h4>
                        <p className="text-[11px] tracking-widest text-[#1A1A1A]/60 dark:text-[#F5E6D3]/60 leading-relaxed font-light font-sans text-left">
                          Avenue des Champs-Élysées, 75008 Paris <br />
                          paris@auramaison.com <br />
                          +33 1 42 68 53 00
                        </p>
                      </div>
                      <div className="bg-white dark:bg-[#1C1617] p-6 rounded-2xl border border-[#F5E6D3] dark:border-[#B76E79]/15 space-y-2 shadow-sm">
                        <h4 className="font-serif font-bold text-[#800020] tracking-widest text-left">New York Salon</h4>
                        <p className="text-[11px] tracking-widest text-[#1A1A1A]/60 dark:text-[#F5E6D3]/60 leading-relaxed font-light font-sans text-left">
                          Fifth Avenue, Manhattan, NY 10019 <br />
                          ny@auramaison.com <br />
                          +1 212-407-3100
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              );

            default:
              return (
                <div className="text-center py-24 space-y-4">
                  <h1 className="text-3xl font-serif font-bold tracking-widest text-[#1A1A1A] dark:text-white">404 - Uncharted</h1>
                  <p className="text-[#1A1A1A]/50 dark:text-[#F5E6D3]/50 text-xs tracking-widest font-light font-sans">This coordinates target is currently inaccessible.</p>
                  <button onClick={() => navigateToPage('home')} className="bg-[#800020] text-white px-8 py-3.5 rounded-full text-[9px] font-bold uppercase tracking-[0.25em] font-sans shadow">Return to Home</button>
                </div>
              );
          }
        })()}
      </main>

      {}
      {isCartSidebarOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-premium-fade animate-reveal-up">
          <div 
            onClick={() => setIsCartSidebarOpen(false)} 
            className="absolute inset-0 bg-[#120d0e]/60 backdrop-blur-sm transition-all duration-300" 
          />
          
          <div className="relative w-full max-w-md bg-[#FAF5EF] dark:bg-[#120d0e] h-full shadow-2xl flex flex-col justify-between z-10 animate-reveal-up">
            
            <div className="p-6 border-b border-[#F5E6D3]/60 dark:border-[#B76E79]/10 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icons.ShoppingBag className="w-5 h-5 text-[#800020]" />
                <h3 className="font-serif font-bold text-base tracking-wider text-[#1A1A1A] dark:text-white">Shopping Bag</h3>
                <span className="text-[10px] bg-[#F5E6D3]/40 dark:bg-[#1C1617] px-3 py-1 rounded-full text-[#1A1A1A] dark:text-[#F5E6D3] font-bold font-sans">{cartTotalCount}</span>
              </div>
              <button onClick={() => setIsCartSidebarOpen(false)} className="p-2 hover:bg-[#F5E6D3]/40 dark:hover:bg-[#120d0e]/55 rounded-full transition-colors">
                <Icons.X className="w-5 h-5 text-[#1A1A1A] dark:text-white" />
              </button>
            </div>

            <div className="p-6 flex-grow overflow-y-auto space-y-6 text-left">
              {cart.length === 0 ? (
                <div className="text-center py-20 space-y-4">
                  <span className="text-4xl">👜</span>
                  <p className="text-[#1A1A1A]/60 dark:text-[#F5E6D3]/60 font-serif text-xs tracking-widest">Your luxury bag awaits elegant selections.</p>
                  <button 
                    onClick={() => { setIsCartSidebarOpen(false); navigateToPage('shop'); }} 
                    className="bg-[#800020] text-white text-[9px] tracking-[0.25em] font-bold uppercase px-7 py-3 rounded-full font-sans"
                  >
                    Explore Shop
                  </button>
                </div>
              ) : (
                cart.map((item, index) => {
                  const itemPrice = item.product.discountPrice || item.product.price;
                  return (
                    <div key={index} className="flex items-start space-x-4 pb-4 border-b border-[#F5E6D3]/60 dark:border-[#B76E79]/10 animate-reveal-up font-sans">
                      <div className="w-16 h-20 bg-[#FAF5EF] rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.product.image} alt={item.product.name} onError={handleImageError} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow space-y-1">
                        <h4 className="text-xs font-bold tracking-wide line-clamp-1 text-[#1A1A1A] dark:text-white font-serif">{item.product.name}</h4>
                        <p className="text-[9px] text-[#1A1A1A]/50 dark:text-[#F5E6D3]/50 tracking-wider">Shade: {item.color} / Fit: {item.size}</p>
                        
                        <div className="flex items-center space-x-2 pt-1">
                          <button onClick={() => updateCartQuantity(index, -1)} className="w-5 h-5 rounded-full bg-[#FAF5EF] dark:bg-[#1C1617] text-[#1A1A1A] dark:text-white flex items-center justify-center font-bold text-xs shadow-sm">-</button>
                          <span className="text-xs font-bold px-1 text-[#1A1A1A] dark:text-white">{item.quantity}</span>
                          <button onClick={() => updateCartQuantity(index, 1)} className="w-5 h-5 rounded-full bg-[#FAF5EF] dark:bg-[#1C1617] text-[#1A1A1A] dark:text-white flex items-center justify-center font-bold text-xs shadow-sm">+</button>
                        </div>
                      </div>

                      <div className="text-right space-y-2">
                        <span className="text-xs font-bold block text-[#1A1A1A] dark:text-white">${(itemPrice * item.quantity).toFixed(2)}</span>
                        <button onClick={() => handleRemoveFromCart(index)} className="text-[#1A1A1A]/40 hover:text-rose-500">
                          <Icons.Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 bg-[#F5E6D3]/30 dark:bg-[#120d0e]/80 border-t border-[#F5E6D3]/60 dark:border-[#B76E79]/10 space-y-4 text-left font-sans">
                <div className="flex justify-between text-[10px] tracking-widest text-[#1A1A1A]/60 dark:text-[#F5E6D3]/60 uppercase font-bold">
                  <span>Maison Carriage Shipping</span>
                  <span className="text-[#800020] font-bold">Complimentary</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-[#F5E6D3]/60 dark:border-[#B76E79]/10">
                  <span className="font-serif font-bold text-[#1A1A1A] dark:text-white tracking-widest">Estimated Subtotal</span>
                  <span className="text-lg font-black text-[#800020]">${cartSubtotal.toFixed(2)}</span>
                </div>
                
                <button 
                  onClick={() => { setIsCartSidebarOpen(false); navigateToPage('checkout'); }}
                  className="w-full bg-[#800020] hover:bg-[#B76E79] text-white text-[10px] font-bold uppercase tracking-[0.25em] py-4 rounded-full shadow-2xl transition-all"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setQuickViewProduct(null)} className="absolute inset-0 bg-[#120d0e]/65 backdrop-blur-sm" />
          
          <div className="relative w-full max-w-2xl bg-[#FAF5EF] dark:bg-[#120d0e] rounded-3xl overflow-hidden shadow-2xl z-10 grid grid-cols-1 md:grid-cols-2 animate-reveal-up">
            <button 
              onClick={() => setQuickViewProduct(null)} 
              className="absolute top-4 right-4 bg-white/90 dark:bg-[#120d0e]/90 p-2.5 rounded-full text-[#1A1A1A] dark:text-[#F5E6D3] z-20 shadow-md"
            >
              <Icons.X className="w-4 h-4" />
            </button>

            <div className="aspect-[4/5] bg-[#FAF5EF]">
              <img src={quickViewProduct.image} alt={quickViewProduct.name} onError={handleImageError} className="w-full h-full object-cover" />
            </div>

            <div className="p-7 flex flex-col justify-between space-y-4 text-left">
              <div className="space-y-3">
                <span className="text-[#800020] font-bold tracking-[0.25em] text-[9px] uppercase font-sans">{quickViewProduct.badge || quickViewProduct.category}</span>
                <h3 className="font-serif font-bold text-lg tracking-wider line-clamp-2 text-[#1A1A1A] dark:text-white">{quickViewProduct.name}</h3>
                <p className="text-xs text-[#1A1A1A]/60 dark:text-[#F5E6D3]/60 tracking-widest leading-relaxed font-light line-clamp-4 font-sans">{quickViewProduct.description}</p>
              </div>

              <div className="space-y-4">
                <div className="text-xl font-black text-[#800020] font-sans">
                  ${(quickViewProduct.discountPrice || quickViewProduct.price).toFixed(2)}
                </div>
                <button 
                  onClick={() => { handleAddToCart(quickViewProduct); setQuickViewProduct(null); }}
                  className="w-full bg-[#800020] hover:bg-[#B76E79] text-white text-[9px] font-bold uppercase tracking-[0.25em] py-3.5 rounded-full transition-colors font-sans shadow"
                >
                  Reserve Ensembles
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile navigation overlays */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div onClick={() => setMobileMenuOpen(false)} className="absolute inset-0 bg-[#120d0e]/50 backdrop-blur-sm animate-premium-fade" />
          <div className="relative w-72 bg-[#FAF5EF] dark:bg-[#120d0e] h-full p-6 space-y-8 flex flex-col justify-between z-10 animate-reveal-up text-left">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#F5E6D3]/60 pb-4">
                <span className="font-serif font-black text-lg text-[#800020] tracking-widest">AURA LUXE</span>
                <button onClick={() => setMobileMenuOpen(false)} className="text-[#1A1A1A] dark:text-white"><Icons.X className="w-5 h-5" /></button>
              </div>
              <nav className="flex flex-col space-y-4 text-[10px] font-bold uppercase tracking-[0.25em]">
                <button onClick={() => { navigateToPage('home'); setMobileMenuOpen(false); }} className="text-left py-2 border-b border-[#F5E6D3]/40 text-[#1A1A1A] dark:text-white">Home</button>
                <button onClick={() => { navigateToPage('shop'); setMobileMenuOpen(false); }} className="text-left py-2 border-b border-[#F5E6D3]/40 text-[#1A1A1A] dark:text-white">Shop Catalogue</button>
                <button onClick={() => { navigateToPage('about'); setMobileMenuOpen(false); }} className="text-left py-2 border-b border-[#F5E6D3]/40 text-[#1A1A1A] dark:text-white">Maison Aura</button>
                <button onClick={() => { navigateToPage('contact'); setMobileMenuOpen(false); }} className="text-left py-2 border-b border-[#F5E6D3]/40 text-[#1A1A1A] dark:text-white">Correspondence</button>
              </nav>
            </div>
            
            <div className="pt-4 border-t border-[#F5E6D3]/40 space-y-2">
              <p className="text-[8px] text-[#FAF5EF]/60 uppercase tracking-[0.25em] text-center font-bold font-sans">VIP MEMBERS LOUNGE</p>
              <button 
                onClick={() => { navigateToPage('login'); setMobileMenuOpen(false); }}
                className="w-full bg-[#800020] text-white text-center py-3.5 rounded-full text-[9px] font-bold uppercase tracking-[0.25em] font-sans"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}

      {}
      <footer className="bg-[#120d0e] text-[#FAF5EF]/70 pt-20 pb-8 border-t border-[#B76E79]/20 text-left font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-extrabold tracking-[0.3em] text-white">AURA LUXE</h3>
            <p className="text-[#FAF5EF]/60 text-xs tracking-widest leading-relaxed font-light font-sans">
              Crafting premium luxury garments, certified botanical skincare, and state of art contemporary footwear. Established with love.
            </p>
            <span className="text-[8px] text-[#B76E79] tracking-[0.4em] uppercase font-bold block">Paris • London • Milan • Tokyo</span>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase text-white tracking-[0.3em] pb-1.5 border-b border-white/10 font-serif">Bespoke</h4>
            <ul className="space-y-2.5 text-xs text-[#FAF5EF]/60 tracking-wider">
              <li><button onClick={() => navigateToPage('shop')} className="hover:text-[#B76E79] transition-colors">Bespoke Collection</button></li>
              <li><button onClick={() => navigateToPage('about')} className="hover:text-[#B76E79] transition-colors">Our Weaving Heritage</button></li>
              <li><button onClick={() => navigateToPage('contact')} className="hover:text-[#B76E79] transition-colors">Global Showrooms</button></li>
              <li><button onClick={() => navigateToPage('login')} className="hover:text-[#B76E79] transition-colors">VIP Access Portal</button></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase text-white tracking-[0.3em] pb-1.5 border-b border-white/10 font-serif">Concierge Care</h4>
            <ul className="space-y-2.5 text-xs text-[#FAF5EF]/60 tracking-wider">
              <li><a href="#" className="hover:text-[#B76E79] transition-colors">Reserve Fitting Session</a></li>
              <li><a href="#" className="hover:text-[#B76E79] transition-colors">Return Courier Booking</a></li>
              <li><a href="#" className="hover:text-[#B76E79] transition-colors">Scented Packing Requests</a></li>
              <li><a href="#" className="hover:text-[#B76E79] transition-colors">Privilege Rewards Card</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase text-white tracking-[0.3em] pb-1.5 border-b border-white/10 font-serif">Maison Dispatch</h4>
            <p className="text-[#FAF5EF]/60 text-xs tracking-widest font-light leading-relaxed font-sans">Join Club Aura to receive direct lookbook dispatches.</p>
            <form onSubmit={(e) => { e.preventDefault(); showToast('Subscribed successfully.'); }} className="flex">
              <input 
                type="email" 
                required 
                placeholder="Enter email..." 
                className="bg-white/5 border border-white/10 text-xs py-2 px-4 rounded-l-xl text-white focus:outline-none focus:border-[#B76E79] flex-grow tracking-widest font-sans" 
              />
              <button type="submit" className="bg-[#800020] hover:bg-[#B76E79] text-white font-bold px-4 py-2 rounded-r-xl text-[9px] uppercase tracking-widest transition-colors font-sans animate-elegant-pulse">Join</button>
            </form>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10 pt-8 text-center text-[10px] tracking-widest text-[#FAF5EF]/40 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p>© 2026 Aura Luxe Inc. All designs hand-sketched in France. Privacy preserved.</p>
          <div className="space-x-4">
            <a href="#" className="hover:underline">Legal Terms</a>
            <span>•</span>
            <a href="#" className="hover:underline">Carriage Policy</a>
          </div>
        </div>
      </footer>

    </div>
  );
}