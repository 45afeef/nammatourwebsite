import PackageList from "@/components/packages";
import { dataService } from "@/lib/data-fetching";

export default async function PackagesPage() {
    const groups = await dataService.categoryRepo.getGroups();

    return <PackageList groups={groups} />;
}