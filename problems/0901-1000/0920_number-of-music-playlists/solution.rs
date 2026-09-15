impl Solution {
    pub fn num_music_playlists(n: i32, goal: i32, k: i32) -> i32 {
        // dp[i][j] counts playlists of length i that use exactly j distinct
        // songs. Play i introduces a new song — n - j + 1 choices left, so
        // dp[i-1][j-1] * (n - j + 1) — or repeats a used one: the last k
        // plays are pairwise distinct, because two occurrences of one song
        // closer than k would already violate the window, so exactly
        // min(k, j) used songs are blocked and max(0, j - k) remain,
        // giving dp[i-1][j] * (j - k). Row i reads only row i-1, so one
        // rolling row carries the table; the answer is dp[goal][n].
        const MOD: i64 = 1_000_000_007;
        let (n, goal, k) = (n as usize, goal as usize, k as usize);
        let mut prev: Vec<i64> = vec![0; n + 1];
        prev[0] = 1;
        for i in 1..=goal {
            let mut cur: Vec<i64> = vec![0; n + 1];
            for j in 1..=i.min(n) {
                let mut total = prev[j - 1] * (n - j + 1) as i64;
                if j > k {
                    total += prev[j] * (j - k) as i64;
                }
                cur[j] = total % MOD;
            }
            prev = cur;
        }
        prev[n] as i32
    }
}
