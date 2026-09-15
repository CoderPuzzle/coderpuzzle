use std::collections::HashSet;

impl Solution {
    pub fn powerful_integers(x: i32, y: i32, bound: i32) -> Vec<i32> {
        // Walk the x-ladder 1, x, x^2, ... while x^i <= bound. Every
        // y-power is at least 1, so once x^i exceeds bound no sum it
        // heads can stay legal and the walk may stop there.
        let mut seen = HashSet::new();
        let mut xi = 1;
        while xi <= bound {
            // For this x-power, walk the y-ladder while the sum stays
            // within bound. A base of 1 freezes its ladder at 1 — cap
            // the exponent right there, or the walk never advances.
            let mut yj = 1;
            while xi + yj <= bound {
                seen.insert(xi + yj);
                if y == 1 {
                    break;
                }
                yj *= y;
            }
            // The same cap on the x-ladder itself.
            if x == 1 {
                break;
            }
            xi *= x;
        }
        // The set already holds every distinct legal sum; sorting
        // states the pinned ascending order in code.
        let mut out: Vec<i32> = seen.into_iter().collect();
        out.sort_unstable();
        out
    }
}
