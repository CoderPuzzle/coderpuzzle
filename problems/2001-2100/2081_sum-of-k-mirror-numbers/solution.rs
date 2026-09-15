impl Solution {
    pub fn k_mirror(k: i32, n: i32) -> i64 {
        fn power_of_ten(mut exponent: i32) -> i64 {
            let mut value = 1;
            while exponent > 0 {
                value *= 10;
                exponent -= 1;
            }
            value
        }

        fn make_palindrome(prefix: i64, odd_length: bool) -> i64 {
            let mut palindrome = prefix;
            let mut remaining = if odd_length { prefix / 10 } else { prefix };
            while remaining > 0 {
                palindrome = palindrome * 10 + remaining % 10;
                remaining /= 10;
            }
            palindrome
        }

        fn is_base_palindrome(mut value: i64, base: i64) -> bool {
            let original = value;
            let mut reversed = 0;
            while value > 0 {
                reversed = reversed * base + value % base;
                value /= base;
            }
            reversed == original
        }

        let mut total = 0;
        let mut found = 0;
        let mut length = 1;
        while found < n {
            let half_length = (length + 1) / 2;
            let start = power_of_ten(half_length - 1);
            let end = power_of_ten(half_length);
            for prefix in start..end {
                let candidate = make_palindrome(prefix, length % 2 == 1);
                if is_base_palindrome(candidate, k as i64) {
                    total += candidate;
                    found += 1;
                    if found == n {
                        return total;
                    }
                }
            }
            length += 1;
        }
        total
    }
}
