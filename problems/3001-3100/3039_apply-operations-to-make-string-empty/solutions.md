# Solutions — Apply Operations to Make String Empty

## Last occurrences of the most frequent letters

Every operation strips exactly one occurrence from each letter still present, so a letter with `k` occurrences survives exactly `k` rounds and the whole process ends after `m` rounds, where `m` is the maximum count. Right before that last round each letter has lost `m - 1` copies, which empties every letter counted below `m` and leaves precisely the letters with count `m`, each reduced to its last occurrence in the original string.

One pass over `s` counts the letters; a second pass scans from the right and keeps the first copy it sees of every letter whose count equals that maximum, collecting the survivors in reverse order for a final flip.

**Complexity:** `O(n)` time, `O(1)` space.
