class Solution:
    def guessNumber(self, guess: Guess, n: int) -> int:
        # The oracle orders [1, n] around the hidden pick — every number
        # above it answers -1, every number below it 1 — so bisect for the
        # pick itself.
        lo, hi = 1, n
        while True:
            # Overflow-safe midpoint: lo + (hi - lo) // 2 never exceeds hi,
            # where (lo + hi) // 2 can overflow a fixed-width integer on the
            # full [1, 2**31 - 1] range.
            mid = lo + (hi - lo) // 2
            result = guess.guess(mid)
            if result == 0:
                return mid
            # -1: the guess sits above the pick — search lower; 1: below —
            # search higher.
            if result < 0:
                hi = mid - 1
            else:
                lo = mid + 1
