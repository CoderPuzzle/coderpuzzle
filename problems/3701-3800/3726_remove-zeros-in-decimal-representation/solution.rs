impl Solution {
    pub fn remove_zeros(n: i64) -> i64 {
        // Rebuild the answer while peeling digits off n's least significant
        // end: place tracks the slot the next surviving digit occupies, and
        // zero digits fall through without touching result or place. i64
        // keeps n (up to 10^15) and the packed result in range.
        let mut m = n;
        let mut result: i64 = 0;
        let mut place: i64 = 1;
        while m > 0 {
            let digit = m % 10;
            if digit != 0 {
                result += digit * place;
                place *= 10;
            }
            m /= 10;
        }
        result
    }
}
