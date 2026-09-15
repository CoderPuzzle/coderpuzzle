# Solutions — Maximum Length Substring With Two Occurrences

## Sliding window with per-letter counts

The candidate answer is always some contiguous window whose every letter
appears at most twice, and extending such a window one character at a time
is monotone: adding a letter can spoil at most that one letter's budget,
and dropping characters from the left edge is the cheapest repair. So scan
`s` once keeping a window `[left, right]` and a small table counting
occurrences inside it; after each extension the rightmost letter is the
only one that could sit above two, so the left edge advances just until
that count returns to two.

Every position `right` therefore ends paired with the smallest legal
`left`, which makes `right - left + 1` the longest valid substring ending
exactly there — the maximum over all endpoints is the global optimum no
repair step could have skipped past, because shortening any optimal
substring from its own left would still have appeared as some endpoint's
best window. Both edges move forward only, so the whole pass is linear in
the length of `s` with a constant-sized 26-slot count table.

**Complexity:** `O(n)` time, `O(1)` space (`26` counters).
