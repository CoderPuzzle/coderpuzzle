# Solutions — Winner of the Linked List Game

## Walk the pairs and count the wins

Move a pointer two nodes at a time from the head. Each stop visits one
full pair, and one strict comparison decides its point: a higher first
(even-indexed) value scores for "Even", a higher second (odd-indexed)
value scores for "Odd". The two values of a pair can never be equal —
one is always even and the other odd — so every pair awards exactly one
point and no tie-breaking inside a pair is needed. When the walk ends,
the team with more points wins; equal totals return "Tie".

**Complexity:** `O(n)` time and `O(1)` extra space.
