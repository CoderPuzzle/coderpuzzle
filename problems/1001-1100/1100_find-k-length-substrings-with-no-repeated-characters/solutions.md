# Solutions — Find K-Length Substrings With No Repeated Characters

## Sliding window with a distinct-character count

Adjacent substrings of length `k` overlap in all but one character, so
recounting each window from scratch throws away almost all of its work.
A sliding window keeps one frequency table for the current window and
updates it incrementally: each step admits the new rightmost character
and, once the window has grown past length `k`, retires the character
falling off the left end.

Alongside the frequencies the window tracks `distinct`, the number of
characters whose count is nonzero. A window of length `k` has no
repeated characters exactly when all `k` positions hold different
characters, that is when `distinct == k`. Whenever the window has
reached full length and that equality holds, one more substring is
counted. `k` larger than the whole string never reaches a full window
and naturally returns zero.

Each character enters and leaves the window at most once, so the scan
is linear.

**Complexity:** `O(n)` time, `O(1)` space — the frequency table is
bounded by the alphabet size.
