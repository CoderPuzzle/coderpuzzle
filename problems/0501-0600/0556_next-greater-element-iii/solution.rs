impl Solution {
    pub fn next_greater_element(n: i32) -> i32 {
        // Rearranging n's digits, the answer is the immediate successor of
        // n's digit string among all rearrangements — the classic
        // next-permutation step. Scan from the right for the first digit
        // below its right neighbor (the pivot); none means the digits are
        // entirely non-increasing and n is already the largest arrangement.
        // The suffix past the pivot is non-increasing, so the smallest digit
        // larger than the pivot is the rightmost one that beats it: swap the
        // two, then reverse the (still non-increasing) suffix to sort it
        // ascending — the smallest tail those digits can form.
        let mut digits = n.to_string().into_bytes();
        let mut i = digits.len() as isize - 2;
        while i >= 0 && digits[i as usize] >= digits[i as usize + 1] {
            i -= 1;
        }
        if i < 0 {
            return -1;
        }
        let pivot = i as usize;
        let mut j = digits.len() - 1;
        while digits[j] <= digits[pivot] {
            j -= 1;
        }
        digits.swap(pivot, j);
        digits[pivot + 1..].reverse();
        // n reaches 2³¹ - 1 (ten digits) and the successor can run one digit
        // wider, so the rebuilt value — up to 9,999,999,999, past i32 — is
        // parsed into an i64 and checked against the 32-bit ceiling before it
        // is returned.
        let result: i64 = String::from_utf8(digits).unwrap().parse().unwrap();
        if result > i32::MAX as i64 {
            return -1;
        }
        result as i32
    }
}
