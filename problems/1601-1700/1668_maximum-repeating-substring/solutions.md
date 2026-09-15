# Solutions — Maximum Repeating Substring

`word` being k-repeating means some window of `sequence` is tiled by `k`
back-to-back copies of `word` — each copy starts exactly where the
previous one ended, with no overlap and no gap between copies. That
tiling view is what the whole task turns on: counting scattered matches,
or letting a self-overlapping word like `"aa"` chain through its overlap,
overcounts, because `word` concatenated `k` times is one contiguous block
by construction.

## Run-length dynamic program over start positions

Let `run[i]` be the number of consecutive copies in the longest tiling
that begins at position `i` of `sequence`. Then `run[i] = run[i + m] + 1`
exactly when `word` matches at `i` (`m = word.length`), and `run[i] = 0`
otherwise: a match at `i` is followed by whatever tiling continues at
`i + m`, and by the tiling semantics nothing else can extend it. Filling
`run` from right to left makes every `run[i + m]` already known, and the
answer is the maximum entry. Overlapping self-occurrences are handled
correctly for free — in `"aaa"` with `word = "aa"` the copy at `0` looks
for its continuation at `2`, finds none, so the run stops at `1`, while
the scattered matches of `"ab"` in `"aabaab"` never chain because the
second copy would have to begin mid-gap.

Each of the `n` start positions is checked against `word` directly, so
the worst case — `sequence` and `word` both all one letter, where every
window matches — does `O(n * m)` character comparisons. The run array
holds `n + 1` integers; nothing else is stored.

**Complexity:** `O(n * m)` time worst case, `O(n)` space.
