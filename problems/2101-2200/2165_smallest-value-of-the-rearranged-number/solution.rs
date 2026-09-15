impl Solution {
    pub fn smallest_number(num: i64) -> i64 {
        // The sign only picks the sort direction: a negative result is
        // smallest when its magnitude is largest (digits descending), a
        // positive one when the smallest nonzero digit leads and the
        // zeroes follow it instead of preceding it. i64 holds every
        // rebuilt value (|num| <= 10^15) with room to spare.
        if num == 0 {
            return 0;
        }
        let negative = num < 0;
        let mut digits: Vec<u8> = num.unsigned_abs().to_string().into_bytes();
        digits.sort_unstable();
        if negative {
            digits.reverse();
        } else {
            let index = digits.iter().position(|&digit| digit != b'0').expect("num != 0");
            digits.swap(0, index);
        }
        let value: i64 = digits
            .into_iter()
            .fold(0, |accumulator, digit| accumulator * 10 + i64::from(digit - b'0'));
        if negative {
            -value
        } else {
            value
        }
    }
}
