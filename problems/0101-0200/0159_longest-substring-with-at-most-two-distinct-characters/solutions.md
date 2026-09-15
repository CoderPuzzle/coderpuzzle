# Solutions — Longest Substring with At Most Two Distinct Characters

## Sliding window with a character count map

The window over `s` is kept valid at every step rather than repaired after the fact. A count map records how many of each character the window currently spans, and it never holds more than two entries, so the window is always a substring with at most two distinct characters — its width is always a legal candidate, and the answer is just the largest width it ever reaches. No time is spent on invalid windows, because none are ever measured.

Each new character increments its count. If that insertion brought a third distinct character into the map, the left end advances: counts of the characters it passes are decremented, and the first one whose count drains to zero leaves the map, which is exactly the moment the window is two-distinct again. In `s = "eceba"` the window grows to `ece`, drops the `c` when `b` arrives as the third distinct letter, and later reaches `eba` — width 3 is never beaten.

Both ends only move forward, so each character enters and leaves the window at most once even though the inner loop shrinks repeatedly. The map itself is bounded by the eviction rule: it briefly holds three entries, and never more.

**Complexity:** `O(n)` time, `O(1)` space.
