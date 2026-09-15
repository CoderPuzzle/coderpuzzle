function maxProductDifference(nums: number[]): number {
    // Every value is positive, so the difference is maximized by the product
    // of the two largest values minus the product of the two smallest; one
    // streaming pass maintains all four extremes. All products stay within
    // 1e8 < 2^53, so Number is exact.
    let m1 = 0;
    let m2 = 0;
    let s1 = 1000000000;
    let s2 = 1000000000;
    for (const x of nums) {
        if (x > m1) {
            m2 = m1;
            m1 = x;
        } else if (x > m2) {
            m2 = x;
        }
        if (x < s1) {
            s2 = s1;
            s1 = x;
        } else if (x < s2) {
            s2 = x;
        }
    }
    return m1 * m2 - s1 * s2;
}
