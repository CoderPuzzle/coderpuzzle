use std::collections::HashMap;

impl Solution {
    // nums[p] * nums[r] == nums[q] * nums[s] rearranges to
    // nums[p] / nums[q] == nums[s] / nums[r]: a leading pair (p, q) and a
    // trailing pair (r, s) sharing one reduced fraction. Sweep r left to
    // right; when r clears q + 2 the pair (p, q) joins the counter, and
    // every (r, s) with s >= r + 2 looks its fraction up.
    pub fn number_of_subsequences(nums: Vec<i32>) -> i64 {
        let n = nums.len();
        let mut counts: HashMap<(i32, i32), i64> = HashMap::new();
        let mut total = 0_i64;
        for r in 0..n {
            if r >= 2 {
                let q = r - 2;
                for p in 0..q.saturating_sub(1) {
                    let divisor = Self::gcd(nums[p], nums[q]);
                    *counts.entry((nums[p] / divisor, nums[q] / divisor)).or_insert(0) += 1;
                }
            }
            for s in r + 2..n {
                let divisor = Self::gcd(nums[s], nums[r]);
                if let Some(&matched) = counts.get(&(nums[s] / divisor, nums[r] / divisor)) {
                    total += matched;
                }
            }
        }
        total
    }

    fn gcd(mut a: i32, mut b: i32) -> i32 {
        while b != 0 {
            let remainder = a % b;
            a = b;
            b = remainder;
        }
        a
    }
}
