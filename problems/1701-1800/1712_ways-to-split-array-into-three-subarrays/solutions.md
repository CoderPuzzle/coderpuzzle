# Solutions — Ways to Split Array Into Three Subarrays

Both solutions read the two balance conditions off one prefix-sum table: with
the first cut after index `i - 1` and the second after `j - 1`, a cut pair is
legal exactly when `2 * prefix[i] <= prefix[j] <= (total + prefix[i]) / 2`.
Non-negative elements keep the table non-decreasing, so each `i` owns one
contiguous stretch of legal `j`. The binary-search variant marks the
stretch's ends with two bisections per cut; the two-pointer sweep notices
that both ends only ever move right as `i` advances, and amortizes them into
a single forward pass.

## Prefix Sums with Binary Search

Fix the first cut after index `i - 1`, so the left block sums to `prefix[i]`, and let the second cut fall after index `j - 1` with `i < j < n`. The two ordering conditions translate cleanly onto the prefix array: `left <= mid` becomes `prefix[j] >= 2 * prefix[i]`, and `mid <= right` becomes `2 * prefix[j] <= total + prefix[i]`, i.e. `prefix[j] <= (total + prefix[i]) / 2`. Since all elements are non-negative, `prefix` is non-decreasing, so for each fixed `i` the valid `j` form one contiguous range that two binary searches can delimit.

For each `i` from 1 to `n - 2`, `lo = bisect_left(prefix, 2 * left, i + 1, n)` finds the first prefix value that is at least twice the left sum; if none exists within the open range there is no valid split. `hi = bisect_right(prefix, (total + left) // 2, lo, n)` finds one past the last prefix value satisfying the upper bound. The integer floor is safe because `2 * prefix[j] <= total + left` over the integers is exactly `prefix[j] <= floor((total + left) / 2)`. Each split is counted once by `hi - lo`, and the running total is reduced modulo 10^9 + 7 as it accumulates.

Counting `j` strictly between `i` and `n` keeps all three blocks non-empty: the search window `(i + 1, n)` excludes the prefix entries equal to `prefix[i]` and `prefix[n]`. Arrays whose prefix sums grow too fast (like `[3, 2, 1]`) produce empty ranges and contribute nothing.

**Complexity:** `O(n log n)` time, `O(n)` space.

## Monotone Two-Pointer Sweep

The bisections re-derive, for every first cut, boundaries that barely move.
Advance `i` by one and the head sum `prefix[i]` cannot shrink, so the
threshold `2 * prefix[i]` only rises — the first `j` clearing it cannot move
left. The ceiling `(total + prefix[i]) / 2` only rises too, so the first `j`
breaking it cannot move left either. Both cut bounds therefore march
monotonically right with the first cut, and two pointers that only ever
advance can carry them across the whole sweep.

The code keeps `lo` and `hi` as the current stretch's half-open ends. Each
`i` first lifts `lo` to at least `i + 1`, then walks it forward while
`prefix[lo] < 2 * prefix[i]` — the entries it passes are exactly those that
leave the middle block too small. `hi` follows as the right end: it is
lifted to `lo` when it lags (no legal cut is lost, because every position
the lift skips already failed the lower test), then walks forward while
`prefix[hi]` stays at or under the ceiling. The stretch `[lo, hi)` contributes
`hi - lo` cuts, and keeping `lo` above `i` while both walks stop at `n`
leaves all three blocks non-empty.

Neither pointer ever retreats, and each stops at `n` for good, so across all
`n - 2` values of `i` the two walks take at most `n` advances apiece — the
log factor of the bisections dissolves into one linear sweep. Inputs whose
mass sits at the front (like `[4,2,1,1]`) push `lo` all the way to `n` and
leave every stretch empty. The running total is reduced modulo 10^9 + 7 as
it grows.

**Complexity:** `O(n)` time, `O(n)` space.
