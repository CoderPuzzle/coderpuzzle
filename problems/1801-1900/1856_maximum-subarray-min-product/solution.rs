impl Solution {
    pub fn max_sum_min_product(nums: Vec<i32>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let n = nums.len();
        let mut prefix = vec![0i64; n + 1];
        for i in 0..n {
            prefix[i + 1] = prefix[i] + nums[i] as i64;
        }
        let mut best: i64 = 0;
        let mut stack: Vec<usize> = Vec::with_capacity(n); // indices with strictly increasing values
        for i in 0..=n {
            let cur = if i < n { nums[i] as i64 } else { 0 }; // sentinel 0 pops everything
            while let Some(&top) = stack.last() {
                if (nums[top] as i64) < cur {
                    break;
                }
                let m = nums[top] as i64;
                stack.pop();
                let left = stack.last().map_or(-1i64, |&l| l as i64);
                let total = prefix[i] - prefix[(left + 1) as usize];
                best = best.max(m * total);
            }
            if i < n {
                stack.push(i);
            }
        }
        (best % MOD) as i32
    }
}
