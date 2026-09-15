# Solutions — Largest Substring Between Two Equal Characters

## First-occurrence table, one pass

Only the first and last time each character appears can ever bound the
widest gap for that character — any earlier-to-later pair strictly inside
those two occurrences produces a smaller gap. So the code needs to
remember, for each of the 26 lowercase letters, the index where it was
first seen; once a letter is seen again, the distance between that first
index and the current index (minus the two endpoints themselves) is a
candidate answer.

The code walks `s` once. At each index it checks whether the character
already has a recorded first occurrence: if not, it records the current
index as that occurrence; if so, it computes `index - first[char] - 1`
and keeps the running maximum. Because later repeats of the same
character keep overwriting the "current" comparison against the same
stored first index, the last occurrence is automatically the one that
produces the widest gap for that character — the first-seen index is
never updated again once set. Characters that never repeat simply never
contribute a candidate, so a string with no repeated character leaves the
running maximum at its initial `-1`.

**Complexity:** `O(n)` time, `O(1)` space (bounded alphabet).
