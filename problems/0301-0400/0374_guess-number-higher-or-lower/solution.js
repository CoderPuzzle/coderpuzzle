class Solution {
    guessNumber(guess, n) {
        // The oracle orders [1, n] around the hidden pick — every number
        // above it answers -1, every number below it 1 — so bisect for the
        // pick itself.
        let lo = 1;
        let hi = n;
        while (true) {
            // Overflow-safe midpoint: lo + Math.floor((hi - lo) / 2) never
            // exceeds hi — the same difference form that avoids overflow in
            // the fixed-width languages.
            const mid = lo + Math.floor((hi - lo) / 2);
            const result = guess.guess(mid);
            if (result === 0) {
                return mid;
            }
            // -1: the guess sits above the pick — search lower; 1: below —
            // search higher.
            if (result < 0) {
                hi = mid - 1;
            } else {
                lo = mid + 1;
            }
        }
    }
}
