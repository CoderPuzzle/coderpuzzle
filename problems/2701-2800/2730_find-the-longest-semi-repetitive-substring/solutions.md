# Solutions — Find the Longest Semi-Repetitive Substring

A valid substring is one whose adjacent equal-pair count is at most one;
the task is to find the longest such window.

## Sliding window over at most one equal pair

Scan `s` with two indices. As `right` advances, compare it with its
predecessor: an equal neighbor means a new pair just entered the window, so
`pairs` counts how many adjacent equal positions the current window
contains. While `pairs` exceeds one, advance `left` until that excess is
gone — and the only way it can drop is when `left` itself steps past the
first element of the leftmost kept pair, i.e. `s[left] == s[left + 1]`.

After each shrink the window `[left, right]` satisfies the constraint by
construction, so recording `right - left + 1` every step and keeping the
maximum visits the longest valid window ending at each `right` without ever
enumerating substrings. The answer never exceeds `s.length <= 50`, so the
count and result fit comfortably in a 32-bit integer.

**Complexity:** `O(n)` time, `O(1)` space.
