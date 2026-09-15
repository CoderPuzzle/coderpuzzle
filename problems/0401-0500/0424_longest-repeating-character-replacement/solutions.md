# Solutions — Longest Repeating Character Replacement

## Sliding Window with Max Frequency

A window can be made uniform with at most `k` replacements exactly when its length minus the count of its most frequent character is at most `k` — the non-majority characters are the ones that must be changed. This turns the problem into finding the longest window satisfying that budget condition, which a two-pointer sweep handles: extend the right edge one character at a time, and shrink from the left whenever the window exceeds the replacement budget.

The code keeps a 128-slot count array indexed by character code plus a running `max_freq`, updated only when a count grows past it. `max_freq` is deliberately never decreased when the left edge moves. This is safe because a stale (too large) `max_freq` can only cause the window to under-shrink, never to shrink below a previously achieved length; whenever the window reaches a new longest length, the character that set the current `max_freq` is still fully inside the window, so the recorded window is genuinely valid. Between increases of `max_freq` the window can never exceed the best length already recorded, so no longer answer is missed.

Both pointers only move forward, each traversing the string once, so the sweep is linear. `k >= len(s)` never over-shrinks (the whole string is one window), `k = 0` degenerates to longest run of one character, and a single-character string is its own answer.

**Complexity:** `O(n)` time, `O(1)` space (fixed 128-entry count array).
