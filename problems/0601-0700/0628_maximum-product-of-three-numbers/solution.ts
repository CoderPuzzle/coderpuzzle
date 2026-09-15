function maximumProduct(nums: number[]): number {
    // Only two triples can hold the maximum: the three largest values, or
    // the largest value times the two smallest — two negatives whose
    // product is a big positive. Track all five extremes in one pass; no
    // sort needed.
    let max1 = -Infinity,
        max2 = -Infinity,
        max3 = -Infinity;
    let min1 = Infinity,
        min2 = Infinity;
    for (const value of nums) {
        if (value >= max1) {
            max3 = max2;
            max2 = max1;
            max1 = value;
        } else if (value >= max2) {
            max3 = max2;
            max2 = value;
        } else if (value > max3) {
            max3 = value;
        }
        if (value <= min1) {
            min2 = min1;
            min1 = value;
        } else if (value < min2) {
            min2 = value;
        }
    }
    // n >= 3 replaces every sentinel, and three values bounded by 1000 in
    // magnitude keep each candidate within 10^9, small enough that doubles
    // hold every product exactly.
    return Math.max(max1 * max2 * max3, min1 * min2 * max1);
}
