# Solutions — Minimum Number of Operations to Make Elements in Array Distinct

Each operation chops exactly three elements off the front (or everything that
remains), so after `k` operations the array is the suffix `nums[3k:]`. The
answer is the smallest `k` for which that suffix is duplicate-free.

## Scan for the shortest duplicate-free suffix

Distinctness of suffixes is monotone: any suffix of a duplicate-free suffix
is itself duplicate-free, so the set of valid keep-points is an upward-closed
range `[j, n]`, where `j` is the first index from which the suffix is
distinct. A right-to-left walk with a seen-set finds `j` directly — the walk
collects new values until it meets one that already occurred later, and `j`
is the position just after that repeat. Every duplicate later in the array is
irrelevant, because the operation only ever removes from the front.

Since `k` operations keep `nums[3k:]`, the suffix starting at `j` survives
exactly when `3k >= j`, so the minimum is `ceil(j / 3)`. With `n <= 100` even
simulating the removals would do, but the suffix scan settles the count in a
single pass without touching the front of the array at all.

**Complexity:** `O(n)` time, `O(n)` space, where `n` is the length of `nums`.
