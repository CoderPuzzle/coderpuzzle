impl Solution {
    pub fn min_cost_to_move_chips(position: Vec<i32>) -> i32 {
        // A +-2 move is free, so only parity matters; a +-1 move flips it
        // at cost 1. Pay for whichever side has fewer chips.
        let odd = position.iter().filter(|p| *p % 2 == 1).count() as i32;
        odd.min(position.len() as i32 - odd)
    }
}
