# Solutions — Largest Element in an Array after Merge Operations

## Sweep right to left, absorbing while possible

Scan from the last element back to the first carrying one accumulated pile: the value of the merged run the processed suffix currently presents to whatever sits on its left. At element `x` the adjacent pair is legal exactly when `x <= pile` — the operation always deletes the left member — so a pile that is at least `x` absorbs it and grows, otherwise `x` starts a fresh pile; the answer is the largest pile seen over the sweep. Equal values merge, so an all-equal array collapses to its total sum, while a strictly decreasing array admits no merge at all and answers with its first element.

The greedy is safe because every element any play can field is the sum of one contiguous segment fully merged inside itself, ending at some index `r`, and no segment ending at `r` can outweigh the leftward extension from `r` that absorbs each next element while it is at most the running sum. Sketch: if some mergeable segment reached further left than that extension, its final merge would split into parts whose left sum does not exceed its right sum; either that split point lies within the extension's reach, where induction on the right part shows the left part fits inside the running sums the extension already carried, or it lies left of the extension's stop, where merging the right part would at some step pair the rejected too-big element against values drawn only from right of the stop — all smaller than it, hence an illegal pair. So each pile the sweep forms dominates everything anchorable at its right end, and each pile is genuinely reachable since the right-to-left merges that build it are legal by construction.

Totals reach `10⁵ · 10⁶ = 10¹¹`, past 32-bit range, so the accumulator and return type are 64-bit outside Python.

**Complexity:** `O(n)` time, `O(1)` extra space.
