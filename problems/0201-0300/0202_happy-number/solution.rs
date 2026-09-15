use std::collections::HashSet;

impl Solution {
    pub fn is_happy(n: i32) -> bool {
        // Sum of the squares of the digits, one digit per iteration.
        fn step(mut m: i32) -> i32 {
            let mut total = 0;
            while m != 0 {
                let digit = m % 10;
                total += digit * digit;
                m /= 10;
            }
            total
        }
        // The digit-square map is deterministic, so iterating it must reach
        // 1 (a fixed point) or cycle; a revisit means it will never reach 1.
        let mut n = n;
        let mut seen: HashSet<i32> = HashSet::new();
        while n != 1 && !seen.contains(&n) {
            seen.insert(n);
            n = step(n);
        }
        n == 1
    }
}
