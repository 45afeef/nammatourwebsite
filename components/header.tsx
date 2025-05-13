import Image from "next/image";
export default function Header() {
    return (
        <header>
            <nav className="absolute top-0 left-0 w-full z-50 px-4 py-6">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="logo">
                        <Image src="/logo.png" alt="NammaTour Logo" width={150} height={50} />
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8">
                        <a href="/" className="text-white hover:text-gray-200">Home</a>
                        <a href="/packages" className="text-white hover:text-gray-200">Packages</a>
                        <a href="/rooms" className="text-white hover:text-gray-200">Rooms</a>
                        <a href="/cabs" className="text-white hover:text-gray-200">Cabs</a>
                        <a href="/blog" className="text-white hover:text-gray-200">Blog</a>
                        <a href="/contact" className="text-white hover:text-gray-200">Contact</a>
                    </div>

                    {/* Mobile Navigation */}
                    <button className="md:hidden text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </nav>

        </header>
    );

}