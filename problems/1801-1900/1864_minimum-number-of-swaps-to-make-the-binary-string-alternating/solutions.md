# Solutions — Minimum Number of Swaps to Make the Binary String Alternating

An alternating string of length `n` has only two shapes: starting with
`0` or starting with `1`. A swap exchanges any two characters, so one
swap can repair exactly two mismatched positions — the count of
mismatches against a target pattern, halved, is that target's cost.

## Match against both canonical patterns

Count ones; if the count differs from both `ceil(n/2)` and `floor(n/2)`
by more than the balance allows (`|ones - zeros| > 1`), no alternation is
reachable and the answer is `-1`. Otherwise, for each of the two patterns
whose one-count matches the string's, tally position mismatches and score
`mismatches / 2` (the mismatch count is always even when the counts
agree, since each class has the right size). The smaller score wins.

Two linear passes over the string.

**Complexity:** `O(n)` time, `O(1)` space.
