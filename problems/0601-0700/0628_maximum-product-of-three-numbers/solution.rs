impl Solution {
    pub fn maximum_product(nums: Vec<i32>) -> i32 {
        // Only two triples can hold the maximum: the three largest values,
        // or the largest value times the two smallest — two negatives whose
        // product is a big positive. Track all five extremes in one pass;
        // no sort needed.
        let (mut max1, mut max2, mut max3) = (i32::MIN, i32::MIN, i32::MIN);
        let (mut min1, mut min2) = (i32::MAX, i32::MAX);
        for &value in &nums {
            if value >= max1 {
                max3 = max2;
                max2 = max1;
                max1 = value;
            } else if value >= max2 {
                max3 = max2;
                max2 = value;
            } else if value > max3 {
                max3 = value;
            }
            if value <= min1 {
                min2 = min1;
                min1 = value;
            } else if value < min2 {
                min2 = value;
            }
        }
        // n >= 3 replaces every sentinel, and three values bounded by 1000
        // in magnitude keep each candidate within 10^9 — inside i32 range
        // (2^31 - 1 is about 2.15 * 10^9). The products are still formed
        // in i64 before the comparison, per the house rule.
        let top = max1 as i64 * max2 as i64 * max3 as i64;
        let spread = min1 as i64 * min2 as i64 * max1 as i64;
        top.max(spread) as i32
    }
}
