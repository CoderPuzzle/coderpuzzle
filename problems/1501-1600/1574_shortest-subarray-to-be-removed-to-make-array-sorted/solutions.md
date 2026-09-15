# Solutions — Shortest Subarray to be Removed to Make Array Sorted

## Prefix/suffix two-pointer merge

Any array that becomes non-decreasing after removing one contiguous
run is the concatenation of a sorted prefix and a sorted suffix of the
original array, with the removed run sandwiched between them. So first
find `left`, the largest index such that `arr[0..left]` is already
non-decreasing, and `right`, the smallest index such that
`arr[right..n-1]` is already non-decreasing. If `left` reaches the last
index the whole array is sorted and the answer is `0`. Otherwise
removing everything after the prefix (length `n - left - 1`) or
everything before the suffix (length `right`) are both valid answers,
which gives an initial upper bound.

The remaining question is whether keeping _part_ of the prefix and
_part_ of the suffix beats both of those extremes — that only works
when some prefix element is no greater than some suffix element, so the
two runs can be spliced directly. Walk `i` from `0` to `left` and `j`
from `right` to `n - 1`. Whenever `arr[i] <= arr[j]`, keeping
`arr[0..i]` followed by `arr[j..n-1]` is a valid sorted result, removing
the `j - i - 1` elements strictly between them, so the candidate updates
the running minimum and `i` advances to try a larger prefix. Whenever
`arr[i] > arr[j]`, no `i` this large can pair with the current `j`
(the prefix is non-decreasing, so all later prefix values are even
larger), so `j` advances instead. Because both runs are individually
sorted, the smallest valid `j` for a given `i` never decreases as `i`
grows, so each pointer only moves forward — the whole merge does
`O(left + (n - right))` work, never revisiting a pair.

**Complexity:** `O(n)` time, `O(1)` space.
