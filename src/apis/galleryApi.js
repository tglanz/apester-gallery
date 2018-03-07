import galleryData from '../hardcoded-data/subset.json';

// We have galleryData hardcoded, treat it like it was acquired from some api
export default async ({ from, count } => ({
    items: galleryData.filter((_, idx)) => from <= idx && idx <= from + count,
    from,
    count,
    total: galleryData.length
});