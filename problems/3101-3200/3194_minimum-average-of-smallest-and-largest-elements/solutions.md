# Solutions — Minimum Average of Smallest and Largest Elements

## Sort, then pair extremes with two pointers

Each round removes the current minimum together with the current maximum,
so sorting once reveals every round's pair at once: after ascending
sort, round `k` (counting from zero) pairs exactly `nums[k]` with
`nums[n - 1 - k]`, regardless of tie order — when several copies share
the minimum or maximum value, removing any of them leaves the same
multiset behind. The answer is therefore

`min over k in [0, n/2) of (nums[k] + nums[n - 1 - k]) / 2`,

walked off with two pointers moving inward from both ends.

The values are bounded by 50, so pair sums never exceed 100; sums are
computed exactly in integer arithmetic everywhere and divided by 2 only
at the end, where doubles represent integers and exact halves without
rounding error for this range. The initial-scan sentinel sits harmlessly
above the largest possible average (a pair sum caps at 100).

**Complexity:** `O(n log n)` time for the sort, `O(1)` extra space
(in-place sort); selection-based alternatives would pay `O(n²)`.
