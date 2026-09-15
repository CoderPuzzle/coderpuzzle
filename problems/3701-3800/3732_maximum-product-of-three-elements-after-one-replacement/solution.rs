impl Solution {
    pub fn max_product(nums: Vec<i32>) -> i64 {
        // One sweep keeps the two largest and the two smallest values. Those
        // four slots always contain the two elements of largest magnitude:
        // absolute values are V-shaped across a sorted array, so both
        // winners come off its ends.
        let mut max1 = i64::MIN;
        let mut max2 = i64::MIN;
        let mut min1 = i64::MAX;
        let mut min2 = i64::MAX;
        for value in nums {
            let value = value as i64;
            if value > max1 {
                max2 = max1;
                max1 = value;
            } else if value > max2 {
                max2 = value;
            }
            if value < min1 {
                min2 = min1;
                min1 = value;
            } else if value < min2 {
                min2 = value;
            }
        }
        // The optimal triple is the mandatory replacement pushed to +-10^5
        // (its sign matched to the pair) times the most extreme pair product.
        let extremes = [max1, max2, min1, min2];
        let mut best_pair = 0_i64;
        for i in 0..4 {
            for j in i + 1..4 {
                best_pair = best_pair.max((extremes[i] * extremes[j]).abs());
            }
        }
        100_000 * best_pair
    }
}
