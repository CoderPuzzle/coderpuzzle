# Solutions — Find the Occurrence of First Almost Equal Substring

## Forward and backward match lengths around each window

A window `s[i..i+m-1]` is almost equal to `pattern` exactly when its
mismatch count is at most one, which splits cleanly into a prefix part and a
suffix part: if the first `f` characters already agree with the pattern's
prefix and, from the window's right end, the last `b` characters agree with
the pattern's suffix, then every mismatch must sit in the gap between those
two runs. When the runs overlap (`f + b >= m`) the window matches exactly;
when they leave a gap of one (`f + b == m - 1`) the single position between
them is the only possible mismatch, and changing it makes the window equal.
So the test is just `f == m` or `f + b >= m - 1` — at most one character is
ever unaccounted for, and it can always absorb the change.

Both run-length tables come from Z-functions. Running the Z-function over
`pattern + separator + s` gives, for every start `i`, the forward length
`f = min(z[m + 1 + i], m)` — how many characters of `pattern` match `s`
starting at `i`. Running it over the reversals gives the backward lengths:
a prefix of the reversed pattern matching the reversed string at offset
`t = n - 1 - (i + m - 1)` is exactly a common suffix of `pattern` and the
window ending at `i + m - 1`, so `b = min(z'[m + 1 + t], m)`. The scan then
walks candidate starts in increasing order and returns the first index that
passes the test; since every start admits a window (`m < n`), the answer is
that index or -1.

The separator never occurs in either string (letters only, `-1` as an
integer code), so no Z-value bleeds across it, and each Z-function pass is
linear with amortized-constant work per position: the right frontier moves
forward only. All quantities — indices up to `10⁵`, match lengths up to
`10⁵` — fit comfortably in 32-bit integers.

**Complexity:** `O(n + m)` time, `O(n + m)` space.
