impl Solution {
    // Totals stay within 1000 * 1000 = 10^6 and the difference within
    // ±10^6, so i32 arithmetic carries everything without overflow.
    // One pass with a signed turn: +1 while the first player is active,
    // -1 while the second is. Each rule that fires flips the sign — odd
    // points flip once, a 6th-game index flips once — and when both fire
    // on the same game the flips cancel, exactly the sequential double
    // swap. The active player's points then enter the first-minus-second
    // difference as turn * points.
    pub fn score_difference(nums: Vec<i32>) -> i32 {
        let mut diff = 0i32;
        let mut turn = 1i32;
        for (i, &points) in nums.iter().enumerate() {
            if points % 2 == 1 {
                turn = -turn;
            }
            if i % 6 == 5 {
                turn = -turn;
            }
            diff += turn * points;
        }
        diff
    }
}
