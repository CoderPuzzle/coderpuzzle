# Solutions — Merge Operations to Turn Array Into a Palindrome

## Two-Pointer Block Sums

Merging never changes the total sum, and a merged palindrome is a
partition of the array into consecutive blocks whose block sums read the
same forwards and backwards; each merge shrinks the element count by one,
so a partition into `m` blocks costs exactly `n - m` operations.
Minimizing merges is therefore maximizing the number of palindrome
blocks. Matching block sums from the two ends is also forced: the first
palindrome block starts at index 0, and its sum must equal the last
block's, so the outermost blocks are fixed by whichever prefix and suffix
sums meet.

That yields a greedy sweep with two running sums. `left` holds the sum of
the current front block, `right` the back block's; whenever they are
equal both blocks retire and the scan continues strictly inside them.
While they differ, the smaller side absorbs its next adjacent element —
one operation — because a larger opposite block can only be matched by
extending the smaller side, so no cheaper arrangement exists. Each step
either retires both ends or spends exactly one merge on the deficit side,
which makes the greedy count provably minimal (hint 1's question — what it
costs to equalize the outer pair — repeats identically on every inner
layer).

Block sums never exceed `10⁵ · 10⁶ = 10¹¹`, beyond 32-bit range, so all
four compiled languages carry them in 64-bit integers (`long long`,
`long`, `int64`, `i64`); JavaScript's Number stays exact since `10¹¹ <
2⁵³`. The pointers cross after at most `2n` steps, each `O(1)`.

**Complexity:** `O(n)` time, `O(1)` space.
