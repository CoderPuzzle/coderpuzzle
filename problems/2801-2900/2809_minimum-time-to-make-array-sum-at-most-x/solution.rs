impl Solution {
    pub fn minimum_time(nums1: Vec<i32>, nums2: Vec<i32>, x: i32) -> i32 {
        // Exchange arguments: each index needs zeroing at most once ("shift
        // left" removes repeats), and among the kept zeroings larger rates
        // belong later - taking element e as operation j removes
        // nums1[e] + nums2[e] * j of the eventual sum. Sort ascending by rate.
        let n = nums1.len();
        let mut order: Vec<usize> = (0..n).collect();
        order.sort_by_key(|&index| nums2[index]);
        let mut base: i64 = 0;
        let mut growth: i64 = 0;
        for value in &nums1 {
            base += *value as i64;
        }
        for value in &nums2 {
            growth += *value as i64;
        }
        // Best[j] = the most removable using exactly j operations among the
        // elements processed so far; sums reach ~10^9 where an i32 would be
        // tight, so i64 carries all intermediates.
        let mut best = vec![0_i64; n + 1];
        for position in 1..=n {
            let index = order[position - 1];
            let initial = nums1[index] as i64;
            let rate = nums2[index] as i64;
            for count in (1..=position).rev() {
                let candidate = best[count - 1] + initial + rate * count as i64;
                if candidate > best[count] {
                    best[count] = candidate;
                }
            }
        }
        let limit = x as i64;
        for time in 0..=n {
            let moment = time as i64;
            if base + growth * moment - best[time] <= limit {
                return time as i32;
            }
        }
        -1
    }
}
