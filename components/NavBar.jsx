import { Menu } from "lucide-react";
import Image from "next/image";
import React from "react";
import Buttons from "./Buttons";
import { Button } from "./ui/button";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
];

const NavBar = () => {
  return (
    <section className="py-4 lg:py-8 text-white/80">
      <div className="container max-w-5xl">
        <div
          className="grid-cols-2 grid lg:grid-cols-3  borderColour
            px-4 py-1 rounded-full items-center
            md:pr-2"
        >
          <div className="">
            <Image
              src="/logo.svg"
              width={20}
              height={20}
              alt="logo"
              className="h-9 w-auto md:h-auto "
            />
          </div>
          <div className=" justify-center items-center hidden lg:flex">
            <nav className="flex gap-6 font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-inherit no-underline mr-4"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex justify-end gap-4">
            <Menu className="cursor-pointer block md:hidden" />
            <Button
              className="text-white/80 border border-white rounded-full hidden md:inline-flex"
              variant="tertiary"
            >
              Sign Up
            </Button>
            <Button className='hidden md:inline-flex' variant="secondary">Dashboard</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NavBar;
