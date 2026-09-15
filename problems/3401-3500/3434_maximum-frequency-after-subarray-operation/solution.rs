impl Solution {
    // Fix the source value v the operation converts into k (x = k - v).
    // A window then nets +1 for each v it captures and -1 for each k it
    // destroys, so the best window for v is the maximum-subarray run of
    // that score — reset to 0 when it dips negative, since choosing
    // x = 0 keeps the untouched baseline.
    pub fn max_frequency(nums: Vec<i32>, k: i32) -> i32 {
        let mut base = 0;
        for &value in &nums {
            if value == k {
                base += 1;
            }
        }
        let mut best = 0;
        for v in 1..=50 {
            if v == k {
                continue;
            }
            let mut run = 0;
            for &value in &nums {
                if value == v {
                    run += 1;
                } else if value == k {
                    run -= 1;
                }
                if run < 0 {
                    run = 0;
                }
                if run > best {
                    best = run;
                }
            }
        }
        base + best
    }
}
