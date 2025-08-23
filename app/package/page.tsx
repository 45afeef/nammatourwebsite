import PackageList from "@/components/packages";
import { PackageCategoryRepository } from "@/lib/data-fetching/repositories/package-repository";

export default async function PackagesPage() {
    const groups = await new PackageCategoryRepository().getGroups();

    return <PackageList groups={groups} />;
}