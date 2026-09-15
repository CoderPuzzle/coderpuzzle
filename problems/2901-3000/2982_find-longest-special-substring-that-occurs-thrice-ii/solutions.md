# Solutions — Find Longest Special Substring That Occurs Thrice II

## Run lengths with the top three per character

At half a million characters, enumerating substrings is off the table, but a
special substring never crosses a character change, so all that matters about
`s` is its decomposition into maximal runs of equal characters. Grouping the
run lengths per character leaves at most 26 groups; occurrences of any
single-character substring of length `L` inside a run of length `r` number
exactly `max(0, r - L + 1)`, summed over that character's runs.

Only a group's three longest runs can ever contribute, because placing three
windows among runs longer than `L` always has an optimal arrangement that uses
just the top three: all three inside the longest run (feasible up to
`f1 - 2`), two in the longest plus one in the second (`min(f1 - 1, f2)`), or
one in each of the three longest (`f3`). The per-character answer is the max
of those three candidates, and the global answer the max over characters,
`-1` when nothing reaches three occurrences.

One linear scan builds the groups and sorting their (short) length lists
finishes the job; at `5 × 10⁵` characters this is comfortably linear, with
`O(26 + n)` working memory beyond the input.

**Complexity:** `O(n + n log 26)` time — effectively `O(n)`, `O(n)` space.
