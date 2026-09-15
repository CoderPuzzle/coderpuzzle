impl Solution {
    pub fn min_operations(mut n: i32) -> i32 {
        // Reitwiesner's algorithm builds the non-adjacent form (NAF) of n:
        // the minimum-weight signed binary representation. Every operation
        // contributes one +/- 2^k term, so the answer is exactly the count
        // of nonzero digits in that representation.
        let mut ops = 0;
        while n > 0 {
            if n & 1 != 0 {
                // Lowest two bits decide the sign: ...01 -> subtract 1,
                // ...11 -> add 1 and let the carry collapse the run.
                let digit = 2 - (n & 3);
                ops += 1;
                n -= digit;
            } else {
                n >>= 1;
            }
        }
        ops
    }
}
