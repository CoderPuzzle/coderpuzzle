class Solution {

    public int guessNumber(Guess guess, int n) {
        // The oracle orders [1, n] around the hidden pick — every number
        // above it answers -1, every number below it 1 — so bisect for the
        // pick itself.
        int lo = 1;
        int hi = n;
        while (true) {
            // Overflow-safe midpoint: lo + (hi - lo) / 2 never exceeds hi,
            // where (lo + hi) / 2 overflows int on the full
            // [1, 2147483647] range.
            int mid = lo + (hi - lo) / 2;
            int result = guess.guess(mid);
            if (result == 0) {
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
