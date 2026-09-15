impl Solution {
    pub fn sum_imbalance_numbers(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        let mut total: i64 = 0;
        for i in 0..n {
            // Seed with the single-element window: its imbalance is 0.
            let mut seen = vec![false; n + 2];
            seen[nums[i] as usize] = true;
            let mut cur: i64 = 0;
            for &v in &nums[i + 1..] {
                let v = v as usize;
                if !seen[v] {
                    let lo = seen[v - 1];
                    let hi = seen[v + 1];
                    if lo && hi {
                        cur -= 1;
                    } else if !lo && !hi {
                        cur += 1;
                    }
                    seen[v] = true;
                }
                total += cur;
            }
        }
        total as i32
    }
}
