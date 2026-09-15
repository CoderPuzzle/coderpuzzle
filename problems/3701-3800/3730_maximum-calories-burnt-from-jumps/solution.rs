impl Solution {
    pub fn max_calories_burnt(heights: Vec<i32>) -> i64 {
        // Sorted extremes alternate through the routine: the largest
        // remaining height takes each even index (descending), the smallest
        // takes each odd index (ascending), so every edge spans the widest
        // gap available and the first jump claims the tallest block.
        let mut s = heights.clone();
        s.sort();
        let n = s.len();
        let mut arr = vec![0i32; n];
        let (mut lo, mut hi) = (0usize, n - 1);
        for index in 0..n {
            if index % 2 == 0 {
                arr[index] = s[hi];
                hi -= 1;
            } else {
                arr[index] = s[lo];
                lo += 1;
            }
        }
        // Squared gaps reach ~10^10 and totals approach 10^15: widen to
        // i64 before multiplying, an i32 square overflows at once.
        let mut total = arr[0] as i64 * arr[0] as i64;
        for index in 1..n {
            let gap = arr[index - 1] as i64 - arr[index] as i64;
            total += gap * gap;
        }
        total
    }
}
