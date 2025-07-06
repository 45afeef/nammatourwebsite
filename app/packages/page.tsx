import BannerCard from "@/components/banner-card";
import PackageList from "@/components/packages";

export default function PackagesPage() {
    return (
        <div className="container mx-auto px-2 py-2 max-w-11/12">
            <BannerCard
                imageUrl="/images/wayanad-bg.jpg"
                title="Discover Authentic Adventures"
                subtitle="Explore our exclusive Wayanad tour packages"
            />

            <PackageList />
        </div>
    );
}