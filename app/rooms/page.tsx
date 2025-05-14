export default function RoomsPage() {
    const rooms = [
        {
            alt: "Best WAYANAD COUPLE PACKAGE",
            category: "Budget",
            name: "Affordable Family Stay in Kalpetta, Wayanad",
            price: "₹1,500"
        },
        {
            alt: "Best Wayanad adventure tour packages",
            category: "Premium",
            name: "Budget Jungle Retreat in Meppadi, Wayanad",
            price: "₹1,500"
        },
        {
            alt: "Wayanad Best Tour Packages",
            category: "Backpack",
            name: "Forest Escape Cottages in 900 Kandi, Wayanad",
            price: "₹1,500"
        },
        {
            alt: "Wayanad Best Tour Packages",
            category: "Budget",
            name: "Scenic Mountain Stay in Vythiri, Wayanad",
            price: "₹1,500"
        },
        {
            alt: "WAYANAD ADVENTURE PACKAGES",
            category: "Adventure",
            name: "Affordable Mountain Stay Near 900 Kandi, Wayanad",
            price: "₹1,800"
        },
        {
            alt: "WAYANAD ADVENTURE PACKAGES",
            category: "Budget",
            name: "Comfortable Family Stay in Sultan Bathery, Wayanad",
            price: "₹1,800"
        },
        {
            alt: "WAYANAD ADVENTURE PACKAGES",
            category: "Private Pool",
            name: "Romantic Private Pool Resort in Sultan Bathery, Wayanad",
            price: "₹1,800"
        },
        {
            alt: "best budget pool resorts in wayanad",
            category: "Platinum",
            name: "Luxury Villa with Pool in Kalpetta, Wayanad",
            price: "₹2,000"
        },
        {
            alt: "best budget pool WAYANAD COUPLE PACKAGE",
            category: "Premium",
            name: "Luxury Nature Resort Stay in Meppadi, Wayanad",
            price: "₹3,500"
        },
        {
            alt: "best budget pool WAYANAD COUPLE PACKAGE",
            category: "IMAGE-WAYANAD COUPLE PACKAGE",
            name: "Premium Nature Resort in Meppadi, Wayanad",
            price: "₹3,500"
        },
        {
            alt: "best WAYANAD COUPLE tour PACKAGE",
            category: "Premium",
            name: "Private Plunge Pool in Coffee Plantation, Wayanad",
            price: "₹3,500"
        },
        {
            alt: "WAYANAD COUPLE tour PACKAGE",
            category: "Budget",
            name: "Affordable Treehouse Stay in Meppadi, Wayanad",
            price: "₹4,000"
        },
        {
            alt: "BEST WAYANAD COUPLE tour PACKAGE",
            category: "Premium",
            name: "Comfortable Wooden Cottage Stay in Wayanad",
            price: "₹4,000"
        },
        {
            alt: "Best Private Pool resort for couples in Wayanad",
            category: "Peaceful Pool Villa",
            name: "Romantic Private Pool Resort in Kalpetta, Wayanad",
            price: "₹4,000"
        },
        {
            alt: "Best Premium Rooms in 900 Kandi, Wayanad",
            category: "Platinum",
            name: "Pet-Friendly Exclusive Private Stay in 900 Kandi, Wayanad",
            price: "₹5,000"
        },
        {
            alt: "Best WAYANAD ADVENTURE PACKAGES",
            category: "Platinum",
            name: "Romantic Stay at Plantation Resort, Meppadi, Wayanad",
            price: "₹5,000"
        },
        {
            alt: "Best Wayanad Tour Packages and Best  Couple Rooms in Wayanad",
            category: "Premium",
            name: "The Best Luxury Boutique Resort Stay at Kalpetta, Wayanad",
            price: "₹5,500"
        },
        {
            alt: "best tree house stay in wayanad",
            category: "Premium",
            name: "Exclusive Private Pool Treehouse in Meppadi, Wayanad",
            price: "₹8,000"
        },
        {
            alt: "Best Wayanad Tour Packages and Best  Couple Rooms in Wayanad",
            category: "Budget",
            name: "Affordable Serene Homestay in Meppadi, Wayanad",
            price: "₹1,200"
        },
        {
            alt: "Best Wayanad Tour Packages and Best  Couple Rooms in Wayanad",
            category: "Premium",
            name: "Family Pool Villa in Sultan Bathery, Wayanad",
            price: "₹1,200"

        },
        {
            alt: "Best Wayanad Tour Packages",
            category: "Premium",
            name: "Affordable Family Resort in Vythiri, Wayanad",
            price: "₹1,300"
        },

        {
            alt: "Customized Wayanad itineraries",
            category: "Premium",
            name: "Plantation View Homestay in Chundel, Wayanad",
            price: "₹1,300"
        },

        {
            alt: "Best Wayanad Tour Packages",
            category: "Platinum",
            name: "Scenic Pool Resort in Sultan Bathery, Wayanad",
            price: "₹1,300"
        },
        {
            alt: "best rooms in 900 kandi, wayanad",
            category: "Adventure",
            name: "Exclusive Forest Cottages in 900 Kandi, Wayanad",
            price: "₹1,400"
        },
    ];

    return (
        <div className="container mx-auto py-8">
            {/* Banner */}

            <div
                className="relative w-full h-64 sm:h-80 md:h-96 bg-cover bg-center rounded-lg overflow-hidden"
                style={{ backgroundImage: "url('images/abstract-bg.jpg')" }}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative flex flex-col items-center justify-center h-full text-white px-4">
                    <p className="text-lg mb-2">rooms/stays</p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
                        Handpicked Curated List of Best Vibey Stay
                    </h1>
                    <p className="mt-2 text-sm sm:text-base text-center">
                        Ever updating, simple and minimal stays that match your vibe
                    </p>
                </div>
            </div>

            {/* Rooms Gallery */}
            {/* Tailwind CSS handles the hover effect using the group and group-hover classes.
                Ensure you add the "group" class to your card container as shown below: */}
            <div className="px-4 md:px-0 py-8">
                <h2 className="text-4xl font-bold text-center mb-4">Best Rooms in Wayanad</h2>
                <p className="text-center text-foreground/80
                   mb-16">
                    Curated experiences for every type of traveler
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {rooms.map((item, index) => (
                        <div key={index} className=" shadow-lg rounded-xl overflow-hidden border-0 hover:shadow-xl transition-shadow duration-300 group shadow-foreground/30 ">
                            <img
                                src={`/images/rooms/room-${index + 1}.webp`}
                                alt={item.alt || item.name}
                                className="w-full h-60 object-cover transform transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="p-4 flex flex-col h-44">
                                <p className="text-sm text-gray-500">{item.category}</p>
                                <h2 className="text-xl font-bold flex-1">{item.name}</h2>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Starts With</span>
                                    <p className="text-lg font-medium">{item.price}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
}