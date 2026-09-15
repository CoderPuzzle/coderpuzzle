impl Solution {
    pub fn get_winner(arr: Vec<i32>, k: i32) -> i32 {
        // Track the running champion and its win streak in a single
        // left-to-right pass; this reproduces the same sequence of wins the
        // literal move-loser-to-the-back simulation would produce.
        let mut champion = arr[0];
        let mut streak = 0;
        for &value in arr.iter().skip(1) {
            if value > champion {
                champion = value;
                streak = 1;
            } else {
                streak += 1;
            }
            if streak >= k {
                return champion;
            }
        }
        champion
    }
}
