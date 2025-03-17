"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import HomeHeaderSlider from "./HomeHeaderSlider";
import ProductList from "./ProductList";
import assets from "@/assets";
import CategoryList from "./CategoryList";
import FeaturedProductsList from "./FeaturedProductsList";

const HomeSection = () => {

  return (
    <>
      <div className="flex flex-col container mx-auto gap-10 py-8">
        <HomeHeaderSlider />

        <section className="px-4 md:px-6">
        <div className="relative overflow-hidden rounded-lg">
          <div className="bg-muted/10 relative flex flex-col items-start gap-4 p-8 md:p-12 lg:py-24">
            <div className="grid gap-2 max-w-md">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Summer Collection 2025</h1>
              <p className="text-muted-foreground md:text-lg">
                Discover our latest arrivals with up to 40% off on selected items.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 min-[400px]:gap-4">
              <Link href="/shop">
                <Button size="lg">Shop Now</Button>
              </Link>
              <Link href="/categories">
                <Button size="lg" variant="outline">
                  Browse Categories
                </Button>
              </Link>
            </div>
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-background/10 via-background/10 to-background/10" />
          <Image
            src="https://static.vecteezy.com/system/resources/previews/024/286/756/non_2x/podium-summer-display-pile-of-sand-coconut-tree-beach-umbrella-beach-chair-beach-ball-flowers-banner-design-on-cloud-and-sand-beach-background-eps-10-illustration-vector.jpg"
            alt="Hero background"
            fill
            className="object-cover -z-20"
            priority
          />
        </div>
      </section>

        <CategoryList />

        <ProductList />

        <FeaturedProductsList />

        <section className="container px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="relative overflow-hidden rounded-lg">
              <div className="bg-muted/50 relative flex flex-col items-start gap-2 p-6">
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold dark:text-white">
                    New Arrivals
                  </h3>
                  <p className="text-sm text-muted-foreground dark:text-gray-300">
                    Check out our latest collection
                  </p>
                </div>
                <Link href="/shop?sort=newest">
                  <Button size="sm" className="text-white ">
                    Shop Now
                  </Button>
                </Link>
              </div>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background/80 to-background/30" />
              <Image
                src="https://img.freepik.com/free-vector/flat-abstract-sale-banner_23-2149447128.jpg"
                alt="New arrivals"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover -z-20"
              />
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <div className="bg-muted/50 relative flex flex-col items-start gap-2 p-6">
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold dark:text-white">
                    Special Offers
                  </h3>
                  <p className="text-sm text-muted-foreground dark:text-gray-300">
                    Up to 40% off on selected items
                  </p>
                </div>
                <Link href="/shop?discount=true">
                  <Button size="sm" className="text-white">
                    View Offers
                  </Button>
                </Link>
              </div>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background/80 to-background/30" />
              <Image
                src="https://graphicsfamily.com/wp-content/uploads/edd/2022/12/E-commerce-Facebook-Cover-Design-Template-scaled.jpg"
                alt="Special offers"
                fill
                className="object-cover -z-20"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        <div className="flex flex-col md:flex-row items-center justify-between md:pl-20 py-14 md:py-0 bg-[#E6E9F2] dark:bg-gray-800 dark:text-gray-100 my-16 rounded-xl overflow-hidden">
          <Image
            className="max-w-56"
            src={assets.images.jbl_soundbox_images}
            alt="jbl_soundbox_image"
          />
          <div className="flex flex-col items-center justify-center text-center space-y-2 px-4 md:px-0">
            <h2 className="text-2xl md:text-3xl font-semibold max-w-[290px]">
              Level Up Your Gaming Experience
            </h2>
            <p className="max-w-[343px] font-medium text-gray-800/60 dark:text-gray-400">
              From immersive sound to precise controls—everything you need to
              win
            </p>
            <button className="group flex items-center justify-center gap-1 px-12 py-2.5 bg-orange-600 rounded text-white">
              Buy now
              <Image
                className="group-hover:translate-x-1 transition"
                src={assets.icons.arrow_icon_white}
                alt="arrow_icon_white"
              />
            </button>
          </div>
          <Image
            src={assets.images.md_controller_image}
            alt="md_controller_image"
            className="hidden md:block max-w-80"
            priority
          />
          <Image
            src={assets.images.sm_controller_image}
            alt="sm_controller_image"
            className="md:hidden"
            priority
          />
        </div>
      </div>
    </>
  );
};

export default HomeSection;
