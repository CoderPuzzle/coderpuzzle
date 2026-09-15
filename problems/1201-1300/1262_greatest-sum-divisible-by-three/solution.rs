impl Solution {
    pub fn max_sum_div_three(nums: Vec<i32>) -> i32 {
        // best[r]: greatest prefix sum with sum % 3 == r (-1 = unreachable).
        const NEG: i32 = -1;
        let mut best = [0, NEG, NEG];
        for &x in &nums {
            let mut candidate = best;
            for r in 0..3 {
                if best[r] != NEG {
                    let nr = ((r as i32 + x) % 3) as usize;
                    if best[r] + x > candidate[nr] {
                        candidate[nr] = best[r] + x;
                    }
                }
            }
            best = candidate;
        }
        best[0]
    }
}
