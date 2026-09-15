function maxKDistinct(nums: number[], k: number): number[] {
    // Set keys hold each value once and stay exact numbers, so spreading
    // them collapses nums to its distinct values.
    const distinct = [...new Set(nums)];
    // Numeric comparator -- the default sort is lexicographic; descending
    // order lines the largest values up first, and the first k of them are
    // the unique optimum (slice keeps all of them when fewer than k exist).
    distinct.sort((a, b) => b - a);
    return distinct.slice(0, k);
}
