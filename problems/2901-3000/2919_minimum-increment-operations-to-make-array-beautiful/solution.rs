impl Solution {
    // Raising a position above k never helps, so each position i has a
    // fixed cost max(0, k - nums[i]) for being raised; nums is beautiful
    // exactly when every window of 3 consecutive positions contains a
    // raised one. dp[i] = cheapest plan covering every window in the
    // prefix ending at i with position i raised, and the previous raised
    // position must be within distance 3. The total reaches
    // 10^5 * 10^9 = 10^14, past i32 range, so the costs stay in i64.
    pub fn min_increment_operations(nums: Vec<i32>, k: i32) -> i64 {
        let mut a = (k - nums[0]).max(0) as i64;
        let mut b = (k - nums[1]).max(0) as i64;
        let mut c = (k - nums[2]).max(0) as i64;
        for &value in &nums[3..] {
            // Only the last three states are ever read: roll the window.
            let next = (k - value).max(0) as i64 + a.min(b).min(c);
            a = b;
            b = c;
            c = next;
        }
        // The last raised position can be any of the final three.
        a.min(b).min(c)
    }
}
