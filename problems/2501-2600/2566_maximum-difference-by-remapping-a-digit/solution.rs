impl Solution {
    // A remap rewrites every copy of one chosen digit, and the notes
    // allow leading zeroes plus mapping a digit to itself. That forces
    // the two greedy plays: promote every copy of the first digit that
    // is not already 9 up to 9 (a no-op when there is none), and demote
    // every copy of the leading digit down to 0. Both rewrites only
    // ever touch leftmost-first repeats, so any other choice keeps some
    // earlier position lower or higher than necessary.
    pub fn min_max_difference(num: i32) -> i32 {
        let bytes = num.to_string().into_bytes();
        let mut big = bytes.clone();
        for &ch in &bytes {
            if ch != b'9' {
                for c in big.iter_mut() {
                    if *c == ch {
                        *c = b'9';
                    }
                }
                break;
            }
        }
        let mut small = bytes.clone();
        let lead = bytes[0];
        for c in small.iter_mut() {
            if *c == lead {
                *c = b'0';
            }
        }
        let parse = |v: &[u8]| -> i32 { v.iter().fold(0i32, |acc, &c| acc * 10 + (c - b'0') as i32) };
        parse(&big) - parse(&small)
    }
}
