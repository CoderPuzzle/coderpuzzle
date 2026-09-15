impl Solution {
    // Track a running streak of consecutive odd values; any even value
    // resets it. Three in a row settles the answer immediately.
    pub fn three_consecutive_odds(arr: Vec<i32>) -> bool {
        let mut streak = 0;
        for value in arr {
            if value % 2 != 0 {
                streak += 1;
                if streak >= 3 {
                    return true;
                }
            } else {
                streak = 0;
            }
        }
        false
    }
}
