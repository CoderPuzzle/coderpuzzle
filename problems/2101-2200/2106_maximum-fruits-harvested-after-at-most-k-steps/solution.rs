impl Solution {
    pub fn max_total_fruits(fruits: Vec<Vec<i32>>, startPos: i32, k: i32) -> i64 {
        let n = fruits.len();
        // An optimal walk turns at most once, so the harvest is always one
        // contiguous interval of the position-sorted fruit array. Prefix
        // sums give each interval's fruit total in O(1).
        let mut prefix = vec![0i64; n + 1];
        for i in 0..n {
            prefix[i + 1] = prefix[i] + fruits[i][1] as i64;
        }

        let windowCost = |leftPos: i32, rightPos: i32| -> i64 {
            // Cheapest cost of covering the interval from startPos:
            // straight line when the start lies outside it; otherwise
            // double the leg walked first, taking the better direction.
            if startPos <= leftPos {
                return (rightPos - startPos) as i64;
            }
            if startPos >= rightPos {
                return (startPos - leftPos) as i64;
            }
            let a = 2 * (startPos - leftPos) as i64 + (rightPos - startPos) as i64;
            let b = 2 * (rightPos - startPos) as i64 + (startPos - leftPos) as i64;
            a.min(b)
        };

        let mut best: i64 = 0;
        let mut left = 0usize;
        // Two-pointer sweep: shrink while the interval exceeds k, and
        // re-check affordability before counting (a lone unreachable fruit
        // never contributes). Both pointers only advance, so linear overall.
        for right in 0..n {
            while left < right && windowCost(fruits[left][0], fruits[right][0]) > k as i64 {
                left += 1;
            }
            if windowCost(fruits[left][0], fruits[right][0]) <= k as i64 {
                best = best.max(prefix[right + 1] - prefix[left]);
            }
        }
        best
    }
}
