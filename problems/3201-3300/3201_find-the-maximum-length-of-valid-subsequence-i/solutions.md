# Solutions — Find the Maximum Length of Valid Subsequence I

## Parity-State Dynamic Programming

Working modulo 2 collapses every element to its parity, and the validity
condition says the sum of each adjacent pair lands on one fixed residue.
Fixing what that residue does to the shape: sums must be constantly even
(`residue 0`) — then parities never change between neighbors and the whole
subsequence is even-only or odd-only — or constantly odd (`residue 1`) —
then every step flips parity and the subsequence is strictly alternating.
So only four target shapes can ever win: all-even, all-odd, alternating
starting with an even, alternating starting with an odd.

Each shape is scored by sweeping `nums` once, carrying the parity the next
slot wants and counting every element that matches; taking the earliest
match for a slot is safe because it leaves the longest possible suffix for
the remaining slots. An element that misses simply stays available for a
later slot of its own parity, so nothing is lost. The best count over the
four sweeps is the answer, which agrees with Example 2's `[1, 2, 1, 2, 1,
2]` coming from the alternating shapes rather than the monotone ones.

**Complexity:** `O(n)` time (four passes), `O(1)` space.
