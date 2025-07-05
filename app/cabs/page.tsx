'use client';

import React, { useState } from "react";

import SedanSVG from "@/components/svg/sedan";
import SuvSVG from "@/components/svg/suv";
import TempoSVG from "@/components/svg/tempo";

const CAB_OPTIONS = [
    {
        label: "Sedan",
        value: "sedan",
        Icon: SedanSVG,
        seats: 4,
        desc: "Comfortable for small families or business trips."
    },
    {
        label: "SUV",
        value: "suv",
        Icon: SuvSVG,
        seats: 6,
        desc: "Spacious and perfect for group travel."
    },
    {
        label: "Tempo Traveller",
        value: "tempo",
        Icon: TempoSVG,
        seats: 12,
        desc: "Ideal for large groups and tours."
    }
];

export default function CabsPage() {
    const [cab, setCab] = useState(CAB_OPTIONS[0]);
    const [pickup, setPickup] = useState("");
    const [drop, setDrop] = useState("");
    const [duration, setDuration] = useState(1);
    const [durationType, setDurationType] = useState("day");
    const [seats, setSeats] = useState(cab.seats);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleCabChange = (option: typeof CAB_OPTIONS[number]) => {
        setCab(option);
        setSeats(option.seats);
    };

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!pickup.trim()) newErrors.pickup = "Pickup point is required.";
        if (!drop.trim()) newErrors.drop = "Dropping place is required.";
        if (!name.trim()) newErrors.name = "Name is required.";
        if (!phone.trim()) newErrors.phone = "Phone number is required.";
        else if (!/^\d{10}$/.test(phone.trim())) newErrors.phone = "Enter a valid 10-digit phone number.";
        if (!duration || duration < 1) newErrors.duration = "Duration must be at least 1.";
        if (!seats || seats < 1 || seats > cab.seats) newErrors.seats = `Seats must be between 1 and ${cab.seats}.`;
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const whatsappMessage = `Hi, I'm interested in booking a ${cab.label} cab (${seats} seats) from ${pickup} to ${drop} for ${duration} ${durationType}(s). My name is ${name}, contact: ${phone}.`;
    const whatsappUrl = `https://wa.me/917012953286?text=${encodeURIComponent(whatsappMessage)}`;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            window.open(whatsappUrl, '_blank');
        }
    };

    return (
        <main className="pt-40 min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 py-10 px-4 flex flex-col items-center">
            <div className="max-w-2xl w-full bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
                <h1 className="text-3xl font-bold mb-2 text-center text-gray-900 dark:text-white">Book Your Cab</h1>
                <p className="mb-6 text-center text-gray-600 dark:text-gray-300">Choose your cab, fill in your details, and get a custom quote instantly on WhatsApp!</p>
                <div className="flex justify-center gap-4 mb-8">
                    {CAB_OPTIONS.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            className={`group flex flex-col items-center border-2 rounded-xl p-3 w-32 transition-all duration-500 focus:outline-none ${cab.value === option.value ? 'border-green-500 bg-green-50 dark:bg-green-900' : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'}`}
                            onClick={() => handleCabChange(option)}
                        >
                            <div className="w-16 h-16 mb-2 relative flex items-center justify-center text-black dark:text-white">
                                <option.Icon />
                            </div>
                            <span className="font-semibold text-gray-800 dark:text-gray-100">{option.label}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{option.desc}</span>
                        </button>
                    ))}
                </div>
                <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-gray-700 dark:text-gray-200 mb-1">Pickup Point</label>
                            <input type="text" className={`w-full rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white p-2 ${errors.pickup ? 'border-red-500' : ''}`} value={pickup} onChange={e => setPickup(e.target.value)} placeholder="Enter pickup location" required />
                            {errors.pickup && <p className="text-xs text-red-500 mt-1">{errors.pickup}</p>}
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-700 dark:text-gray-200 mb-1">Dropping Place</label>
                            <input type="text" className={`w-full rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white p-2 ${errors.drop ? 'border-red-500' : ''}`} value={drop} onChange={e => setDrop(e.target.value)} placeholder="Enter drop location" required />
                            {errors.drop && <p className="text-xs text-red-500 mt-1">{errors.drop}</p>}
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-gray-700 dark:text-gray-200 mb-1">Duration</label>
                            <div className="flex gap-2">
                                <input type="number" min={1} className={`flex-1 w-20 rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white p-2 ${errors.duration ? 'border-red-500' : ''}`} value={duration} onChange={e => setDuration(Number(e.target.value))} required />
                                <select className="flex-1 rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white p-2" value={durationType} onChange={e => setDurationType(e.target.value)}>
                                    <option value="day">Day(s)</option>
                                    <option value="night">Night(s)</option>
                                </select>
                            </div>
                            {errors.duration && <p className="text-xs text-red-500 mt-1">{errors.duration}</p>}
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-700 dark:text-gray-200 mb-1">Seat Capacity</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    min={1}
                                    max={cab.seats}
                                    className={`w-full rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white p-2 pr-16 ${errors.seats ? 'border-red-500' : ''}`}
                                    value={seats}
                                    onChange={e => setSeats(Number(e.target.value))}
                                    required
                                />
                                <span className="absolute right-2 bottom-2 text-xs text-gray-500 dark:text-gray-400">
                                    Max: {cab.seats}
                                </span>
                            </div>
                            {errors.seats && <p className="text-xs text-red-500 mt-1">{errors.seats}</p>}
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-gray-700 dark:text-gray-200 mb-1">Your Name</label>
                            <input type="text" className={`w-full rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white p-2 ${errors.name ? 'border-red-500' : ''}`} value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" required />
                            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-700 dark:text-gray-200 mb-1">Phone Number</label>
                            <input type="tel" className={`w-full rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white p-2 ${errors.phone ? 'border-red-500' : ''}`} value={phone} onChange={e => setPhone(e.target.value)} placeholder="Enter your phone" required />
                            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="block w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl text-lg text-center shadow-lg transition-all duration-500"
                    >
                        🚕 Get Custom Quote on WhatsApp
                    </button>
                </form>
            </div>
        </main>
    );
}
