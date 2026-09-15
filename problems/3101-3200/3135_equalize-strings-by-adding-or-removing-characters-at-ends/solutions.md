# Solutions — Equalize Strings by Adding or Removing Characters at Ends

## Longest common substring dynamic programming

A deletion can only peel a character off one of the two ends, so the set of
original characters that survive every operation is always a contiguous
window of `initial`; likewise, additions at the ends wrap around that
surviving block without ever splitting it, which means the survivors must
appear inside `target` as one contiguous run — in other words, the optimal
strategy keeps some common substring of `initial` and `target`. Every
character outside the kept window is removed once (`initial.length - L`
removals) and every character of `target` outside it is added once
(`target.length - L` additions), giving a cost of `m + n - 2 * L`; no
schedule can beat this because each surviving character costs nothing while
each of the others needs at least one operation.

So the task reduces to finding the longest common substring, for which the
classic dynamic program applies: letting `dp[i][j]` be the length of the
longest common suffix of prefixes ending at position `i` of `initial` and
position `j` of `target`, matching characters extend
`dp[i-1][j-1]` by one and mismatches reset to zero, and the answer is the
maximum entry over the whole table. A single pass over all `(i, j)` pairs
suffices, and keeping only the previous row bounds memory to one array of
size `n + 1`.

**Complexity:** `O(m * n)` time, `O(n)` space.
