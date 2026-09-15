impl Solution {
    // win[i] is true if the player about to move at value i can force a
    // win. Every position only depends on smaller positions already
    // computed earlier in this same forward sweep.
    pub fn divisor_game(n: i32) -> bool {
        let n = n as usize;
        let mut win = vec![false; n + 1];
        for i in 1..=n {
            for x in 1..i {
                if i % x == 0 && !win[i - x] {
                    win[i] = true;
                    break;
                }
            }
        }
        win[n]
    }
}
