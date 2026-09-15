# Solutions — Largest Number

## Custom Comparator Sort

The core insight is that the correct ordering of two numbers, once converted to strings, is decided by direct comparison of their concatenations: `a` should precede `b` exactly when the string `a + b` is lexicographically greater than `b + a`. Numeric comparison is useless here (3 should come before 30, not after), but concatenation comparison captures exactly how the digits interleave in the final answer.

This comparator is a valid total order (it is transitive), so sorting all the stringified numbers with it via `cmp_to_key` produces the maximal arrangement. The exchange argument shows why: if any adjacent pair in the output violated the comparator, swapping those two adjacent blocks would yield a lexicographically larger string, so a sorted result admits no improvement. Since all inputs are non-negative, no sign or leading-digit edge cases arise beyond the ordering itself.

After joining the sorted strings, one edge case remains: if the result begins with `'0'`, every input must have been 0 (a nonzero number would sort ahead of any string of zeros), and the answer is the single string `"0"` rather than `"000..."`. Each comparison builds two concatenations of at most 10-digit numbers (inputs are bounded by 10^9), so per-comparison cost is a small constant.

**Complexity:** `O(n log n)` time, `O(n)` space.
