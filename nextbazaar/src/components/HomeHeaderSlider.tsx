"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import assets from "@/assets";

const HomeHeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: "Revolutionary Performance – iPhone 16 Pro is Here!",
      offer: "Pre-Order Now & Get Exciting Discounts!",
      buttonText1: "Pre-Order",
      buttonText2: "Discover More",
      imgSrc: assets.images.iphone16_image,
    },
    {
      id: 2,
      title: "Unleash Performance – Samsung Galaxy S23 Ultra is Here!",
      offer: "Special Discount: 20% Off!",
      buttonText1: "Order Now",
      buttonText2: "See Features",
      imgSrc: assets.images.samsung_S23_ultra_image,
    },
    {
      id: 3,
      title: "The Future of Fitness – Get the Apple Watch Series 9!",
      offer: "Stay Healthy: Flat 15% Off!",
      buttonText1: "Buy Now",
      buttonText2: "Learn More",
      imgSrc: assets.images.applewatch_image,
    },
    {
      id: 4,
      title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      offer: "Limited Time Offer 30% Off",
      buttonText1: "Buy now",
      buttonText2: "Find more",
      imgSrc: assets.images.header_headphone_image,
    },
    {
      id: 5,
      title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
      offer: "Hurry up only few lefts!",
      buttonText1: "Shop Now",
      buttonText2: "Explore Deals",
      imgSrc: assets.images.header_playstation_image,
    },
    {
      id: 6,
      title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
      offer: "Exclusive Deal 40% Off",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc: assets.images.header_macbook_image,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="overflow-hidden relative w-full">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between bg-[#E6E9F2] dark:bg-gray-800 dark:text-gray-100 py-8 md:px-14 px-5 mt-6 rounded-xl min-w-full"
          >
            <div className="md:pl-8 mt-10 md:mt-0">
              <p className="md:text-base text-orange-600 dark:text-orange-400 pb-1">
                {slide.offer}
              </p>
              <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-2xl font-semibold">
                {slide.title}
              </h1>
              <div className="flex items-center mt-4 md:mt-6 ">
                <button className="md:px-10 px-7 md:py-2.5 py-2 bg-orange-600 dark:bg-orange-500 rounded-full text-white font-medium">
                  {slide.buttonText1}
                </button>
                <button className="group flex items-center gap-2 px-6 py-2.5 font-medium dark:text-gray-300">
                  {slide.buttonText2}
                  <Image
                    className="group-hover:translate-x-1 transition dark:invert"
                    src={assets.icons.arrow_icon}
                    alt="arrow_icon"
                  />
                </button>
              </div>
            </div>
            <div className="flex items-center flex-1 justify-center">
              <Image
                className="md:w-72 w-48"
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-8">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              currentSlide === index
                ? "bg-orange-600 dark:bg-orange-500"
                : "bg-gray-500/30 dark:bg-gray-700"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HomeHeaderSlider;
