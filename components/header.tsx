"use client";

import Image from "next/image";
import { useState } from "react";

export default function Header() {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


    const openMobileMenu = () => {
        setMobileMenuOpen(true);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <>
            {/* Header */}
            <header className="sticky top-0 bg-opacity-90 md:bg-white/80 bg-green-800/10  backdrop-blur-xs shadow-lg z-50">
                <nav className="w-full  px-4 py-6">
                    <div className="container mx-auto flex justify-between items-center">
                        <div className="logo ml-10">
                            <>
                                <div className="md:hidden">
                                    <Image src="/logo-white.png" alt="NammaTour Logo" width={75} height={75} />
                                </div>
                                <div className="hidden md:block">
                                    <Image src="/logo-white.png" alt="NammaTour Logo" width={100} height={100} />
                                </div>
                            </>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex space-x-8">
                            <NavigationLinks />
                        </div>


                        <button className="md:hidden text-black" onClick={openMobileMenu}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </nav>
            </header>

            {/* Mobile Navigation */}


            <div className={`fixed inset-0 z-50 flex transform transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
                {/* Black Overlay */}
                <div
                    className="fixed inset-0 bg-black"
                    onClick={closeMobileMenu}
                ></div>
                <div className="relative ml-auto w-64 h-full bg-white shadow-lg">
                    <button
                        onClick={closeMobileMenu}
                        className="absolute top-4 right-4 text-2xl text-black"
                    >
                        &times;
                    </button>
                    <nav className="mt-16 flex flex-col space-y-4 pl-4">
                        <NavigationLinks />
                    </nav>
                </div>
            </div>


        </>
    );

}

function NavigationLinks() {
    return (
        <>
            <a href="/" className="text-black hover:text-gray-200">Home</a>
            <a href="/packages" className="text-black hover:text-gray-200">Packages</a>
            <a href="/rooms" className="text-black hover:text-gray-200">Rooms</a>
            <a href="/cabs" className="text-black hover:text-gray-200">Cabs</a>
            <a href="/blog" className="text-black hover:text-gray-200">Blog</a>
            <a href="/contact" className="text-black hover:text-gray-200">Contact</a>
        </>
    );

}