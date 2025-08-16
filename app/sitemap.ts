import fs from 'fs/promises';
import path from 'path';

import { dataService } from '@/lib/data-fetching';
import { PackageRepository } from '@/lib/data-fetching/repositories/package-repository';


const BASE_URL = 'https://www.raqlin.com';


// Next.js expects the default export to return an array of objects with url and lastModified
export default async function sitemap() {
    // Static routes
    const staticPages = [
        '',
        'blog',
        'cabs',
        'contact',
        'packages',
        'rooms',
        'package',
    ];


    // Dynamic slugs

    // Blog slugs
    const blogSlugs: string[] = await dataService.blogRepo.getAllBlogs().then(blogs =>
        blogs.map((b) => b.slug).filter(Boolean)
    );

    // Package groups slugs from packages.json
    const repo = new PackageRepository();
    const collections = await repo.getAllCollections();
    const packageGroups: string[] = collections.map((group) => group.name.replace(/\s+/g, "-").toLowerCase());

    // Single package slugs (if you have a /package/[slug] route)
    const packageSlugs: string[] = await dataService.tourPackagesRepo.getAllTourPackages().then(packages =>
        packages.map((pkg) => pkg.slug)
    );

    let urls = staticPages.map((page) => ({
        url: `${BASE_URL}/${page}`,
        lastModified: new Date().toISOString(),
    }));

    urls = urls.concat(
        blogSlugs.map((slug) => ({
            url: `${BASE_URL}/blog/${slug}`,
            lastModified: new Date().toISOString(),
        })),
        packageSlugs.map((slug) => ({
            url: `${BASE_URL}/package/${slug}`,
            lastModified: new Date().toISOString(),
        })),
        packageGroups.map((slug) => ({
            url: `${BASE_URL}/packages/${slug}`,
            lastModified: new Date().toISOString(),
        })),
    );

    return urls;
}
