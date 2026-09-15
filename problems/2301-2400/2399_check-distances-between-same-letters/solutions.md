# Solutions — Check Distances Between Same Letters

## First-occurrence map, verify on the second sighting

Each letter appears exactly twice, so one left-to-right pass suffices:
remember each letter's first index in a map, and when it shows up again,
check that `second - first - 1` — the count of letters strictly between
the two occurrences — equals its entry in `distance`. Letters absent from
`s` are never checked, so their `distance` values are irrelevant.

Any mismatch fails fast; surviving the whole scan means every pair is
correctly spaced.

**Complexity:** `O(n)` time, `O(1)` space (the map holds at most 26
entries).
