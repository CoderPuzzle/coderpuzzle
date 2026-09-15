impl Solution {
    pub fn total_waviness(num1: i32, num2: i32) -> i32 {
        // Waviness of one number: an interior digit is a peak when it is
        // strictly greater than both neighbors and a valley when it is
        // strictly less than both; equal neighbors never count.
        fn waviness(mut n: i32) -> i32 {
            if n < 100 {
                return 0;
            }
            let mut prev = n % 10; // least significant digit so far
            n /= 10;
            let mut cur = n % 10;
            n /= 10;
            let mut w = 0;
            loop {
                let nxt = n % 10;
                if (cur > prev && cur > nxt) || (cur < prev && cur < nxt) {
                    w += 1;
                }
                prev = cur;
                cur = nxt;
                n /= 10;
                if n == 0 {
                    break;
                }
            }
            w
        }

        // The range holds at most 10^5 numbers of at most 6 digits each,
        // so the plain enumeration the hint suggests is plenty.
        (num1..=num2).map(waviness).sum()
    }
}
