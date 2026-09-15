# Solutions — Minimum Operations to Make Array Values Equal to K

Operations only ever lower values, so the array is solvable exactly when no
element sits below `k`; and each operation collapses every level above some
`h` onto `h` itself, which can eliminate only the current maximum level per
move. That pins down both the impossibility check and the optimal count.

## One pass over distinct levels above k

Two observations decide everything. First, if any `nums[i] < k`, the goal
is unreachable: values never increase, so that element can never be raised
to `k`, and the answer is `-1`. Second, when every value is at least `k`,
an operation's `h` is valid precisely when all levels strictly above `h`
have already been merged into one — so the optimal play is top-down:
flatten the maximum level onto the next distinct level, repeat, and finish
with `h = k`. Each operation removes exactly one distinct value level above
`k`, and no operation can remove two, so the minimum number of operations
is the count of distinct values strictly greater than `k`.

A single pass collects that count: scanning `nums`, return `-1` the moment
a value below `k` appears, and otherwise insert every value above `k` into
a hash set. The answer is the set's size — `0` when the array already
equals `k` throughout. With values bounded by 100, the set holds at most
100 entries, so the scan is effectively linear in the array length.

**Complexity:** `O(n)` time, `O(min(n, V))` space.
