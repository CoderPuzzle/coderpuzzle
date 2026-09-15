impl Solution {
    pub fn split_array(nums: Vec<i32>, k: i32) -> i32 {
        fn feasible(nums: &[i32], k: i64, limit: i64) -> bool {
            // Greedy piece count under the limit: extending each piece as
            // far as possible never forces more pieces later.
            let mut pieces: i64 = 1;
            let mut current: i64 = 0;
            for &value in nums {
                if current + value as i64 > limit {
                    pieces += 1;
                    if pieces > k {
                        return false;
                    }
                    current = value as i64;
                } else {
                    current += value as i64;
                }
            }
            true
        }

        // Binary-search the answer: the smallest limit for which k pieces
        // suffice (the piece count only falls as the limit rises). Bounds:
        // no element can be split, and one piece covering everything works.
        let mut lo: i64 = i64::MIN;
        let mut hi: i64 = 0;
        for &value in &nums {
            lo = lo.max(value as i64);
            hi += value as i64;
        }
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if feasible(&nums, k as i64, mid) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        lo as i32
    }
}
