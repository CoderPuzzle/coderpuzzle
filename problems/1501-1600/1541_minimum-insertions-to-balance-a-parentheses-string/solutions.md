# Solutions — Minimum Insertions to Balance a Parentheses String

## Greedy single pass

Walk `s` once while tracking `open`, the number of `(` seen so far that are
still waiting for their `))`. Each `(` simply increments `open`. Each `)`
is handled together with whatever follows it: if the next character is
also `)`, the two form one complete closing pair and the scan advances
past both; otherwise this `)` is a lone straggler that would need an
inserted `)` right after it to complete a pair, so the answer gains one
and the scan advances past just this character. Either way, one closing
pair has now been accounted for, and it must be charged against a waiting
`(`: if `open` is positive, decrement it; if `open` is already zero, this
pair has no opener to belong to, so the answer gains one for the missing
`(`.

This mirrors exactly how the string would be repaired left to right: a
stray `)` gets its missing partner inserted on the spot, and a `))` pair
with no opener gets an inserted `(` placed just before it. Once the scan
finishes, every `(` still left in `open` never found its `))`, so each one
needs a full pair appended at the end — the answer gains `2 * open` more.
Summing the per-character corrections with this final flush gives the
minimum number of insertions.

**Complexity:** `O(n)` time, `O(1)` space.
