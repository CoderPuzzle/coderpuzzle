impl Solution {
    pub fn range_sum(nums: Vec<i32>, n: i32, left: i32, right: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let n = n as usize;
        // Every subarray sum, generated with a running total per start index
        // so each end index adds O(1) work instead of re-summing nums[i..j].
        let mut sums = Vec::with_capacity(n * (n + 1) / 2);
        for i in 0..n {
            let mut running = 0i32;
            for j in i..n {
                running += nums[j];
                sums.push(running);
            }
        }
        sums.sort();
        // 1-indexed [left, right] window, accumulated in a 64-bit total and
        // reduced modulo 1e9 + 7 — the raw sum can exceed a 32-bit
        // accumulator even though no single subarray sum does.
        let mut answer: i64 = 0;
        for k in (left as usize - 1)..(right as usize) {
            answer = (answer + sums[k] as i64) % MOD;
        }
        answer as i32
    }
}
