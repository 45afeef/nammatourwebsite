import { FaPhone, FaWhatsapp, FaEnvelope, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function EnquiryForm() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Details */}
                    <div className="max-w-2xl mx-auto shadow-foreground/50 shadow-lg rounded-lg p-8 bg-foreground text-background">
                        <p className="text-sm mb-4 text-center">Click any icon to</p>
                        <h2 className="text-4xl font-bold text-center lg:text-left mb-8">Contact Us</h2>
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <a href="tel:+917558009733" className="flex items-center text-lg text-primary hover:underline">
                                    <FaPhone className="mr-3" size={24} />
                                    +91 755 800 9733
                                </a>
                                <a href="https://wa.me/917012953286" target="_blank" rel="noopener noreferrer" className="flex items-center text-lg text-primary hover:underline">
                                    <FaWhatsapp className="mr-3" size={24} />
                                    Chat on WhatsApp
                                </a>
                                <a href="mailto:info@namm-tour.com" className="flex items-center text-lg text-primary hover:underline">
                                    <FaEnvelope className="mr-3" size={24} />
                                    info@nammatour.com
                                </a>

                            </div>
                            <div className="flex space-x-4">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                    <FaFacebook size={24} />
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                    <FaXTwitter size={24} />
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                    <FaInstagram size={24} />
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                    <FaLinkedin size={24} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Enquiry Form */}
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-4xl font-bold text-center lg:text-left mb-8">Plan Your Trip</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full px-4 py-3 rounded-lg border"
                                />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full px-4 py-3 rounded-lg border"
                                />
                            </div>
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                className="w-full px-4 py-3 rounded-lg border"
                            />
                            <textarea
                                placeholder="Tell us about your requirements"
                                rows={4}
                                className="w-full px-4 py-3 rounded-lg border"
                            />
                            <button
                                type="submit"
                                className="w-full bg-foreground text-background py-4 rounded-lg text-xl hover:bg-primary transition"
                            >
                                Send Enquiry
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}