# Solutions — Largest Subarray Length K

Every candidate window has the same length `k`, so the comparison between
two of them is decided at their first differing index — and distinct values
guarantee that index is 0: two legal windows start at different positions,
hence at different first elements, and the larger first element wins
outright. Ranking windows therefore reduces to ranking their first
elements, and the answer is the window starting at the maximum of
`nums[0..n-k]`.

## Argmax over the legal starts

Scan `i` from 1 to `n - k`, keeping in `best` the index of the largest
value seen so far; a strict `>` leaves `best` at the earliest maximum,
though with distinct values a tie cannot occur — two windows never share a
first element. The answer is the slice `nums[best..best+k]`, copied out as
the return value. One linear scan plus one slice: nothing is sorted, no
window is materialized besides the answer, and values up to `10⁹` already
fit the 32-bit element type.

**Follow-up.** Drop the distinctness guarantee and the reduction breaks:
two windows can tie at index 0 and be decided deeper in, so first elements
no longer rank them. The direct fix is to compare windows in full — walk
the legal starts keeping the current best window, and test each later
window against it lexicographically, `O(nk)` worst case (think all values
equal). Suffix-array ranks — comparing two starts through the ranks of the
suffixes they open — bring that back to near-linear, machinery far heavier
than this problem needs.

**Complexity:** `O(n)` time, `O(k)` space (output).
