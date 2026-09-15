impl Solution {
    pub fn late_fee(daysLate: Vec<i32>) -> i32 {
        // The fee is a step function of each book's late-day count, so every
        // entry is handled alone: place it in its bracket and scale by that
        // bracket's rate.
        let mut total = 0;
        for days in daysLate {
            if days == 1 {
                // Flat fine for a single day late.
                total += 1;
            } else if days <= 5 {
                // Doubled rate for two through five days inclusive.
                total += 2 * days;
            } else {
                // Tripled rate once past five days.
                total += 3 * days;
            }
        }
        total
    }
}
