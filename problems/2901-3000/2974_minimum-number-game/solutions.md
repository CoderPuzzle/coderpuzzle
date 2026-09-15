# Solutions — Minimum Number Game

## Sort, then swap adjacent pairs

The two removals in a round are exactly the two smallest values still
present: Alice takes the overall minimum, Bob the second minimum. The
two appends then put Bob's value in `arr` before Alice's, so every round
contributes one pair to the output in descending order, rounds ordered
by ascending value.

Sorting `nums` up front makes the round values obvious: round `k` works
with the pair at sorted positions `2k` and `2k + 1`, and appending Bob's
value first simply swaps that pair. The output is therefore the sorted
array with each adjacent pair exchanged — equal values swap invisibly,
so duplicates need no special casing.

**Complexity:** `O(n log n)` time for the sort, `O(n)` space for the
result copy.
