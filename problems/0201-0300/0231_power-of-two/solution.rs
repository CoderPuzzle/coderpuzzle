impl Solution {
    pub fn is_power_of_two(n: i32) -> bool {
        // A power of two is a lone set bit, 100…0; subtracting one borrows
        // through it to 011…1, so the two patterns share no bit position and
        // AND to zero — true of no other positive value. The n > 0 guard
        // rejects zero and the negatives, which arrive signed down to -2³¹ —
        // and its short-circuit keeps n - 1 from ever leaving n >= 1.
        n > 0 && (n & (n - 1)) == 0
    }
}
