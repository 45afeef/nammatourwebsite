"use client";

import Image from "next/image";

export default function Testimonials({ testimonials }: { testimonials: Array<{ name: string, location: string, image: string, message: string }> }) {
    const marqueeTestimonials = [...testimonials, ...testimonials];
    return (
        <section className="py-8">
            <div className="container mx-auto px-2 md:max-w-11/12">
                <h2 className="text-4xl font-bold text-center mb-4 text-brand-yellow">
                    What Our Travelers Say
                </h2>
                <div className="overflow-hidden relative space-y-6">
                    {/* First row: left to right, slower */}
                    <div className="flex w-max animate-marquee gap-4">
                        {marqueeTestimonials.map((testimonial, index) => (
                            <div key={index} className="card min-w-[320px] max-w-xs bg-white/90 rounded-lg shadow-md p-4 mx-2 flex-shrink-0">
                                <div className="flex items-center mb-4 w-full h-20">
                                    <Image
                                        src={testimonial.image}
                                        alt="Reviewer"
                                        width={60}
                                        height={60}
                                        className="rounded-full"
                                    />
                                    <div className="ml-4">
                                        <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                                        <p className="text-sm text-foreground/70">{testimonial.location}</p>
                                    </div>
                                </div>
                                <div className="flex text-brand-yellow mb-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg key={star} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-foreground/80">{testimonial.message}</p>
                            </div>
                        ))}
                    </div>
                    {/* Second row: right to left, faster */}
                    <div className="flex w-max animate-marquee-reverse gap-4">
                        {marqueeTestimonials.map((testimonial, index) => (
                            <div key={index} className="card min-w-[320px] max-w-xs bg-white/90 rounded-lg shadow-md p-4 mx-2 flex-shrink-0">
                                <div className="flex items-center mb-4 w-full h-20">
                                    <Image
                                        src={testimonial.image}
                                        alt="Reviewer"
                                        width={60}
                                        height={60}
                                        className="rounded-full"
                                    />
                                    <div className="ml-4">
                                        <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                                        <p className="text-sm text-foreground/70">{testimonial.location}</p>
                                    </div>
                                </div>
                                <div className="flex text-brand-yellow mb-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg key={star} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-foreground/80">{testimonial.message}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Tailwind custom animation for marquee */}
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes marquee-reverse {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
                .animate-marquee {
                    animation: marquee 40s linear infinite;
                }
                .animate-marquee-reverse {
                    animation: marquee-reverse 30s linear infinite;
                }
            `}</style>
        </section>
    );
}