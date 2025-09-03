'use client';

import { useEffect, useState } from "react";

const BookingForm = () => {


    const [duration, setDuration] = useState("3d2n"); // Default duration
    // WHY: Default duration is set to "3d2n" (3 days, 2 nights) as it's a common tour length and provides a sensible default for most users.

    const getNextFriday = () => {
        const today = new Date();
        const result = new Date(today);
        const daysUntilFriday = ((5 + 7 - today.getDay()) % 7) || 7;
        result.setDate(today.getDate() + daysUntilFriday);
        return result;
    };
    // WHY: getNextFriday helps preselect a start date that is likely to be convenient for most users (weekend trips are popular).

    const defaultStartDate = getNextFriday();
    const defaultEndDate = new Date(defaultStartDate);
    defaultEndDate.setDate(defaultStartDate.getDate() + 2);
    // WHY: Default start and end dates are set to the next Friday and the following Sunday (3 days, 2 nights), matching the default duration and user expectations for weekend getaways.

    const [form, setForm] = useState({
        packageType: "Budget",
        startDate: defaultStartDate.toISOString().slice(0, 10),
        endDate: defaultEndDate.toISOString().slice(0, 10),
        adults: 2,
        kids: 0,
        name: "",
    });
    // WHY: The form state holds all user input. Defaults are chosen to minimize user effort for the most common booking scenario.
    const [submitting, setSubmitting] = useState(false);
    const [submitType, setSubmitType] = useState<'whatsapp' | 'razorpay'>('razorpay');

    // Predefined durations
    const durations = [
        { key: "1d", label: "1D" },
        { key: "2d1n", label: "2D1N" },
        { key: "3d2n", label: "3D2N" },
        { key: "4d3n", label: "4D3N" },
    ];
    // WHY: Predefined durations are shown as chips for quick selection, matching popular package options and reducing user friction.

    // Helper: get days between two dates
    function getDays(start: string, end: string) {
        if (!start || !end) return 0;
        const s = new Date(start);
        const e = new Date(end);
        return Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
    }
    // WHY: getDays calculates the number of days between two dates, used for duration logic and validation.

    // Helper to get label for custom duration
    function getCustomDurationLabel(start: string, end: string) {
        if (!start || !end) return "Custom";
        const days = getDays(start, end);
        if (days < 0) return "Invalid";
        if (days === 0) return "1D";
        if (days === 1) return "2D1N";
        if (days === 2) return "3D2N";
        if (days === 3) return "4D3N";
        return `${days + 1}D${days}N`;
    }
    // WHY: getCustomDurationLabel provides a user-friendly label for custom durations, so users always see a meaningful description even for non-standard trips.

    // Helper: get human-friendly date label
    function getHumanFriendlyLabel(dateStr: string) {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);
        const dayDiff = Math.round((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        const day = date.getDay();
        // Map of major Indian holidays (add more as needed)
        const holidays = [
            { label: "Onam", month: 8, day: 6 }, // Aug 6 (example, update as per year)
            { label: "Holi", month: 2, day: 14 }, // Mar 14 (example)
            { label: "Christmas", month: 11, day: 25 },
            { label: "Dussehra", month: 9, day: 2 }, // Oct 2 (example)
            // Add more as needed
        ];
        // Check for holidays
        for (const h of holidays) {
            if (date.getMonth() === h.month && date.getDate() === h.day) {
                return h.label;
            }
        }
        // Check for next Friday/Saturday/Sunday
        if (dayDiff === 0) return "Today";
        if (dayDiff === 1) return "Tomorrow";
        if (dayDiff > 1 && dayDiff <= 7) {
            const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][day];
            return `Next ${weekday}`;
        }
        // If within this month
        if (date.getMonth() === today.getMonth()) {
            return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`;
        }
        // Fallback: show full date in a friendly format
        return date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    }
    // WHY: getHumanFriendlyLabel translates a date into a label like "Next Friday" or "Onam" to reduce cognitive load and make the form more relatable for users.

    // When start or end date changes, update duration based on a regex match
    useEffect(() => {
        if (!form.startDate || !form.endDate) return;
        if (new Date(form.startDate) > new Date(form.endDate)) {
            const regex = /^(\d+)d(?:\s*(\d+)n)?$/;
            const match = duration.match(regex);
            if (match) {
                const totalDays = parseInt(match[1], 10);
                const daysOffset = totalDays - 1;
                const s = new Date(form.startDate);
                s.setDate(s.getDate() + daysOffset);
                const newEndDate = s.toISOString().slice(0, 10);
                setForm(f => ({ ...f, endDate: newEndDate }));
            }
            return;
        }
        const days = getDays(form.startDate, form.endDate);
        if (days < 0) return;
        // Create a duration string like "1d" or "2d1n", "9d8n", etc.
        const newDuration = days === 0 ? "1d" : `${days + 1}d${days}n`;
        const regex = /^(\d+)d(?:\s*(\d+)n)?$/;
        if (regex.test(newDuration)) {
            setDuration(newDuration);
        }
    }, [form.startDate, form.endDate]);
    // WHY: When start or end date changes, update duration to match the new selection, ensuring the UI and logic stay in sync. Also, if end date is before start, auto-correct it to match the selected duration.

    // When duration changes, update end date if start date is set
    useEffect(() => {
        if (!form.startDate) return;
        // This regex matches both "1d" and "2d1n", "9d8n", "20d19n" etc.
        const regex = /^(\d+)d(?:\s*(\d+)n)?$/;
        const match = duration.match(regex);
        if (!match) return;

        const totalDays = parseInt(match[1], 10);
        // For any valid duration, we assume booking spans totalDays, so offset is totalDays - 1.
        const daysOffset = totalDays - 1;
        const s = new Date(form.startDate);
        const e = new Date(s);
        e.setDate(s.getDate() + daysOffset);
        const endDate = e.toISOString().slice(0, 10);
        if (form.endDate !== endDate) {
            setForm(f => ({ ...f, endDate }));
        }
    }, [duration]);
    // WHY: When duration changes, update the end date to match the selected duration, so the form always reflects the user's intent and prevents mismatches.

    const handleDuration = (d: string) => setDuration(d);
    // WHY: handleDuration is a simple setter for duration, used by the chip UI for clarity and separation of concerns.

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: name === "adults" || name === "kids" ? Number(value) : value }));
    };
    // WHY: handleChange updates form state for all fields, converting adults/kids to numbers for validation and calculation.

    // WHY: handleSubmit validates the form, prevents invalid bookings, and opens WhatsApp with a prefilled message for seamless booking experience.

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.startDate || !form.endDate) {
            alert("Please select both start and end dates.");
            return;
        }
        if (new Date(form.startDate) > new Date(form.endDate)) {
            alert("End date must be after start date.");
            return;
        }
        if (form.adults < 1) {
            alert("At least one adult is required.");
            return;
        }

        setSubmitting(true);

        if (submitType === 'whatsapp') {
            const msg = `Hi, I am interested in the Wayanad package (${form.packageType}). Please check availability for my dates.\nStart: ${form.startDate}\nEnd: ${form.endDate}\nAdults: ${form.adults}\nKids (Below 9): ${form.kids}\nName: ${form.name}\nPage: ${typeof window !== 'undefined' ? window.location.href : ''}`;
            const url = `https://wa.me/917907575484?text=${encodeURIComponent(msg)}`;
            window.open(url, '_blank');
            setSubmitting(false);
        } else if (submitType === 'razorpay') {
            // Example: 2500 per adult, 0 for kids (customize as needed)
            const amount = form.adults * 2500;
            try {
                const res = await fetch('/api/razorpay/order', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ amount, currency: 'INR' })
                });
                const data = await res.json();
                if (!data.id) throw new Error(data.error || 'Order creation failed');
                const options = {
                    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
                    amount: data.amount,
                    currency: data.currency,
                    name: 'Raqlin',
                    description: `Booking for ${form.name}`,
                    order_id: data.id,
                    handler: function (response: any) {
                        alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
                    },
                    prefill: {
                        name: form.name,
                    },
                    notes: {
                        packageType: form.packageType,
                        startDate: form.startDate,
                        endDate: form.endDate,
                        adults: form.adults,
                        kids: form.kids,
                    },
                    theme: { color: '#3399cc' },
                };
                // @ts-ignore
                const rzp = new window.Razorpay(options);
                rzp.open();
            } catch (err: any) {
                alert('Payment error: ' + err.message);
            }
            setSubmitting(false);
        }
    };

    return (
        <div className="sticky top-0">
            {/* Razorpay script loader */}
            <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
            <form className="bg-gray-100 p-4 rounded shadow-xl flex flex-col gap-4 max-w-md" onSubmit={handleSubmit}>
                <div>
                    <label className="block font-semibold mb-1">Your Name</label>
                    <input name="name" type="text" value={form.name || ''} onChange={handleChange} required className="w-full border rounded p-2" placeholder="Booking Person Name" />
                </div>
                <div>
                    <label className="block font-semibold mb-1">Package Type</label>
                    <div className="flex flex-wrap gap-2">
                        {["Budget", "Standard", "Premium", "Platinum", "Adventure", "Glamping Stay", "Private Pool", "Tree House", "Luxury"].map((type) => (
                            <label
                                key={type}
                                className={`cursor-pointer px-2 py-2 rounded-sm  border transition-colors text-xs
                                    ${form.packageType === type
                                        ? "bg-blue-500 text-white border-blue-500 font-semibold"
                                        : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-100"}
                                `}
                                style={{ userSelect: "none" }}
                            >
                                <input
                                    type="radio"
                                    name="packageType"
                                    value={type}
                                    checked={form.packageType === type}
                                    onChange={handleChange}
                                    className="hidden"
                                />
                                {type}
                            </label>
                        ))}
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block font-semibold mb-1">Start Date</label>
                        {form.startDate && (
                            <div className="text-xs text-blue-600 mb-1">{getHumanFriendlyLabel(form.startDate)}</div>
                        )}
                        <input
                            name="startDate"
                            type="date"
                            value={form.startDate}
                            min={new Date().toISOString().slice(0, 10)}
                            onChange={handleChange}
                            className="w-full border rounded p-2"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block font-semibold mb-1">End Date</label>
                        {form.endDate && (
                            <div className="text-xs text-blue-600 mb-1">{getHumanFriendlyLabel(form.endDate)}</div>
                        )}
                        <input
                            name="endDate"
                            type="date"
                            value={form.endDate}
                            onChange={handleChange}
                            disabled={!form.startDate}
                            min={form.startDate || undefined}
                            className="w-full border rounded p-2"
                        />
                    </div>
                </div>
                {/* Day/Night Duration Chip Selection */}
                <div>
                    <label className="block font-semibold mb-1">Duration</label>
                    <div className="flex flex-wrap gap-2">
                        {durations.map(({ key, label }) => (
                            <label
                                key={key}
                                className={`cursor-pointer px-4 py-2 rounded-sm border transition-colors text-xs
                                    ${duration === key
                                        ? "bg-blue-500 text-white border-blue-500 font-semibold"
                                        : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-blue-100"}
                                `}
                                style={{ userSelect: "none" }}
                            >
                                <input
                                    type="radio"
                                    name="duration"
                                    value={key}
                                    checked={duration === key}
                                    onChange={() => handleDuration(key)}
                                    className="hidden"
                                />
                                {label}
                            </label>
                        ))}
                        {/* Show custom chip if not in predefined durations */}
                        {
                            !durations.some(d => d.key === duration) && form.startDate && form.endDate && (
                                <label
                                    className={`cursor-pointer px-4 py-2 rounded-sm border transition-colors text-xs bg-blue-500 text-white border-blue-500 font-semibold`}
                                    style={{ userSelect: "none" }}
                                >
                                    <input
                                        type="radio"
                                        name="duration"
                                        value="custom"
                                        checked={!durations.some(d => d.key === duration)}
                                        onChange={() => { }}
                                        className="hidden"
                                        readOnly
                                    />
                                    {getCustomDurationLabel(form.startDate, form.endDate)}
                                </label>
                            )
                        }
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block font-semibold mb-1">Adults</label>
                        <input name="adults" type="number" min={1} max={99} value={form.adults} onChange={handleChange} className="w-full border rounded p-2" />
                    </div>
                    <div className="flex-1">
                        <label className="block font-semibold mb-1">Kids (Below 9)</label>
                        <input name="kids" type="number" min={0} max={10} value={form.kids} onChange={handleChange} className="w-full border rounded p-2" />
                    </div>
                </div>
                <text>

                    pay advance of &nbsp;
                    <span className="text-2xl font-bold text-green-700 mb-2">₹{(form.adults * 2000).toLocaleString()}<span className="text-base text-gray-400 line-through ml-2">₹{(form.adults * 3500).toLocaleString()}</span></span>
                    &nbsp; per adult
                </text>
                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="flex-1/2 bg-green-600 text-white font-medium py-2 rounded text-center hover:bg-green-700 transition mt-2"
                        disabled={submitting}
                        onClick={() => setSubmitType('whatsapp')}
                    >
                        {submitting && submitType === 'whatsapp' ? "Processing..." : "Check Availability & Book on WhatsApp"}
                    </button>
                    <button
                        type="submit"
                        className="flex-1/2 bg-blue-600 text-white font-semibold py-2 rounded text-center hover:bg-blue-700 transition mt-2"
                        disabled={submitting}
                        onClick={() => setSubmitType('razorpay')}
                    >
                        {submitting && submitType === 'razorpay' ? "Processing..." : "Pay Now (Razorpay)"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default BookingForm;