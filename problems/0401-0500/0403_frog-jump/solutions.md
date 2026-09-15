# Solutions — Frog Jump

## DP over stones and last-jump sizes

Position alone is not enough state: whether the frog can progress from a stone depends on how long the jump that landed there was, since only jumps of `k-1`, `k`, or `k+1` may follow. So the DP tracks, for each stone `i`, the set `jumps[i]` of last-jump sizes that can land on it. Starting from `jumps[0] = {0}` (the pre-jump state whose only legal successor is a first jump of 1), the algorithm sweeps stones in order: every `(stone, last jump)` state fans out to the three candidate steps, and a step lands only if `position + step` is an actual stone, found through a hash map from position to index.

![The stones 0, 1, 3, 5, 6, 8, 12, 17 of example 1 on the river, with the crossing jumps 1, 2, 2, 3, 4, 5 drawn as arcs: each length stays within one of the previous, and the stone at position 6 is skipped entirely.](figures/solution-jump-arcs.svg)

Because stones are strictly increasing and every step is at least 1, each landing target is strictly ahead of the current stone, so the forward sweep over `i` visits states in a valid order and each state is finalized before it is used. The frog can cross exactly when the last stone's set is non-empty. The state space stays small for a structural reason: a jump size can only grow by 1 per landing, so after `i` landings no jump exceeds `i` — each set holds at most `n` sizes and there are `n` stones, with each `(stone, size)` pair inserted once, matching the constraint of 2000 stones.

Edge cases: if the second stone is not at position 1, no legal first jump of size 1 reaches it, every set stays empty, and the answer is correctly false. Steps of `last - 1` that would be zero or negative are skipped, stones within a reachable distance but landing in water are silently ignored, and duplicate insertions into a set are free.

**Complexity:** `O(n²)` time, `O(n²)` space (worst case, for the jump-size sets).
