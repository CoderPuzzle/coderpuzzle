impl Solution {
    pub fn count_vowel_strings(n: i32) -> i32 {
        let mut dp: [i32; 5] = [1, 1, 1, 1, 1];
        for _ in 0..(n - 1) {
            let mut next = [0; 5];
            let mut prefix = 0;
            for v in 0..5 {
                prefix += dp[v];
                next[v] = prefix;
            }
            dp = next;
        }
        dp.iter().sum()
    }
}
