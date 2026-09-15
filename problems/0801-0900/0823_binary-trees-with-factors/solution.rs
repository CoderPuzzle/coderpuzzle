use std::collections::HashMap;

impl Solution {
    pub fn num_factored_binary_trees(arr: Vec<i32>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let mut arr = arr;
        arr.sort_unstable();
        let mut index: HashMap<i32, usize> = HashMap::new();
        for (i, &v) in arr.iter().enumerate() {
            index.insert(v, i);
        }
        let mut dp = vec![1i64; arr.len()]; // dp[i] = trees rooted at arr[i]
        for i in 0..arr.len() {
            let v = arr[i];
            let mut total: i64 = 1;
            for j in 0..i {
                if v % arr[j] == 0 {
                    if let Some(&other) = index.get(&(v / arr[j])) {
                        total += dp[j] * dp[other];
                    }
                }
            }
            dp[i] = total % MOD;
        }
        let mut sum: i64 = 0;
        for value in dp {
            sum += value;
        }
        (sum % MOD) as i32
    }
}
