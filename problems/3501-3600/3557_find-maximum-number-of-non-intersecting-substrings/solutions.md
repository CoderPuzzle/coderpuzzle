# Solutions — Find Maximum Number of Non Intersecting Substrings

## Greedy earliest finish

Every candidate is an interval `[j, i]` with `word[j] == word[i]` and
`i - j >= 3`, and two candidates conflict exactly when their index ranges
overlap — so the task is classic interval scheduling: pick as many
non-overlapping intervals as possible. The exchange argument applies
verbatim: in any optimal selection, the first interval to finish can be
swapped for the earliest-finishing valid interval without pushing any later
interval right, since its end only gets smaller and its start still lies
before every remaining choice.

The scan realizes that greedily in one pass. Within the current window
(characters after the last taken substring), each letter's first occurrence
is remembered; the earliest-finishing valid substring ending at `i` is
exactly `[first[word[i]], i]`, which becomes available the moment
`i - first[word[i]] >= 3`. Taking it clears the window — every remembered
occurrence now lies inside the taken interval — and the scan continues
after its end. Each character is processed once and the letter table holds
26 slots, so the work is linear regardless of how many candidate intervals
the string actually contains.

**Complexity:** `O(n)` time, `O(1)` space (a 26-slot table).
