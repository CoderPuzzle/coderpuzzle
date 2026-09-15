# Solutions — Maximum Number That Sum of the Prices Is Less Than or Equal to K

## Binary search with closed-form bit counting

The accumulated price of `num` — the sum of prices of 1 through `num` — is nondecreasing in `num`, so "the greatest cheap number" is the largest `n` with `price_sum(n) <= k`. Binary search for it: start the upper bound at 10^16 and double it until its accumulated price first exceeds `k`, then run a standard integer binary search keeping `lo` cheap and `hi` expensive, and return `lo`.

`price_sum(n)` counts set bits instead of iterating numbers. The accumulated price sums, over each watched position `p = x, 2x, 3x, ...`, how many numbers in `[1..n]` have bit `p-1` set. Numbers with bit `b` set come in blocks of `2^b` set and `2^b` clear, so the count is `((n+1) // 2^(b+1)) * 2^b + max(0, (n+1) mod 2^(b+1) - 2^b)`, and positions with `2^(p-1) > n` contribute nothing and stop the loop. Each evaluation touches at most about 64 positions regardless of `n`.

Because `k <= 10^15`, the answer sits comfortably below 2^60, so both the doubling phase and the binary search run a few dozen iterations, each doing constant-ish arithmetic. With `K` denoting the doubled upper bound, the total is a few hundred scalar operations; there is no data structure beyond a handful of temporaries.

**Complexity:** `O(log^2 K)` time, `O(1)` space.
