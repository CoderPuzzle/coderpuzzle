# Solutions — Shortest Uncommon Substring in an Array

## Scan one joined text per string

For each `arr[i]`, join all the other strings into a single scan text
separated by a NUL character. Candidates contain only lowercase letters, so
a NUL can never appear inside one, and a containment test against the joined
text answers "does this substring occur in any other string" with one search
— a match cannot straddle a separator. With at most 100 strings of length
20, each scan text holds about 2100 characters.

Candidates for `arr[i]` are grouped by length, shortest first, and within a
length the distinct substrings are visited in sorted order; the first one
absent from the scan text is therefore the shortest uncommon substring and,
among those of that length, the lexicographically smallest. If no length
yields a survivor the answer for that index stays the empty string — which
is exactly what happens when another array entry equals `arr[i]`.

**Complexity:** `O(n² · L²)` time for string length `L` (per string: up to
`L(L+1)/2` candidates, each searched in a text of ~`nL` characters), `O(nL)`
space.
