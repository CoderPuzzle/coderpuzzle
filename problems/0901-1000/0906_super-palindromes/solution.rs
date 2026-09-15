impl Solution {
    pub fn superpalindromes_in_range(left: String, right: String) -> i32 {
        // The square root of a super-palindrome is itself a palindrome, so
        // the candidates come from the roots, never from the values: build
        // every palindromic root of up to nine digits by mirroring a half,
        // square it, and keep the squares that are palindromes inside the
        // range. Nine digits of root suffice because right is below 10^18
        // and the root of anything below 10^18 is below 10^9.
        let low: i64 = left.parse().expect("left is a decimal integer");
        let high: i64 = right.parse().expect("right is a decimal integer");
        let mut count = 0;
        for length in 1..=9 {
            let half_length = (length + 1) / 2;
            for half in pow10(half_length - 1)..pow10(half_length) {
                let digits = half.to_string();
                let mirrored: String = digits[..length - half_length].chars().rev().collect();
                let root: i64 = format!("{digits}{mirrored}")
                    .parse()
                    .expect("root is a decimal integer");
                // Every square fits an i64: roots stay below 10^9, so the
                // widest product is 999,999,999^2 < 10^18, an order of
                // magnitude inside i64's 9.22 * 10^18 ceiling.
                let square = root * root;
                // Roots ascend across widths and halves alike, so squares
                // do too: the first square above `high` ends the scan.
                if square > high {
                    return count;
                }
                if square >= low && is_palindrome(square) {
                    count += 1;
                }
            }
        }
        count
    }
}

fn pow10(exponent: usize) -> i64 {
    10i64.pow(exponent as u32)
}

// A value is a palindrome when its digits read the same both ways.
fn is_palindrome(value: i64) -> bool {
    let digits = value.to_string();
    digits == digits.chars().rev().collect::<String>()
}
