"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold">
              <span className="text-primary">NextB</span>azaar
            </h3>
            <p className="text-sm mt-2">
              Your one-stop shop for the best deals and trends.
            </p>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold">Accout</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/profile" className="hover:text-white">
                  My Accout
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white">
                  Login / Register
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold">Quick Link</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/shipping" className="hover:text-white">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold">
              Subscribe to our Newsletter
            </h3>
            <p className="text-sm mt-2">
              Get updates on the latest deals and offers.
            </p>
            <p className="text-sm mt-2">Get 10% off your first order</p>
            <form className="mt-4 flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 rounded-l-md border border-gray-600 bg-gray-800 text-white focus:outline-none"
              />
              <button
                type="submit"
                className="bg-primary px-4 rounded-r-md text-white hover:bg-primary/80"
              >
                <Mail className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between border-t border-gray-700 pt-6">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} NextBazaar. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link href="https://facebook.com" className="hover:text-white">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="https://instagram.com" className="hover:text-white">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="https://twitter.com" className="hover:text-white">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="https://youtube.com" className="hover:text-white">
              <Youtube className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
