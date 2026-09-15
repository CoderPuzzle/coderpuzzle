impl Solution {
    pub fn flip_lights(n: i32, presses: i32) -> i32 {
        // Every button flips a set of labels that is periodic — periods 1,
        // 2, 2 and 3 — so any outcome repeats with period 6. Writing A1..A4
        // for the four press parities, the class statuses are
        // s1 = A1 xor A3 xor A4, s2 = A1 xor A2, s3 = A1 xor A3, then
        // s4 = s1 xor s2 xor s3 while s5 = s3 and s6 = s2: bulbs
        // 1..min(n, 3) pin the whole string. Pressing a button twice
        // cancels, so a parity vector with k odd entries is realizable in
        // exactly p presses iff k <= p and k shares p's parity. Counting
        // distinct strings over the realizable vectors gives the table
        // below: 1 at p = 0, 2 when n = 1, 3 or 4 when n = 2, and 4, 7, 8
        // for n >= 3 at p = 1, 2, 3+ — never more than 8, since only 16
        // parity vectors exist and pressing buttons 1, 2 and 3 together is
        // the identity.
        if presses == 0 {
            return 1;
        }
        if n == 1 {
            return 2;
        }
        if n == 2 {
            return if presses == 1 { 3 } else { 4 };
        }
        if presses == 1 {
            return 4;
        }
        if presses == 2 {
            return 7;
        }
        8
    }
}
