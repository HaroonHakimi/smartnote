import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Pointer from "./Pointer";
const Hero = () => {
  return (
    <section className="text-white/80 py-24 overflow-x-clip">
      <div className="container relative">
        <div className="absolute -left-32 top-16">
          <Image
            alt="Workspace Image"
            src="/pic1.png"
            width={250}
            height={250}
          />
        </div>
        <div className="absolute -right-56 -top-16">
          <Image alt="Upgrade Image" width={300} height={300} src="/pic2.png" />
        </div>
        <div className="absolute top-0 left-0">
          <Pointer/>
        </div>
        <div className="flex flex-col items-center">
          <div
            className="inline-flex py-1 px-3 bg-gradient-to-r from-green-400 to-yellow-400
        rounded-full text-neutral-950 font-semibold"
          >
            Contact to fund
          </div>

          <h1 className="text-6xl lg:text-8xl md:text-7xl font-medium text-center mt-6 tracking-tighter">
            ✨Impactful notes, created effortlessly
          </h1>
          <p className="text-center text-xl text-white/50 mt-8 max-w-2xl">
            Note apps shouldn't slow you down. SmartNote combines powerful AI
            with simple note-taking that keeps you in your creative flow
          </p>
          <form
            className="flex justify-between borderColour rounded-full p-2 mt-8 max-w-lg"
            action=""
          >
            <input
              className="bg-transparent px-4 md:flex-1"
              type="email"
              placeholder="Enter your email"
            />
            <Button className="h-10" type="submit" variant="secondary">
              Sign up
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
