impl Solution {
    pub fn number_count(a: i32, b: i32) -> i32 {
        fn has_unique_digits(mut value: i32) -> bool {
            let mut seen = 0_u32;
            while value > 0 {
                let bit = 1_u32 << (value % 10);
                if seen & bit != 0 {
                    return false;
                }
                seen |= bit;
                value /= 10;
            }
            true
        }
        (a..=b).filter(|&value| has_unique_digits(value)).count() as i32
    }
}
