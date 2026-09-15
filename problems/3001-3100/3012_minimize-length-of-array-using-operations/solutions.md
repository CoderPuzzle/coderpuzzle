# Solutions — Minimize Length of Array Using Operations

## Case check on the minimum

Let `m` be the smallest value in `nums` and `cnt` the number of times it
occurs; three cases decide the answer.

If `m` occurs once, pairing it with any larger value `y` deletes `y` while
re-inserting `m % y == m`, so each operation burns one other element and a
lone `m` is what remains. If instead some value `y` satisfies
`y % m != 0`, one operation swaps `y` and `m` for `y % m`, a positive value
strictly below `m` and therefore a brand-new unique minimum — back to the
previous case. Either way the answer is `1`.

Otherwise every element is a multiple of `m`, so every remainder ever
produced is again a multiple of `m`, and no positive value can drop below
`m`. Burning each larger element through `m % x == m` keeps the count of
`m`s fixed while removing everything else, and then merging equal copies
two at a time finishes at `ceil(cnt / 2)` elements. That is optimal: an
operation consuming a copy of `m` either re-inserts `m` (`m % x`) or
inserts zero (`x % m`, which divides evenly here), while an operation on
two larger elements never removes an `m` and may only create one. So if
`z` operations inserted zero and `p` positives remain, those positives
still include at least `cnt - 2 * z` copies of `m`; hence `2 * z + p >= cnt`,
and the final length `z + p`, being an integer no smaller than
`(cnt + p) / 2`, is at least `ceil(cnt / 2)`.

**Complexity:** `O(n)` time, `O(1)` space.
