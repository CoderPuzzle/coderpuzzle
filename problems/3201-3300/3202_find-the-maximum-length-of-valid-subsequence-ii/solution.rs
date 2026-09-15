impl Solution {
    pub fn maximum_length(nums: Vec<i32>, k: i32) -> i32 {
        // A valid subsequence's adjacent sums share one unknown residue,
        // so try each candidate val in [0, k). While streaming nums under
        // a fixed val, dp[r] is the best chain whose last element is r
        // mod k; appending an element of residue r needs a previous
        // element at residue (val - r) mod k, and a lone element always
        // restarts a chain. rem_euclid keeps every remainder non-negative;
        // n and k stay at 10^3, well inside i32 everywhere.
        let k = k as usize;
        let residues: Vec<usize> = nums.iter().map(|v| (*v as i64).rem_euclid(k as i64) as usize).collect();
        let mut best = 0_i32;
        for val in 0..k {
            let mut dp = vec![0_usize; k];
            for r in &residues {
                let prev = dp[(val + k - r) % k];
                let length = if prev >= 1 { prev + 1 } else { 1 };
                if length > dp[*r] {
                    dp[*r] = length;
                    if length as i32 > best {
                        best = length as i32;
                    }
                }
            }
        }
        best
    }
}
