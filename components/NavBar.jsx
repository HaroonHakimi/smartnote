import { Menu } from "lucide-react";
import Image from "next/image";
import React from "react";
import Buttons from "./Buttons";
import { Button } from "./ui/button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
];

const NavBar = () => {
  return (
    <section className="py-4">
      <div className="container ">
        <div
          className="grid-cols-2 grid border border-red-500 px-4 rounded-full items-center
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
          <div className="flex justify-end gap-4">
              <Menu className="cursor-pointer block md:hidden" />
              <Button className="text-white border border-white rounded-full" variant='tertiary'>Sign Up</Button>
              <Button variant="secondary">Dashboard</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NavBar;
