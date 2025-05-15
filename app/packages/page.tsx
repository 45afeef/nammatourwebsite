import BannerCard from "@/components/banner-card";
import PackageList from "@/components/packages";

export default function PackagesPage() {
    return (
        <>
            <BannerCard
                imageUrl="/images/wayanad-bg.jpg"
                title="Discover Authentic Adventures"
                subtitle="Explore our exclusive Wayanad tour packages"
            />

            <PackageList />
        </>
    );
}