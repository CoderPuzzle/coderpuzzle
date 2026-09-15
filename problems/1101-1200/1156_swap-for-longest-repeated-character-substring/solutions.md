# Solutions — Swap For Longest Repeated Character Substring

## Run-Length Encoding

One swap can improve a repeated-character substring in only two ways, both visible in a run-length encoding of `text`. Either a single run of some character `ch` is stretched by one — swapping in a `ch` from anywhere else in the string — or two runs of the same character separated by exactly one alien character are glued together, the swap replacing the separator with a `ch` borrowed from elsewhere. Both candidates are evaluated per character, and the answer is the maximum.

First pass: build `runs`, the run-length encoding, plus a global `Counter` of character frequencies. For every run, a stretch candidate is `min(length + 1, counts[ch])` — the run can absorb one swapped character, but only if a spare `ch` actually exists outside the run, hence the min with the total count.

Second pass: for each interior run of length exactly 1 whose neighbors carry the same character, the merge candidate is `left_len + right_len` plus 1 more when `counts[ch]` exceeds the combined length, i.e. when some `ch` sits outside the two runs to fill the swapped-out gap. When the two runs already account for every occurrence, the swap can still join them (the separator itself is exchanged for one of the run's own characters) but cannot add a third block, so no bonus.

The all-same-string case is covered by the stretch branch (`min(n + 1, n) = n`), and a lone character never appears as a one-length separator between matching runs unless it genuinely divides them.

**Complexity:** `O(n)` time, `O(n)` space.
