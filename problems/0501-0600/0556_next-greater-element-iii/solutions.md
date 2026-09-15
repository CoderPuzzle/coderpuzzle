# Solutions — Next Greater Element III

## Next permutation of the digits

The answer, whenever it exists, is a rearrangement of `n`'s own digits, so
"smallest integer greater than `n`" means the immediate successor of `n`'s
digit string among all its rearrangements — the classic next-permutation step.
Scan from the right for the first digit that is smaller than its right
neighbor, the pivot; if none exists the digits are entirely non-increasing and
`n` is already the largest arrangement they can form, so the answer is -1
(`21`, `4321`, every single digit). Right of the pivot the digits are
non-increasing by construction, which makes the rest mechanical: the smallest
digit larger than the pivot is the rightmost one that beats it, so swap those
two, then reverse the suffix — still non-increasing after the swap, so the
reversal sorts it ascending, the smallest tail those digits can form. One swap
and one reversal land on `1243` from `1234` and `121` from `112`, and the
pivot swap only ever raises a digit, so a leading zero can never appear.

The successor can be one digit wider than `n` in effect: `n` reaches
`2³¹ - 1` with ten digits, and a rearrangement such as the successor of
`1999999999` — `9199999999` — runs past the 32-bit answer type even though
`n` itself fit. So the rebuilt value is assembled in a wider integer
(`long` / `long long` / `i64` in the fixed-width languages; Python's integers
and JavaScript's doubles — exact through `2⁵³` — already have the headroom)
and compared against `2³¹ - 1` before it is returned: `2147483476` lands
exactly on `2147483647` and is returned, while `2147483486`'s successor
`2147483648` and `1999999999`'s both overflow and answer -1.

**Complexity:** `O(d)` time, `O(d)` space, where `d <= 10` is the digit count.
