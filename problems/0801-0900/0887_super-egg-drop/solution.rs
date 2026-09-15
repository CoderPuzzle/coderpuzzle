impl Solution {
    pub fn super_egg_drop(k: i32, n: i32) -> i32 {
        let k = k as usize;
        // dp[e]: floors resolvable with `moves` moves and e eggs; grow the
        // move count until k eggs cover all n floors.
        let mut dp = vec![0i64; k + 1];
        let mut moves = 0i32;
        while dp[k] < n as i64 {
            moves += 1;
            // One drop settles its own floor plus the below-case (e - 1 eggs)
            // and the above-case (e eggs), each with one move fewer. Sweeping
            // e downward keeps dp[e - 1] at the previous move's value — the
            // in-place 0/1 knapsack trick.
            let mut e = k;
            while e >= 1 {
                dp[e] = dp[e - 1] + dp[e] + 1;
                e -= 1;
            }
        }
        moves
    }
}
