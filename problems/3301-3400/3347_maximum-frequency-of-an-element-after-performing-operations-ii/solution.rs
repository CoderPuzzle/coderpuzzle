impl Solution {
    pub fn max_frequency(mut nums: Vec<i32>, k: i32, num_operations: i32) -> i32 {
        // A target v collects every element in [v-k, v+k]: elements already
        // equal to v cost nothing, any other costs one operation, and
        // surplus operations can always be spent as +0 elsewhere because
        // num_operations <= n. So the best frequency at v is
        // min(window(v), count(v) + num_operations). Values reach 1e9, far
        // too wide to sweep, so only breakpoints are tried: if the optimum
        // falls off an element, its window's smallest element x can slide
        // the target to x + k without losing anyone, so v = nums[i] and
        // v = nums[i] + k always contain an optimum; nums[i] - k is the
        // symmetric guard. Window bounds reach 3e9, past 32 bits, so the
        // candidate arithmetic runs in i64.
        nums.sort_unstable();
        let k64 = k as i64;
        let lower_bound = |limit: i64| {
            let mut lo = 0_usize;
            let mut hi = nums.len();
            while lo < hi {
                let mid = (lo + hi) / 2;
                if (nums[mid] as i64) < limit {
                    lo = mid + 1;
                } else {
                    hi = mid;
                }
            }
            lo
        };
        let upper_bound = |limit: i64| {
            let mut lo = 0_usize;
            let mut hi = nums.len();
            while lo < hi {
                let mid = (lo + hi) / 2;
                if (nums[mid] as i64) <= limit {
                    lo = mid + 1;
                } else {
                    hi = mid;
                }
            }
            lo
        };
        let mut best = 0_i64;
        for &x in &nums {
            let x64 = x as i64;
            for v in [x64 - k64, x64, x64 + k64] {
                let window = (upper_bound(v + k64) - lower_bound(v - k64)) as i64;
                let exact = (upper_bound(v) - lower_bound(v)) as i64;
                best = best.max(window.min(exact + num_operations as i64));
            }
        }
        best as i32
    }
}
