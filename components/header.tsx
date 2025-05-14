"use client";

import Image from "next/image";
import Link from "next/link";
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
            <header className="fixed top-0 left-0 right-0 bg-opacity-90 md:bg-white/80 md:text-black bg-green-800/10 backdrop-blur-xs shadow-lg z-50">
                <nav className="w-full  px-4 py-6">
                    <div className="container mx-auto flex justify-between items-center">
                        <div className="logo ml-10">
                            <Link href="/">
                                <div className="md:hidden">
                                    <Image src="/logo-white.png" alt="NammaTour Logo" width={75} height={75} />
                                </div>
                                <div className="hidden md:block">
                                    <Image src="/logo-white.png" alt="NammaTour Logo" width={100} height={100} />
                                </div>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex space-x-8">
                            <NavigationLinks />
                        </div>


                        <button className="md:hidden" onClick={openMobileMenu}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </nav>
            </header>

            {/* Mobile Navigation */}


            {/* Black Overlay */}
            {mobileMenuOpen &&
                <div className="fixed inset-0 z-50 bg-foreground/50 duration-700 opacity-50" />
            }
            <div
                className={`fixed inset-0 z-50 flex transition duration-700 ease-in-out ${mobileMenuOpen ? "translate-x-0" :
                    "translate-x-full"}`}
                onClick={closeMobileMenu}

            >
                <div className="relative ml-auto w-64 h-full bg-background text-foreground hover:text-gray-200 shadow-lg">
                    <button
                        onClick={closeMobileMenu}
                        className="absolute top-4 right-4 text-2xl"
                    >
                        &times;
                    </button>
                    <nav className="mt-16 flex flex-col space-y-4 pl-4 ">
                        <NavigationLinks onclick={closeMobileMenu} />
                    </nav>
                </div>
            </div>


        </>
    );

}
interface NavigationLinksProps {
    onclick?: () => void;
}

function NavigationLinks({ onclick }: NavigationLinksProps) {
    return (
        <>
            <Link href="/" onClick={onclick} >Home</Link>
            <Link href="/packages" onClick={onclick} >Packages</Link>
            <Link href="/rooms" onClick={onclick} >Rooms</Link>
            <Link href="/cabs" onClick={onclick} >Cabs</Link>
            <Link href="/blog" onClick={onclick} >Blog</Link>
            <Link href="/contact" onClick={onclick} >Contact</Link>
        </>
    );
}