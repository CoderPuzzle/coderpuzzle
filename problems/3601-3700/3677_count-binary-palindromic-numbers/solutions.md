# Solutions — Count Binary Palindromic Numbers

## Prefix counting by bit length

Checking all `k` up to 10¹⁵ one by one is hopeless, so group integers by the
length `L` of their binary representation instead. A binary palindrome is
completely determined by its first `ceil(L / 2)` bits — its root — because
the remaining bits mirror them, sharing the middle bit when `L` is odd. A
leading bit is always `1`, so the roots of length-`L` palindromes are exactly
the integers from `2^(ceil(L / 2) - 1)` upward, meaning each length carries
precisely `2^floor((L - 1) / 2)` palindromes. Summing that quantity over
every length shorter than `n`'s, plus one for zero itself, accounts for all
values with fewer bits than `n` in a loop of at most fifty additions.

Within `n`'s own length, mirroring maps roots to palindromes monotonically,
so the two ascend together: every root below `n`'s root lands entirely under
`n`, contributing `root - 2^(h - 1)` more for `h = ceil(L / 2)`. One
candidate remains — the palindrome formed by mirroring `n`'s own root. Build
it by shifting the root left by `floor(L / 2)` bits and appending the
reversed low `floor(L / 2)` bits (dropping the root's last bit before
reversing when `L` is odd), compare against `n`, and count it only when it
does not exceed `n`. Every `k` in `[0, n]` has now been counted exactly once,
and no other value qualifies.

![For n = 9 = "1001" each binary palindrome is drawn with its accented root
and shaded mirrored half, grouped by bit length: zero, then 1 + 1 + 2 across
lengths 1-3, and at length 4 only the root 10 mirrors to 9 ≤ 9 — six in all.](figures/solution-prefix-counting-bit-lengths.svg)

**Complexity:** `O(log n)` time, `O(1)` space.
