impl Solution {
    // One monotonic-index sweep per side: popping every strictly taller
    // index before i leaves j, the nearest index with
    // maxHeights[j] <= maxHeights[i]; towers j+1..i clip to the peak
    // height while the prefix up to j keeps its own best mountain, so
    // left[i] = left[j] + maxHeights[i] * (i - j). Sums reach
    // n * max(maxHeights[i]) = 10^5 * 10^9 = 10^14, past i32 range, so
    // they widen to i64; no intermediate exceeds that, far below the
    // ~9.2 * 10^18 i64 ceiling.
    pub fn maximum_sum_of_heights(maxHeights: Vec<i32>) -> i64 {
        let n = maxHeights.len();
        let mut left = vec![0_i64; n];
        let mut right = vec![0_i64; n];
        let mut stack: Vec<usize> = Vec::new();
        for i in 0..n {
            let h = maxHeights[i] as i64;
            while stack.last().map_or(false, |&j| maxHeights[j] as i64 > h) {
                stack.pop();
            }
            left[i] = match stack.last() {
                Some(&j) => left[j] + h * (i - j) as i64,
                None => h * (i as i64 + 1),
            };
            stack.push(i);
        }
        stack.clear();
        for i in (0..n).rev() {
            let h = maxHeights[i] as i64;
            while stack.last().map_or(false, |&j| maxHeights[j] as i64 > h) {
                stack.pop();
            }
            right[i] = match stack.last() {
                Some(&j) => right[j] + h * (j - i) as i64,
                None => h * (n - i) as i64,
            };
            stack.push(i);
        }
        let mut best = 0_i64;
        for i in 0..n {
            best = best.max(left[i] + right[i] - maxHeights[i] as i64);
        }
        best
    }
}
