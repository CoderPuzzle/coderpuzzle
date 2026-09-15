# Solutions — Find Palindrome With Fixed Length

## Build the half, then mirror it

A palindrome of a fixed length is completely determined by its first half:
the second half is that prefix read backwards, with the middle digit shared
when the length is odd. The palindromes of length `intLength` therefore
correspond one-to-one to the half-numbers from `10^(h-1)` through
`10^h - 1`, where `h = ceil(intLength/2)` — there are exactly
`9 * 10^(h-1)` of them. So the kth palindrome needs no search at all: take
half-number number `k` (`10^(h-1) + k - 1`) and mirror it.

Each query is answered independently in one string construction: build the
prefix as text, append its first `intLength/2` characters reversed, and
parse the result. A query larger than the supply `9 * 10^(h-1)` has no
palindrome and yields `-1`. The largest answer is the 15-digit all-nines
palindrome, about `9.99 * 10¹⁴`, so fixed-width languages return 64-bit
integers; JavaScript's plain numbers stay exact because every value involved
is far below the `2⁵³` exact-integer ceiling (the count itself never exceeds
`9 * 10⁷`, since `queries[i] <= 10⁹` but any query beyond the supply maps
straight to `-1`).

**Complexity:** `O(q · intLength)` time for `q` queries, `O(intLength)`
space per construction.
