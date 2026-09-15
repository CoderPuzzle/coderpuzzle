impl Solution {
    pub fn maximum_swap(num: i32) -> i32 {
        // One swap can raise exactly one position, and a position is worth
        // more the further left it sits, so the best swap moves the largest
        // available digit as far left as it can go. Record the last index of
        // each digit value, then scan left to right: at the first position
        // where a larger digit occurs later, swap in the largest such digit,
        // taken from its LAST occurrence — the tiebreak pushes the displaced
        // smaller digit as far right as it can go. No qualifying position
        // means num is already maximal and is returned unchanged.
        let mut digits = num.to_string().into_bytes();
        let mut last = [0usize; 10];
        for (i, &d) in digits.iter().enumerate() {
            last[(d - b'0') as usize] = i;
        }
        for i in 0..digits.len() {
            let current = (digits[i] - b'0') as usize;
            for value in ((current + 1)..=9).rev() {
                if last[value] > i {
                    digits.swap(i, last[value]);
                    return String::from_utf8(digits).unwrap().parse().unwrap();
                }
            }
        }
        num
    }
}
