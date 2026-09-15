# Solutions — Slowest Key

## Single pass, running best

Each keypress's duration is fully determined by two adjacent release
times: the 0th keypress lasts `releaseTimes[0]`, and every later keypress
`i` lasts `releaseTimes[i] - releaseTimes[i - 1]`. So a single left-to-right
scan can compute every duration exactly once while comparing it against the
best keypress seen so far — there is no need to store the whole list of
durations.

The code initializes the running answer from index 0 (duration
`releaseTimes[0]`, key `keysPressed[0]`), then walks the remaining indices.
At each index it computes the current duration as the difference from the
previous release time, then updates the running answer whenever the new
duration is strictly greater, or ties the current best while its key is
lexicographically larger. Because the comparison is `>` for duration and
only reaches the key comparison on an exact tie, later occurrences of an
already-winning duration only overtake the answer when their key is
strictly larger — so among tied maximal durations the lexicographically
largest key always survives, regardless of where in the sequence it
occurs.

**Complexity:** `O(n)` time, `O(1)` space.
