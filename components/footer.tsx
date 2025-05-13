import Image from "next/image";

export default function Footer() {
    return (
        // Footer 
        < footer className="bg-gray-900 text-white py-16" >
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="flex flex-col items-center">
                        <Image src="/logo-white.png" alt="NammaTour Logo" width={200} height={50} />
                        <p className="mt-4 text-gray-400">
                            Your trusted partner for memorable Wayanad experiences
                        </p>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="/packages" className="text-gray-400 hover:text-white">Packages</a></li>
                            <li><a href="/rooms" className="text-gray-400 hover:text-white">Rooms</a></li>
                            <li><a href="/cabs" className="text-gray-400 hover:text-white">Cabs</a></li>
                            <li><a href="/blog" className="text-gray-400 hover:text-white">Blog</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold mb-4">Contact</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>Phone: +91 1234567890</li>
                            <li>Email: info@nammatour.com</li>
                            <li>Address: Wayanad, Kerala, India</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            {/* Social Media Icons */}
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} NammaTour. All rights reserved.</p>
                </div>
            </div>
        </footer >
    );
}