impl Solution {
    pub fn most_expensive_item(prime_one: i32, prime_two: i32) -> i32 {
        // Reachability sieve over the prices 0..primeOne*primeTwo: hint
        // 1 promises everything above that bound is buyable, so the
        // answer hides somewhere inside. A price is buyable iff
        // dropping one primeOne- or primeTwo-coin leaves a buyable
        // price — walk the sieve upward and remember the largest price
        // that never lights up. The product stays under 10^5, so the
        // sieve is small and the answer fits comfortably in a 32-bit
        // integer.
        let limit = (prime_one * prime_two) as usize;
        let mut reachable = vec![false; limit + 1];
        reachable[0] = true;
        let mut best = 0;
        for price in 1..=limit {
            if (price >= prime_one as usize && reachable[price - prime_one as usize])
                || (price >= prime_two as usize && reachable[price - prime_two as usize])
            {
                reachable[price] = true;
            } else {
                best = price as i32;
            }
        }
        best
    }
}
