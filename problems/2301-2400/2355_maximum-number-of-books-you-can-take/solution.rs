impl Solution {
    pub fn maximum_books(books: Vec<i32>) -> i64 {
        let n = books.len();
        // dp[i] = best total of a strictly increasing chain ending at i;
        // the rightmost shelf gives everything, so each take is books[i]-(i-x).
        let mut dp = vec![0i64; n];
        // Monotonic stack of barrier candidates (nearest j where the chain dies).
        let mut stack: Vec<usize> = Vec::with_capacity(n);
        let mut best: i64 = 0;
        for i in 0..n {
            let bi = books[i] as i64;
            // Pop shelves x that still fit the demand books[i] - (i - x):
            // any future chain stopping past them stops at or before i.
            while let Some(&t) = stack.last() {
                if (books[t] as i64) >= bi - (i as i64 - t as i64) {
                    stack.pop();
                } else {
                    break;
                }
            }
            // Remaining top is the nearest barrier j; the chain covers j+1..i.
            let j: i64 = match stack.last() {
                Some(&t) => t as i64,
                None => -1,
            };
            let length = if j >= 0 {
                i as i64 - j
            } else {
                // No barrier: the chain runs to shelf 0, but a shelf cannot
                // demand fewer than one book, so it caps at min(i, books[i])+1.
                (i as i64).min(bi) + 1 // stop where the sequence would go negative
            };
            // Arithmetic sum of the run, spliced with dp[j]: shelf j tops out
            // strictly below the demanded value, so the two chains join validly.
            let s = length * bi - length * (length - 1) / 2;
            dp[i] = s + if j >= 0 { dp[j as usize] } else { 0 };
            if dp[i] > best {
                best = dp[i];
            }
            stack.push(i);
        }
        best
    }
}
