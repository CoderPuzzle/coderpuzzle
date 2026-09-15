# Solutions — Maximum Number of Operations With the Same Score II

## Three candidate scores, interval DP

The first operation deletes one of three pairs — the two head elements, the
two tail elements, or the two end elements — and its sum pins the score every
later operation must repeat, so only those three candidate scores ever need
to be tried.

For a fixed score, every play lives inside a contiguous window: deleting the
first two, the last two, or both ends just moves a boundary inward, and each
operation shrinks the window by exactly two elements, so only widths sharing
the starting parity ever occur. A layer rolled over those widths holds, for
each left endpoint, the longest chain of operations with that score inside
the window; each entry takes the best move whose deleted pair sums to the
score, worth one plus the entry of the window the move produces. The answer
is the best chain over the three candidate scores.

**Complexity:** `O(n²)` time, `O(n)` space.
