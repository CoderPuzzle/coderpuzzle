# Solutions — Count the Number of Substrings With Dominant Ones

## Fix the left endpoint and walk its next zeros

Fix each left endpoint `l`. A substring `s[l..r]` holding `j` zeros has `r - l + 1 - j` ones, so it is dominant exactly when `r >= l + j*j + j - 1`; the qualifying right endpoints for each fixed zero count therefore form one contiguous range. With `j = 0` the range runs from `l` up to just before the first zero at or after `l` — a substring with no zeros always qualifies, since its ones are at least `0 = 0²`. With `j >= 1` the range lies between consecutive zeros: from `max(zero[j], l + j*j + j - 1)` up to just before `zero[j+1]`, contributing nothing whenever that span empties.

The work stays bounded because a dominant substring cannot hold many zeros: its number of ones is at most `n`, so `j*j <= n` caps the walk at roughly `sqrt(n)` zero counts per left endpoint. Scanning the string once to record zero positions, then walking those positions for each `l`, gives `O(n * sqrt(n))` arithmetic on plain integer lists.

The count never exceeds `n * (n + 1) / 2 = 800020000` for `n = 4 * 10⁴` (an all-ones string), so it fits a signed 32-bit integer; fixed-width languages still accumulate in 64-bit integers as cheap headroom.

**Complexity:** `O(n√n)` time and `O(n)` space.
