# Solutions — Count Pairs With XOR in a Range

## Bitwise trie, counting pairs with XOR at most K

The condition on a pair is a range on `nums[i] XOR nums[j]`, and ranges
split: the number of pairs with `low <= xor <= high` is `f(high) -
f(low - 1)`, where `f(K)` counts pairs whose xor is at most `K`. That
reduces the problem to one primitive — counting, for each element, how many
earlier elements xor with it into at most `K`.

A binary trie over the `B = 15` top bits of the values (every value is at
most `2 * 10⁴ < 2¹⁵`) answers that in a single walk. Descending next to
`K`, a 1 bit of `K` lets the whole subtree that keeps the xor prefix equal
so far be counted at once — whatever the remaining suffix is, it is
strictly smaller — and the walk continues down the mismatching child, while
a 0 bit only lets the matching child keep the prefix equal. The node the
walk lands on after all 15 levels holds exactly the values whose xor
equals `K`. Each element is counted against the trie before it is
inserted, so every unordered pair is counted exactly once, and both walks
are iterative.

The answer never exceeds `n(n-1)/2 < 2 * 10⁸`, so 32-bit integers carry
every value in every language (JavaScript's doubles are exact far below
`2⁵³`).

**Complexity:** `O(nB)` time, `O(nB)` space.
