impl Solution {
    pub fn gcd_sum(nums: Vec<i32>) -> i64 {
        // prefixGcd[i] is gcd(nums[i], running max so far). Once built, the
        // sorted list is paired smallest-with-largest, and each pair's gcd
        // is summed — a two-pointer walk from both ends. Widen to i64: the
        // sum of up to 5e4 gcds, each as large as 1e9, reaches ~5e13.
        let mut prefix_gcd: Vec<i64> = Vec::with_capacity(nums.len());
        let mut running = 0i64;
        for &value in &nums {
            let v = value as i64;
            running = running.max(v);
            prefix_gcd.push(gcd(v, running));
        }
        prefix_gcd.sort_unstable();
        let (mut lo, mut hi) = (0usize, prefix_gcd.len() - 1);
        let mut total = 0i64;
        while lo < hi {
            total += gcd(prefix_gcd[lo], prefix_gcd[hi]);
            lo += 1;
            hi -= 1;
        }
        total
    }
}

fn gcd(mut a: i64, mut b: i64) -> i64 {
    while b != 0 {
        let t = a % b;
        a = b;
        b = t;
    }
    a
}
