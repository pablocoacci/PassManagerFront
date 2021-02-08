export interface PageParams {
    skip: number;
    take: number;
}

export interface SortParams {
    sortBy: string[],
    sortDir: string[]
}