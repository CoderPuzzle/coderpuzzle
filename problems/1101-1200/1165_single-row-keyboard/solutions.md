# Solutions — Single-Row Keyboard

## Map letters to positions once, then walk

The total time is a sum of independent jumps: one from index 0 to the first
letter's position, then one per consecutive letter pair. Each jump needs
only the two letters' indices on the layout, so a single pass over
`keyboard` builds a 26-entry map from letter to position, and a second pass
over `word` accumulates `|here - there|` while carrying the finger's current
position.

Nothing else is needed — typing a repeated letter costs 0 because the finger
is already there, and the map turns every lookup into `O(1)`. The maximum
possible total is `25 · 10⁴`, far inside 32-bit range.

**Complexity:** `O(26 + |word|)` time — building the map plus one pass over
the word — and `O(1)` space for the fixed-size map and the position.
