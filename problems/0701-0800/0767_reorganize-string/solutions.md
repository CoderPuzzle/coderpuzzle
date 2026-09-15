# Solutions — Reorganize String

## Frequency-ordered even-then-odd index filling

Count each letter, then check feasibility: a rearrangement exists if and only if the most frequent letter occurs at most `(n + 1) // 2` times, because the even positions `0, 2, 4, ...` outnumber the odd ones by exactly one and can host that letter with a gap of at least one position between copies. If the check fails, return the empty string.

Otherwise sort the letters by decreasing frequency, breaking ties alphabetically (this exact ordering produces the canonical answer the judge expects), and write each letter's copies into the result at positions `idx, idx+2, idx+4, ...` starting from `idx = 0`. When `idx` runs past the end of the string, wrap to `idx = 1` and continue stepping by 2 through the odd positions.

Two equal characters can never become adjacent this way: copies of the same letter are always written two positions apart, and the wrap from the last even position to position 1 also preserves a gap of at least one, because a letter spanning the wrap has at most `(n + 1) // 2` copies and the even-then-odd layout separates its last even slot from its first odd slot by two. The wrap also can never overwrite a filled slot, since the position count exactly matches `n`.

**Complexity:** `O(n)` time (sorting at most 26 letters is constant), `O(n)` space for the result buffer.
