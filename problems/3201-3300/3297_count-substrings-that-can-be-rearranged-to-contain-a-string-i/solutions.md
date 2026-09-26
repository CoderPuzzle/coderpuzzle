# Solutions — Count Substrings That Can Be Rearranged to Contain a String I

A substring is valid exactly when it contains at least as many copies of
every letter as `word2` does, and this covering property is monotone: once
a window covers `word2`, every extension of that window still does. So for
each left endpoint there is a single threshold right end — the first index
where the window starts to cover — and every choice of right end from that
threshold through the last index yields a valid substring.

## Minimal covering window per left endpoint with a two-pointer sweep

Slide a single right end across `word1` while maintaining the frequency
counts of the current window. After each extension, shrink from the left
for as long as the window still covers `word2`'s counts; when shrinking
stops, the left character is load-bearing, `[left..right]` is the minimal
covering window ending at `right`, and every start in `[0..left]` yields a
valid window ending there, contributing `left + 1` substrings. Each index
enters and leaves the window once, giving linear time overall.

![On word1 = "bcca" with word2 = "abc", the window counts reach need a1
b1 c1 first at right = 3, the left 'b' fails the shrink test (b0 < b1),
and the end reports left + 1 = 1 valid substring — the expected output.](figures/solution-shrink-stops-load-bearing.svg)

The count accumulates in a 64-bit integer: with `n = 10⁵` identical
letters and a one-letter `word2`, the answer is the triangular number
`n * (n + 1) / 2 = 5000050000`, which overflows a signed 32-bit integer.
In JavaScript the same bound stays far inside the exact-integer range of
IEEE doubles (below 2⁵³), so ordinary numbers are exact there.

**Complexity:** `O(n)` time (26 letters constant factor; each pointer
moves monotonically), `O(1)` space (fixed 26-entry count arrays).
