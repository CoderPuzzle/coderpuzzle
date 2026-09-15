# Solutions — Maximum Number of Balloons

## Count Letters, Divide, Take the Minimum

Order never matters — only how many copies of each letter the text holds.
One pass over `text` fills a 26-slot frequency table. The word "balloon"
needs `b`, `a`, and `n` once but `l` and `o` twice, so the number of
instances each letter supports is its count divided by its demand: `b`
allows `count[b]` instances, `l` allows `count[l] / 2`, and so on. Every
instance consumes one share from _every_ letter simultaneously, so the
scarcest letter caps the whole word — the answer is the minimum of those
five quotients.

Letters outside the five are ignored entirely; a missing letter simply
divides zero and drives the answer to 0, as with "leetcode". No search or
simulation over arrangements is needed — the arithmetic settles it in one
scan plus five divisions.

**Complexity:** `O(n)` time for the counting pass over `n = text.length`,
`O(1)` space (a fixed 26-entry table).
