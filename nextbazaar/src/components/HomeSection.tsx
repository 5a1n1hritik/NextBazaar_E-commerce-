'use client';

import HomeHeaderSlider from "./HomeHeaderSlider";
import ProductList from "./ProductList";

const HomeSection = () => {
  return (
    <>
      <HomeHeaderSlider />
      <div className="container mx-auto">
        <ProductList />
      </div>
    </>
  );
};

export default HomeSection;
