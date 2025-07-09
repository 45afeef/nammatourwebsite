import React from "react";
import BannerCard from "@/components/banner-card";

export default function PackagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container max-w-11/12 mx-auto my-16">
      <BannerCard
        imageUrl="/images/wayanad-bg.jpg"
        title="Discover Authentic Adventures"
        subtitle="Explore our exclusive Wayanad tour packages"
      />
      <div>
        {children}
      </div>
    </div>
  );
}
