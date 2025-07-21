import PackageList from "@/components/packages";
import { PackageRepository } from "@/lib/data-fetching/repositories/package-repository";

export default async function PackagesPage() {
    const groups = await new PackageRepository().getGroups();

    return <PackageList groups={groups} />;
}