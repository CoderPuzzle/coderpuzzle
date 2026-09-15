# Solutions — Special Array I

## Adjacent parity scan

`nums` is special exactly when no two neighbors share a parity: the array
is one alternating odd/even sequence from end to end. Any repeated parity
at positions `i - 1`, `i` breaks the condition on that pair alone — later
elements cannot repair an earlier violation — so the scan may stop at the
first offending pair.

The code walks once through `nums` comparing `nums[i - 1]` and `nums[i]`
mod 2 and returns `false` on the first match, `true` if the walk
completes. Values only need their low bit, so the comparison fits any
width and nothing accumulates.

**Complexity:** `O(n)` time, `O(1)` space.
