impl Solution {
    pub fn number_of_child(n: i32, k: i32) -> i32 {
        // The holder walks 0 -> n-1 -> 0 in exactly 2 * (n - 1) seconds
        // and is back at child 0 facing right, so positions are
        // periodic with that cycle. Reduce k modulo the cycle: the
        // first n - 1 steps walk forward, the rest retrace backward at
        // mirrored offsets.
        let r = k % (2 * (n - 1));
        if r < n {
            r
        } else {
            2 * (n - 1) - r
        }
    }
}
