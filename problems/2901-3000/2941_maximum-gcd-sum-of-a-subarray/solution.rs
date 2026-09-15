impl Solution {
    // For a fixed left end the window gcd only ever decreases as the
    // window grows, and every drop at least halves it, so each left end
    // owns only O(log(max(nums))) distinct gcd values. Keeping one
    // (gcd, furthest right end) entry per value turns the sweep into a
    // merge of two short lists. Prefix sums reach 10^5 * 10^6 = 10^11 and
    // the products reach past the 32-bit range, so the sums, gcds, and
    // products all widen to i64.
    fn gcd(mut a: i64, mut b: i64) -> i64 {
        while b != 0 {
            let rest = a % b;
            a = b;
            b = rest;
        }
        a
    }

    pub fn max_gcd_sum(nums: Vec<i32>, k: i32) -> i64 {
        let n = nums.len();
        let mut prefix = vec![0_i64; n + 1];
        for i in 0..n {
            prefix[i + 1] = prefix[i] + nums[i] as i64;
        }
        let mut best = 0_i64;
        let mut gs: Vec<i64> = Vec::new();
        let mut rs: Vec<i64> = Vec::new();
        for lo in (0..n).rev() {
            let mut ng = vec![nums[lo] as i64];
            let mut nr = vec![lo as i64];
            for t in 0..gs.len() {
                let merged = Self::gcd(gs[t], nums[lo] as i64);
                if merged == *ng.last().unwrap() {
                    *nr.last_mut().unwrap() = rs[t];
                } else {
                    ng.push(merged);
                    nr.push(rs[t]);
                }
            }
            gs = ng;
            rs = nr;
            for t in 0..gs.len() {
                if rs[t] - lo as i64 + 1 >= k as i64 {
                    // Positive elements: the longest window with this gcd
                    // has the largest sum.
                    let candidate = gs[t] * (prefix[(rs[t] + 1) as usize] - prefix[lo]);
                    if candidate > best {
                        best = candidate;
                    }
                }
            }
        }
        best
    }
}
