use std::collections::HashMap;

impl Solution {
    pub fn smallest_unique_subarray(nums: Vec<i32>) -> i32 {
        let mut value_counts = HashMap::<i32, i32>::new();
        for &value in &nums {
            *value_counts.entry(value).or_insert(0) += 1;
        }
        if value_counts.values().any(|&count| count == 1) {
            return 1;
        }
        if value_counts.len() == 1 {
            return nums.len() as i32;
        }

        const BASE: i64 = 100_003;
        const MOD1: i64 = 10_000_019;
        const MOD2: i64 = 10_000_079;
        let n = nums.len();
        let mut power1 = vec![1_i64; n + 1];
        let mut power2 = vec![1_i64; n + 1];
        let mut prefix1 = vec![0_i64; n + 1];
        let mut prefix2 = vec![0_i64; n + 1];
        for i in 0..n {
            power1[i + 1] = power1[i] * BASE % MOD1;
            power2[i + 1] = power2[i] * BASE % MOD2;
            prefix1[i + 1] = (prefix1[i] * BASE + nums[i] as i64) % MOD1;
            prefix2[i + 1] = (prefix2[i] * BASE + nums[i] as i64) % MOD2;
        }
        let works = |length: usize| -> bool {
            let mut frequencies = HashMap::<(i64, i64), i32>::with_capacity(n - length + 1);
            for start in 0..=n - length {
                let end = start + length;
                let first = (prefix1[end] - prefix1[start] * power1[length] % MOD1 + MOD1) % MOD1;
                let second = (prefix2[end] - prefix2[start] * power2[length] % MOD2 + MOD2) % MOD2;
                *frequencies.entry((first, second)).or_insert(0) += 1;
            }
            frequencies.values().any(|&count| count == 1)
        };
        let mut low = 1_usize;
        let mut high = n;
        while low < high {
            let middle = (low + high) / 2;
            if works(middle) {
                high = middle;
            } else {
                low = middle + 1;
            }
        }
        low as i32
    }
}
