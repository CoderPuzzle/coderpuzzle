impl Solution {
    // dp[i][j] is the fewest white tiles still visible among floor[i:]
    // when at most j carpets remain. Tile i is either left showing — and
    // pays floor[i] on top of dp[i+1][j] — or a carpet is laid with its
    // left end exactly at i, hiding i..i+carpetLen-1 and jumping the
    // state to dp[min(i+carpetLen, n)][j-1]. Filling i downward and j
    // upward leaves every reference already computed, and the j = 0 row
    // is just the suffix white counts. dp[0][numCarpets] answers for the
    // whole floor; overlapping or wasted carpets cost nothing because the
    // recurrence takes a minimum, never a sum, over placements.
    pub fn minimum_white_tiles(floor: String, numCarpets: i32, carpetLen: i32) -> i32 {
        let bytes = floor.as_bytes();
        let n = bytes.len();
        let (num_carpets, carpet_len) = (numCarpets as usize, carpetLen as usize);
        let mut dp = vec![vec![0i32; num_carpets + 1]; n + 1];
        for i in (0..n).rev() {
            let white = (bytes[i] - b'0') as i32;
            dp[i][0] = dp[i + 1][0] + white;
            let covered = (i + carpet_len).min(n);
            for j in 1..=num_carpets {
                dp[i][j] = (dp[i + 1][j] + white).min(dp[covered][j - 1]);
            }
        }
        dp[0][num_carpets]
    }
}
