# Solutions

## Run-decomposed dynamic programming

The pressed string splits into maximal runs of one digit, and letters never
span two different digits — so each run can be decoded independently and the
answers multiply. Inside a run of length `L` for a digit with `k` letters
(`k` is 4 for keys `7`/`9`, else 3), every message corresponds to composing
`L` as an ordered sum of parts of size `1..k`, where a part of size `s`
represents pressing the same key `s` times for one letter.

A left-to-right DP over the positions of the run computes this: `dp[p]` is
the number of ways to decode the first `p` presses of the current run, built
from the previous at most `k` entries. Runs are processed in one scan; when a
run ends its window closes and the next digit starts from scratch.

**Complexity:** `O(n)` time (each position sums at most 4 predecessors),
`O(n)` space.
