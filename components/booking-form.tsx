import { useEffect, useState } from "react";

const BookingForm = () => {


    const [duration, setDuration] = useState("3d2n"); // Default duration

    const getNextFriday = () => {
        const today = new Date();
        const result = new Date(today);
        const daysUntilFriday = ((5 + 7 - today.getDay()) % 7) || 7;
        result.setDate(today.getDate() + daysUntilFriday);
        return result;
    };

    const defaultStartDate = getNextFriday();
    const defaultEndDate = new Date(defaultStartDate);
    defaultEndDate.setDate(defaultStartDate.getDate() + 2);

    const [form, setForm] = useState({
        packageType: "Budget",
        startDate: defaultStartDate.toISOString().slice(0, 10),
        endDate: defaultEndDate.toISOString().slice(0, 10),
        adults: 2,
        kids: 0,
        name: "",
    });
    const [submitting, setSubmitting] = useState(false);

    // Predefined durations
    const durations = [
        { key: "1d", label: "1D" },
        { key: "2d1n", label: "2D1N" },
        { key: "3d2n", label: "3D2N" },
        { key: "4d3n", label: "4D3N" },
    ];

    // Helper: get days between two dates
    function getDays(start: string, end: string) {
        if (!start || !end) return 0;
        const s = new Date(start);
        const e = new Date(end);
        return Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24));
    }

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
    // When start or end date changes, update duration based on a regex match
    useEffect(() => {
        if (!form.startDate || !form.endDate) return;
        const days = getDays(form.startDate, form.endDate);
        if (days < 0) return;
        // Create a duration string like "1d" or "2d1n", "9d8n", etc.
        const newDuration = days === 0 ? "1d" : `${days + 1}d${days}n`;
        const regex = /^(\d+)d(?:\s*(\d+)n)?$/;
        if (regex.test(newDuration)) {
            setDuration(newDuration);
        }
    }, [form.startDate, form.endDate]);

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

    const handleDuration = (d: string) => setDuration(d);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: name === "adults" || name === "kids" ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
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
        const msg = `Hi, I am interested in the Wayanad package (${form.packageType}). Please check availability for my dates.\nStart: ${form.startDate}\nEnd: ${form.endDate}\nAdults: ${form.adults}\nKids (Below 9): ${form.kids}\nName: ${form.name}\nPage: ${typeof window !== 'undefined' ? window.location.href : ''}`;
        const url = `https://wa.me/918891998005?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
        setSubmitting(false);
    };


    return (
        <div className="sticky top-28">
            <form className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow-xl flex flex-col gap-4 max-w-md" onSubmit={handleSubmit}>
                <div>
                    <label className="block font-semibold mb-1">Your Name</label>
                    <input name="name" type="text" value={form.name || ''} onChange={handleChange} required className="w-full border rounded p-2 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700" placeholder="Booking Person Name" />
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
                                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-blue-100 dark:hover:bg-blue-800"}
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
                        <input name="startDate" type="date" value={form.startDate} onChange={handleChange} className="w-full border rounded p-2 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700" />
                    </div>
                    <div className="flex-1">
                        <label className="block font-semibold mb-1">End Date</label>
                        <input name="endDate" type="date" value={form.endDate} onChange={handleChange} className="w-full border rounded p-2 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700" disabled={!form.startDate} min={form.startDate || undefined} />
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
                                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-blue-100 dark:hover:bg-blue-800"}
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
                        <input name="adults" type="number" min={1} max={14} value={form.adults} onChange={handleChange} className="w-full border rounded p-2 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700" />
                    </div>
                    <div className="flex-1">
                        <label className="block font-semibold mb-1">Kids (Below 9)</label>
                        <input name="kids" type="number" min={0} max={10} value={form.kids} onChange={handleChange} className="w-full border rounded p-2 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700" />
                    </div>
                </div>
                <div className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">₹2,500 <span className="text-base text-gray-400 dark:text-gray-500 line-through ml-2">₹3,500</span></div>
                <button
                    type="submit"
                    className="bg-green-600 dark:bg-green-700 text-white font-semibold py-2 rounded text-center hover:bg-green-700 dark:hover:bg-green-800 transition mt-2"
                    disabled={submitting}
                >
                    {submitting ? "Processing..." : "Check Availability & Book on WhatsApp"}
                </button>
            </form>
        </div>
    );
}

export default BookingForm;