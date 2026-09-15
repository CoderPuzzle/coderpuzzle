impl Solution {
    pub fn divisor_substrings(num: i32, k: i32) -> i32 {
        // Slide a length-k window over the digit string, keeping the window's
        // integer value incrementally: drop the leading digit, shift, add the
        // new trailing digit. A zero window never divides num.
        let digits = num.to_string();
        let k = k as usize;
        let mut power = 1;
        for _ in 0..k - 1 {
            power *= 10;
        }
        let mut window: i32 = digits[..k].parse().unwrap();
        let mut count = 0;
        if window != 0 && num % window == 0 {
            count += 1;
        }
        for (i, &b) in digits.as_bytes().iter().enumerate().skip(k) {
            window = (window % power) * 10 + (b - b'0') as i32;
            if window != 0 && num % window == 0 {
                count += 1;
            }
        }
        count
    }
}
