import PackageList from "@/components/packages";
import Image from "next/image";

export default function PackagesPage() {
    return (
        <>
            <div
                style={{
                    backgroundImage: "url('/images/wayanad-bg.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                className="relative flex flex-col md:mt-24 mt-12 w-4/5 mx-auto p-8 rounded-lg shadow-lg h-72 text-center justify-center items-center overflow-clip"
            >
                <div className="absolute inset-0 w-full h-full bg-black opacity-30" />

                <div className="relative z-10 text-white">
                    <h1 className="text-3xl font-bold ">
                        Discover Authentic Adventures
                    </h1>
                    <p className="mt-2">Explore our exclusive Wayanad tour packages</p>

                </div>
            </div>

            <PackageList />
        </>
    );
}