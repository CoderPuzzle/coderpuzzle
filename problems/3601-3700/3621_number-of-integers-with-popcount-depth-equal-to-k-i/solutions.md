# Solutions — Number of Integers With Popcount-Depth Equal to K I

## Digit Dynamic Programming by Popcount Target

The depth chain of any `x ≥ 2` is one step longer than the depth chain of
its own popcount: `x → popcount(x) → …`, so grouping the answer by
popcount reduces the whole range to a small table. Precompute `depth[j]`
for the value `j` itself by iterating `popcount` down to 1 (`depth[1] =
0`); since `n ≤ 10¹⁵ < 2⁵⁰`, every popcount value `j` is at most 50, so a
64-entry table covers everything. A number `x ≥ 2` then has depth
`1 + depth[popcount(x)]`, while `x = 1` is the lone depth-0 integer.

Counting integers in `[1, n]` by set-bit count is a digit DP over the
binary digits of `n`. `free[x]` tracks how many already-smaller prefixes
carry `x` ones; walking `n`'s bits from the top, each free prefix forks
into its 0- and 1-extensions, and whenever `n`'s current bit is 1, the
tight prefix branches loose by placing a 0 under it. After the last bit,
the tight walk contributes `n` itself. Two subtractions clean the count:
the all-zero string drops out of `x = 0`, and `x = 1` is removed from the
popcount-1 bucket because its depth is 0, not 1. The answer sums
`counts[j]` over every `j` with `depth[j] = k − 1`, plus 1 for `x = 1`
when `k = 0`. For `k = 5` the sum is empty for every valid `n`: a
popcount value of at most 50 can never itself have depth 4.

Every DP entry counts a subset of `[1, n]`, so all intermediates are at
most `n ≤ 10¹⁵ < 2⁵³` — JavaScript Numbers stay exact, and the
fixed-width languages hold everything in 64-bit integers.

**Complexity:** `O(log n)` time (a 50 × 64 DP sweep), `O(1)` space.
