# Solutions — Closest Fair Integer

## Digit-count scan with a constructed jump

A fair integer has equally many even and odd digits, so its digit count is
always even: an odd digit count can never split evenly. The key observation
is that the answer is either close to `n` in the same digit count, or it is
the smallest fair number with the next even digit count. When `n` has an
even number of digits, scanning upward finds the answer quickly — the gaps
between consecutive fair numbers are tiny, because incrementing flips the
parity of the digits frequently. When `n` has an odd digit count, no fair
integer with that many digits exists at all, so the scan would be wasted.

The code checks the digit count first. If it is odd, it jumps straight to
the smallest fair number with one more digit: a leading `1`, `(d+1)/2`
zeros, then `(d+1)/2 - 1` ones. That pattern is fair by construction (the
`1`s and `0`s balance) and is minimal, because any fair number of that
length must start with a nonzero odd digit, and putting the remaining odd
digits as far right as possible keeps it smallest. For an even digit count
the method scans upward from `n` while the digit count is unchanged; the
first fair value found is returned. If the scan reaches the end of the
digit count without a hit, the answer must again be the smallest fair
number with the next even digit count — now two digits up — which the same
construction produces.

Each fair check inspects the decimal digits of the candidate, and the scan
runs at most a few thousand steps for any `n <= 10⁹` (the largest gap is
when every digit is a 9), so the whole method is comfortably fast. The
constructed jump handles `n` near the top of a digit range, where no
same-digit answer exists.

**Complexity:** `O(d · 10^(d/2))` time, `O(1)` space, where `d` is the
number of digits of `n` (at most 10 for the given constraints).
