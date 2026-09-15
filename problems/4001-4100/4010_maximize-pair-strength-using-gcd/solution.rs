impl Solution {
    pub fn max_pair_strength(nums: Vec<i32>) -> i64 {
        // Fewer than two million pairs at n <= 2000, so every distinct
        // index pair is tried directly: g = gcd(a, b), strength =
        // a * b / g^2. The division is exact because g divides both
        // factors, and equal values collapse to 1, which is why [3,3]
        // scores 1. Widen to i64 before multiplying: two coprime values
        // near the bound reach just under 1e10, past what an i32 holds.
        let mut best: i64 = 0;
        for i in 0..nums.len() {
            for j in (i + 1)..nums.len() {
                let a = nums[i] as i64;
                let b = nums[j] as i64;
                let g = gcd(a, b);
                let s = a * b / (g * g);
                if s > best {
                    best = s;
                }
            }
        }
        best
    }
}

fn gcd(mut a: i64, mut b: i64) -> i64 {
    while b != 0 {
        let remainder = a % b;
        a = b;
        b = remainder;
    }
    a
}
