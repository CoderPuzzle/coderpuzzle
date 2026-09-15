# Solutions — Number of Student Replacements

## Single-pass minimum scan

A replacement happens exactly when a new student is strictly better than the
current selection, and the current selection is always the best (lowest) rank
seen so far. The simulation therefore reduces to tracking one value — the
running minimum of the prefix — and counting every time it drops.

The first student is the initial selection, so the scan starts at the second
element. Each arrival is compared with `best`; a strictly smaller rank
updates `best` and increments the counter, while an equal or larger rank
changes nothing. Because "better" is strict, a tie never counts, and because
`best` only ever decreases, each replacement is recorded the moment the
prefix minimum reaches a new low.

One left-to-right pass reads every element exactly once, so linear time is
necessary; the counter and the running minimum are the only state, so extra
space is constant. The answer is at most `ranks.length - 1`, well inside
32-bit range.

**Complexity:** `O(n)` time, `O(1)` extra space.
