# Solutions — Maximum Length of Repeated Subarray

## Longest Common Suffix Dynamic Programming

A common subarray must be contiguous, which points at a suffix DP: let the state for a pair of positions be the length of the longest run of equal elements starting exactly at those positions. When `nums1[i] == nums2[j]` the run is one longer than the run starting at `(i+1, j+1)`; when they differ the run is 0, because no shared subarray can begin at a mismatched pair. The longest common subarray is the maximum run over all starting pairs, tracked as the table fills.

The code sweeps `i` from the last index of `nums1` down to 0, so the row for `i+1` is always available when row `i` is computed. Only that previous row is kept: `dp` holds row `i+1` while `new` is filled for row `i`, and the single value read from the old row is the diagonal continuation `dp[j+1]`. Rolling the table this way cuts the space to one row over `nums2` plus the row under construction.

Arrays with no common element never enter the match branch and correctly return 0, which also covers the case of a common element appearing only as singletons. The answer can end at any pair of positions, so the maximum is updated inside the loop rather than read from a fixed cell.

**Complexity:** `O(m · n)` time, `O(n)` space.
