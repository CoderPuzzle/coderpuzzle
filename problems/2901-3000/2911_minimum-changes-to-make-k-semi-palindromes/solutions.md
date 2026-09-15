# Solutions — Minimum Changes to Make K Semi-palindromes

Two subproblems stack here: what a single substring costs, and how to split
the whole string. For the first, a substring can only become a
semi-palindrome through one of its proper divisors `d`, and under a fixed `d`
each of the `d` pattern groups must itself become a palindrome — which costs
exactly one change per mismatched mirror pair inside the group. Trying every
proper divisor and keeping the cheapest total gives the conversion cost of
every substring once, up front.

## Cost table plus partition DP

Precompute `divisors[L]` for every length `L` with a sieve-style pass. Then
fill `cost[i][j]`: for each proper divisor `d` of `L = j - i + 1`, walk each
of the `d` groups with two pointers from both ends, counting positions whose
mirror partner holds a different letter, and keep the minimum over `d`. A
length-1 substring has no valid divisor, so it can never be a
semi-palindrome — consistent with the constraint `k <= s.length / 2`, which
guarantees every part of every considered partition has length at least 2.

With the table in hand, `ways[i]` holds the minimum number of changes that
splits the suffix `s[i..]` into the current number of parts `p`. One part
reads straight off the table; for `p` parts, choose the end `x` of the first
part — at least two characters, and leaving at least `2 * (p - 1)`
characters behind — and add the `(p - 1)`-part cost of the rest. Iterating
`p` from 2 to `k` over rolling one-dimensional arrays answers
`ways[0]` for `p = k`. The table costs `O(n² · d(n) · n)` with `d(n)` the
largest number of divisors any length up to `n` has, and the DP adds
`O(n² · k)`; the table dominates and both fit easily for `n <= 200`.

**Complexity:** `O(n³)` time (bounded by `O(n² · d(n) · n)` with `d(n) < n`),
`O(n²)` space.
