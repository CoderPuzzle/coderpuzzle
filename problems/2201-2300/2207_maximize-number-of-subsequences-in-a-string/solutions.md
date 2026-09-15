# Solutions — Maximize Number of Subsequences in a String

## Insert at an extremity, charge pairs in one sweep

The one free character is worth the most at an edge: an inserted `pattern[0]`
at the very front of `text` can pair with every `pattern[1]` that follows it,
and an inserted `pattern[1]` at the very end can pair with every `pattern[0]`
that precedes it. Any interior position sees only a subset of one of those
two sides, so the answer is the number of `pattern` subsequences already in
`text` plus the larger of the two letter counts.

One left-to-right sweep gathers all three numbers. It keeps a running count
of `pattern[0]`'s seen so far; each time it meets a `pattern[1]` it charges
the running count as newly finished pairs, which accumulates exactly the
subsequence total. When the two pattern letters are equal the same sweep
yields `k * (k - 1) / 2` pairs and a gain of `k` — precisely what one extra
copy of that letter adds — so the equal-letter case needs no special
handling. With up to `10⁵` letters the pair total reaches `2.5 × 10⁹`, past
the 32-bit range, so the accumulators and the return use 64-bit integers;
in JavaScript the bound `(n / 2)² + n < 2.5 × 10⁹` stays far below `2⁵³`,
so plain numbers remain exact.

On `"abdcdbc"` with `pattern = "ac"` there are already 2 `ac` subsequences
against 2 `a`'s and 2 `c`'s; prepending an `a` adds the 2 more that reach 4.

**Complexity:** `O(n)` time, `O(1)` extra space.
