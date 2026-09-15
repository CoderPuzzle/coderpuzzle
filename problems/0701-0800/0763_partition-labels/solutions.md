# Solutions — Partition Labels

## Greedy last-occurrence sweep

A part that starts at some index must extend at least to the last occurrence of every letter it contains — if a letter reappears later, that later copy would land in a different part. So the first part is forced to end at `max(last[c])` over every letter `c` it touches, and once that boundary is fixed, the same argument applies to the remainder of the string. Precompute `last[c]`, the last index of each letter, in one pass.

![Every letter's span from first to last occurrence; the forced cuts land where all opened spans have closed.](figures/solution-last-occurrence.svg)

Then sweep the string once with two pointers. Keep `start` (where the current part begins) and `end` (the farthest last-occurrence seen so far). At each index `i`, raise `end` to `max(end, last[s[i]])`. When `i` reaches `end`, every letter opened inside this span is also closed inside it, so a cut is legal: record `end - start + 1` as the part's size and set `start = i + 1`.

Cutting at the earliest legal index every time is what maximizes the number of parts — any valid partition must respect these forced boundaries, and delaying a cut can only merge parts, never create more. Edge cases fall out naturally: a string of one repeated letter yields a single part of full length, and a string of all-distinct letters yields `n` parts of size 1.

**Complexity:** `O(n)` time, `O(1)` space (the last-occurrence map holds at most 26 lowercase letters).
