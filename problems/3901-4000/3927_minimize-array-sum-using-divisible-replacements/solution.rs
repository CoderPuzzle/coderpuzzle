impl Solution {
    pub fn min_array_sum(nums: Vec<i32>) -> i64 {
        let limit = 100000usize;
        let mut present = vec![false; limit + 1];
        for &value in &nums {
            present[value as usize] = true;
        }

        let mut best = vec![0i32; limit + 1];
        for divisor in 1..=limit {
            if !present[divisor] {
                continue;
            }
            let mut multiple = divisor;
            while multiple <= limit {
                if present[multiple] && (best[multiple] == 0 || (divisor as i32) < best[multiple]) {
                    best[multiple] = divisor as i32;
                }
                multiple += divisor;
            }
        }

        nums.iter().map(|&value| best[value as usize] as i64).sum()
    }
}
