# Solutions — Compare Strings by Frequency of the Smallest Character

## Sort Word Frequencies, Binary-Search Each Query

Computing `f(s)` is cheap: find the smallest character of the string, then
count how often it appears — at most ten steps for these lengths. The naive
answer recomputes `f` over every word for every query, 4 million string
scans at full size. The observation that removes that cost: a query only
ever asks _how many_ word frequencies exceed its own, never _which_ words —
so the words can be reduced to their frequencies once and reordered freely.

Sort the word frequency array. Every value strictly greater than the
query's `f(queries[i])` now forms one suffix of that array, and binary
search finds where the suffix starts: the first position holding a value
above the query. The suffix length is the answer. Equal values land left of
the boundary and are correctly excluded, since the comparison is strict.
Each query costs one search instead of a scan of raw strings.

**Complexity:** `O((n + m) · L)` to reduce all strings of length `L`, plus
`O(n log n)` to sort and `O(m log n)` for the queries — with `n` words,
`m` queries; `O(n)` extra space for the frequency array.
