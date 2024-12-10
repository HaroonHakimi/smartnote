import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const footerLinks = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Upgrade", href: "/dashboard/upgrade" },
  ];
  return (
    <section className=" py-16 text-white/50">
      <div className="container ">
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-6">
          <div>
            <Image
              src="/logo.svg"
              alt="SmartNote Logo"
              width={50}
              height={50}
            />
          </div>
          <div>
            <footer className="flex gap-6">
              {footerLinks.map((link, index) => (
                <Link 
                key={index}
                className="text-inherit no-underline text-sm " 
                href={link.href}>
                  {link.label}
                </Link>
              ))}
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
