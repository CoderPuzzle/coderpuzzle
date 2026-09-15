# Solutions — XOR After Range Multiplication Queries I

## Direct simulation

A query `[l, r, k, v]` visits the indices `l`, `l + k`, `l + 2k`, ... up to
`r` — at most `(r - l) / k + 1 <= n` of them — and folds each into
`(value * v) mod 10⁹ + 7`. With both `n` and `q` capped at one thousand, the
worst case is `n * q = 10^6` such updates, so applying every query literally,
in order, over a scratch copy of `nums`, already sits far inside the limits.
The only bookkeeping the loop needs is the stride: advance by `k`, stop at
`r`, and never touch anything else.

The load-bearing detail is the width of the multiply. Before its first fold
an element can be as large as `10^9` and `v` as large as `10^5`, so the raw
product reaches about `10^14 ≈ 2^47`; after folding, values stay below
`10^9 + 7 < 2^30` and every later product stays under the same ceiling. That
overflows 32-bit integers on the very first step, so fixed-width languages
run the whole fold in a 64-bit working array — no cast back and forth per
element. JavaScript doubles are exact to `2^53`, which comfortably covers
`10^14`, and Python integers are unbounded.

The final XOR reduction runs over values that all sit below `2^30`, so it
fits in a single signed 32-bit word in every language. XOR the elements of
the finished array together and return that word; the caller's `nums` is
never modified.

**Complexity:** `O(n * q)` time, `O(n)` space.
