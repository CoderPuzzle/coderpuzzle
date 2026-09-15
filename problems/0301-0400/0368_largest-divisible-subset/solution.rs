impl Solution {
    pub fn largest_divisible_subset(nums: Vec<i32>) -> Vec<i32> {
        // Divisibility is transitive, so in ascending order each element
        // need only be divisible by the previous one — a longest-chain DP.
        let mut arr = nums.clone();
        arr.sort_unstable();
        let n = arr.len();
        if n == 0 {
            return Vec::new();
        }
        // dp[i] = size of the largest divisible subset ending at arr[i];
        // parent links let the subset be rebuilt, not just counted.
        let mut dp = vec![1i32; n];
        let mut parent = vec![-1i32; n];
        let mut best = 0usize;
        for i in 0..n {
            // Every earlier divisor offers the extension dp[j] + 1.
            for j in 0..i {
                if arr[i] % arr[j] == 0 && dp[j] + 1 > dp[i] {
                    dp[i] = dp[j] + 1;
                    parent[i] = j as i32;
                }
            }
            if dp[i] > dp[best] {
                best = i;
            }
        }
        // Trace parent links from the largest chain, reverse to ascending.
        let mut result: Vec<i32> = Vec::new();
        let mut i = best as i32;
        while i != -1 {
            result.push(arr[i as usize]);
            i = parent[i as usize];
        }
        result.reverse();
        result
    }
}
