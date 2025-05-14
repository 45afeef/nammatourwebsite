import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        // Footer 
        < footer className="bg-green-950 text-white py-16" >
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    <div className="flex flex-col items-center">
                        <Link href="/">
                            <Image src="/logo-white.png" alt="NammaTour Logo" width={200} height={50} />
                        </Link>
                        <p className="mt-4 text-gray-400 text-center">
                            Your trusted partner for memorable Wayanad experiences
                        </p>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold mb-4">Services</h4>
                        <ul className="space-y-2">
                            <li><Link href="/packages" className="text-gray-400 hover:text-white">Tour Packages</Link></li>
                            <li><Link href="/rooms" className="text-gray-400 hover:text-white">Rooms & Stays</Link></li>
                            <li><Link href="/cabs" className="text-gray-400 hover:text-white">Cabs & Transport</Link></li>
                            <li><Link href="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xl font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
                            <li><Link href="/about" className="text-gray-400 hover:text-white">About</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                            <li><Link href="/refund-policy" className="text-gray-400 hover:text-white">Refund Policy</Link></li>
                            <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
                            <li><Link href="/cancellation-policy" className="text-gray-400 hover:text-white">Cancellation Policy</Link></li>

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
                <div className="border-t border-gray-500 mt-12 pt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} NammaTour. All rights reserved.</p>
                </div>
            </div>
        </footer >
    );
}