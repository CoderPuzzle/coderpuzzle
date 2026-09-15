impl Solution {
    pub fn count_excellent_pairs(nums: Vec<i32>, k: i32) -> i64 {
        // identity: popcount(a|b) + popcount(a&b) = popcount(a) + popcount(b),
        // so the pair condition depends only on the two individual bit counts
        // dedupe: pairs are counted over distinct values
        let unique: std::collections::HashSet<i32> = nums.iter().copied().collect();
        // bucket distinct values by their set-bit count
        let mut counts = [0i64; 64];
        for &x in &unique {
            counts[x.count_ones() as usize] += 1;
        }
        let mut answer = 0i64;
        // ordered bucket pairs: c1*c2 covers (a,b) and (b,a), plus (a,a) once
        for b1 in 0..64usize {
            if counts[b1] == 0 {
                continue;
            }
            for b2 in 0..64usize {
                if (b1 + b2) as i32 >= k {
                    answer += counts[b1] * counts[b2];
                }
            }
        }
        answer
    }
}
