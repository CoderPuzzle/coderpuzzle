# Solutions — Number of Ways to Split a String

## Counting ones and locating the two cut windows

Splitting `s` into three parts with equal counts of `'1'` is only
possible when the total number of ones `total` is a multiple of 3;
otherwise the answer is `0`. When `total` is `0`, every character is
`'0'`, so any pair of the `n - 1` gaps between characters works as the
two cut points, giving `C(n - 1, 2) = (n - 1)(n - 2) / 2` ways (computed
with 64-bit accumulation before reducing modulo `10⁹ + 7`, since `n` can
reach `10⁵`).

Otherwise let `k = total / 3` and record the 0-indexed positions of
every `'1'` in `s`. The first cut (ending `s1`) is valid exactly when
`s1` contains the first `k` ones and none of the `(k + 1)`-th; that
window spans from just after the `k`-th one's position to (and
including) the `(k + 1)`-th one's position, so its width — the number of
zeros immediately following the `k`-th one, plus one — is the count of
valid first-cut placements. The second cut (ending `s1 + s2`) is valid
under the same logic around the `2k`-th and `(2k + 1)`-th ones. Each
run of `'0'` characters straddling a cut boundary contributes exactly
that many extra valid positions, which is why a string like `"10101"`
(no zero runs at the boundaries) has only one placement per cut while a
string with zeros between the relevant ones has several.

The total number of valid splits is the product of the two windows'
sizes, taken modulo `10⁹ + 7`: any first-cut placement can be freely
paired with any second-cut placement, since the two windows never
overlap (the first window ends at or before the `k`-th one and the
second begins at or after the `(2k - 1)`-th one, which for `k >= 1` is
never earlier).

**Complexity:** `O(n)` time, `O(1)` extra space.
