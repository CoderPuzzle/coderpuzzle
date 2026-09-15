use std::collections::HashSet;

impl Solution {
    pub fn divisible_game(nums: Vec<i32>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let mut candidates: HashSet<i32> = HashSet::from([2]);
        for &value in &nums {
            let mut divisor = 2;
            while divisor * divisor <= value {
                if value % divisor == 0 {
                    candidates.insert(divisor);
                    candidates.insert(value / divisor);
                }
                divisor += 1;
            }
            if value > 1 {
                candidates.insert(value);
            }
        }

        let mut best_score = i64::MIN;
        let mut best_k = 0;
        for &k in &candidates {
            let mut score = i64::MIN;
            let mut current = 0i64;
            for &value in &nums {
                let transformed = if value % k == 0 { value as i64 } else { -(value as i64) };
                current = transformed.max(current + transformed);
                score = score.max(current);
            }
            if score > best_score || (score == best_score && k < best_k) {
                best_score = score;
                best_k = k;
            }
        }
        let answer = ((best_score % MOD + MOD) % MOD) * best_k as i64 % MOD;
        answer as i32
    }
}
