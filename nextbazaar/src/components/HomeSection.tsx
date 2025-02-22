'use client';

import HomeHeaderSlider from "./HomeHeaderSlider";
import ProductList from "./ProductList";
import AdminNavbar from "./saller/AdminNavbar";
import AdminSidebar from "./saller/AdminSidebar";

const HomeSection = () => {
  return (
    <>
      <HomeHeaderSlider />
      {/* <AdminNavbar />
      < AdminSidebar /> */}
      <div className="container mx-auto">
        <ProductList />
      </div>
    </>
  );
};

export default HomeSection;
