# Solutions — Consecutive Characters

## Run length while scanning

A substring of one unique character is a slice of a run — a maximal block
of equal characters — so the answer is simply the longest run. Walking
the string once and tracking the current run's length finds it: the
counter resets to 1 whenever the character changes and increments when it
repeats, and a running maximum captures the largest value the counter
ever reaches.

The single character string starts the counter at 1, so the answer is
always at least 1. No memory beyond two scalars is needed because a run's
length is fully described by the counter at its last position.

**Complexity:** `O(n)` time, `O(1)` space.
