function minimumArrayLength(nums: number[]): number {
    // A unique minimum absorbs everything (m % y === m for y > m), and a
    // value not divisible by the minimum forges an even smaller unique
    // minimum — both end at length 1. Otherwise every survivor stays a
    // multiple of m, and only merging two copies of m removes one.
    let m = Infinity;
    for (const value of nums) if (value < m) m = value;
    let count = 0;
    let indivisible = false;
    for (const value of nums) {
        if (value === m) count++;
        if (value % m !== 0) indivisible = true;
    }
    if (count === 1 || indivisible) return 1;
    return Math.floor((count + 1) / 2);
}
