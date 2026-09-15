impl Solution {
    pub fn distinct_integers(n: i32) -> i32 {
        // Any x >= 2 on the board pulls in x - 1 (since x % (x - 1) == 1),
        // so the chain walks all the way down to 2. Nothing below 2 can
        // ever appear: i needs i >= 2 to leave remainder 1, and 1 itself
        // never qualifies. The board ends as exactly {2..n}; the 10^9
        // days dwarf the <= n - 1 day chain.
        if n == 1 {
            1
        } else {
            n - 1
        }
    }
}
