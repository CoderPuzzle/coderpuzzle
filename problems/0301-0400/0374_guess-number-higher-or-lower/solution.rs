impl Solution {
    pub fn guess_number(guess: &mut Guess, n: i32) -> i32 {
        // The oracle orders [1, n] around the hidden pick — every number
        // above it answers -1, every number below it 1 — so bisect for the
        // pick itself.
        let mut lo: i32 = 1;
        let mut hi: i32 = n;
        loop {
            // Overflow-safe midpoint: lo + (hi - lo) / 2 never exceeds hi,
            // where (lo + hi) / 2 overflows i32 on the full
            // [1, 2147483647] range.
            let mid = lo + (hi - lo) / 2;
            let result = guess.guess(mid);
            if result == 0 {
                return mid;
            }
            // -1: the guess sits above the pick — search lower; 1: below —
            // search higher.
            if result < 0 {
                hi = mid - 1;
            } else {
                lo = mid + 1;
            }
        }
    }
}
