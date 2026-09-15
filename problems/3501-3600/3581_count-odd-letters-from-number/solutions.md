# Solutions — Count Odd Letters from Number

## Construct and Count Character Parity

The construction is purely mechanical: ten digit words cover every digit,
so the string `s` is just the concatenation of `words[digit]` for each
digit of `n` in order. With `s` in hand the odd-frequency question is a
single counting pass — a frequency map over its at most `60` characters
(ten digits, words of at most five letters) — and the answer is the number
of distinct letters whose count is odd.

Only parity matters, so the map can shrink to a 26-bit mask: each digit
word contributes the XOR of its letters' bits, and folding those masks
across the digits leaves a 1-bit exactly for the letters that appear an
odd number of times. The answer is then the mask's popcount — same result,
no string or counter materialized. Since `n ≤ 10⁹` has at most ten digits,
both formulations do work bounded by a small constant.

**Complexity:** `O(d · L)` time for `d ≤ 10` digits and `L ≤ 5` letters per
word, `O(1)` space.
