# Solutions

## Single pass over runs

Scan the string once, tracking the length of the current run of equal digits.
Whenever the run reaches exactly 3, the substring ending at the current index
is good; keep the largest one seen. Comparing three-character digit strings
lexicographically is the same as comparing them numerically, so a plain string
comparison picks the maximum, with the empty string as the starting sentinel
that also serves as the "no good integer" answer.

Runs longer than 3 need no special handling: any window of three consecutive
positions inside a longer run is itself good and is reported when the counter
passes through each position.

**Complexity:** `O(n)` time, `O(1)` extra space.
