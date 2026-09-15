impl Solution {
    pub fn stone_game_vii(stones: Vec<i32>) -> i32 {
        // Each move removes one of the two ends, so a position is fully the
        // run stones[l..r] still on the table. Both players optimize the same
        // number from their own side: dp[l][r] is the best margin, mover's
        // score minus opponent's, on that run — taking the left stone banks
        // sum(l+1..r) and hands the rest over, whose best margin there
        // becomes the taker's deficit; the right stone mirrors it. Fill l
        // descending / r ascending so both shorter runs are ready.
        let n = stones.len();
        let mut pre = vec![0i64; n + 1];
        for i in 0..n {
            pre[i + 1] = pre[i] + stones[i] as i64;
        }
        let mut dp = vec![vec![0i32; n]; n];
        for l in (0..n - 1).rev() {
            let pl = pre[l];
            let pl1 = pre[l + 1];
            let (front, back) = dp.split_at_mut(l + 1);
            let row = &mut front[l];
            let below = &back[0];
            for r in l + 1..n {
                let a = pre[r + 1] - pl1 - below[r] as i64;
                let b = pre[r] - pl - row[r - 1] as i64;
                row[r] = a.max(b) as i32;
            }
        }
        dp[0][n - 1]
    }
}
