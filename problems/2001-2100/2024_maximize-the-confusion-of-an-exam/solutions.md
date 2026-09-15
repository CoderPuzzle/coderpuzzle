# Solutions — Maximize the Confusion of an Exam

## Sliding Window on the Minority Count

A window of consecutive questions can be turned into a uniform run of one answer if and only if the minority character in the window occurs at most `k` times — flip every minority answer to the majority one. That condition, `min(countT, countF) <= k`, is exactly what a two-pointer window can maintain: grow the right end one question at a time, and whenever _both_ counts exceed `k` (equivalently the minority count exceeds `k`), shrink from the left until the window is valid again. The largest window length observed at any point is the answer.

Shrinking only from the left is safe because validity is monotone in window size: if a window is invalid, every window containing it is invalid too, so the left pointer never needs to move backward. The window is never explicitly tied to which character will be the final majority — the min-based condition covers both choices simultaneously, since whichever of T or F is the minority is the one whose flips are budgeted by `k`.

Each question enters and leaves the window at most once, so the whole pass is linear. The counts need only two integer slots, and `k >= n` degenerates naturally: the condition never triggers a shrink and the answer is the whole string.

**Complexity:** `O(n)` time, `O(1)` space.
