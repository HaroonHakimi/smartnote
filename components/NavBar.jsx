"use client";
import { Menu } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Upgrade", href: "/dashboard/upgrade" },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
    <section className="py-4 lg:py-8 text-white/50 fixed w-full top-0 z-10 ">
      <div className="container max-w-5xl">
        <div className="borderColour rounded-[27px] bg-neutral-950/70 backdrop-blur">
          <div
            className="grid-cols-2 grid lg:grid-cols-3  
            px-4 py-1  items-center
            md:pr-2 "
          >
            <div className="flex cursor-pointer gap-2 items-center">
              <Image
                src="/logo.svg"
                width={10}
                height={10}
                alt="logo"
                className="h-9 w-auto md:h-auto "
              />
              <span className="hover:text-white/80 tracking-tighter  text-white/50">
                SmartNote
              </span>
            </div>
            <div className=" justify-center items-center hidden lg:flex">
              <nav className="flex gap-6 font-medium">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-inherit  no-underline mr-4"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex justify-end gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather text-white feather-menu cursor-pointer md:hidden"
                onClick={() => setIsOpen(!isOpen)}
              >
                <line
                  x1="3"
                  y1="6"
                  x2="21"
                  y2="6"
                  className={twMerge(
                    "origin-left transition",
                    isOpen && "rotate-45 -translate-y-1"
                  )}
                ></line>
                <line
                  x1="3"
                  y1="12"
                  x2="21"
                  y2="12"
                  className={twMerge("transition", isOpen && "opacity-0")}
                ></line>
                <line
                  x1="3"
                  y1="18"
                  x2="21"
                  y2="18"
                  className={twMerge(
                    "origin-left transition",
                    isOpen && "-rotate-45 translate-y-1"
                  )}
                ></line>
              </svg>
              <Button
                className="text-white/80 border border-white rounded-full hidden md:inline-flex"
                variant="tertiary"
              >
                Sign Up
              </Button>
              <Button className="hidden md:inline-flex" variant="secondary">
                Dashboard
              </Button>
            </div>
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="overflow-hidden"
              >
                <div className="flex flex-col items-center gap-4 py-4 ">
                  {navLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="text-inherit no-underline"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Button
                    className="text-white/80 border border-white rounded-full"
                    variant="tertiary"
                  >
                    Login
                  </Button>
                  <Button variant="secondary">Dashboard</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
    <div className="pb-[86px] md:pb-[98px] lg:pb-[130px] ">

    </div>
    </>
  );
};

export default NavBar;
