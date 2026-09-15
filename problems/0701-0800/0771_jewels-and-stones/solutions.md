# Solutions — Jewels and Stones

Every stone asks one question — is my letter a jewel type — and the answer
only has to be cheap. There are at most 50 jewel types, all distinct and all
case-sensitive English letters, while the stones may repeat a type freely, so
the work splits cleanly: pay once to record the types, then answer each stone
in constant time. With `J` and `S` the lengths of `jewels` and `stones`, that
budget is `O(J + S)`.

## One table of jewel types

Record every jewel letter in a direct-indexed 128-slot table keyed by ASCII
code, then scan `stones` once and count the characters whose slot is marked.
Case sensitivity costs nothing here: `'a'` (code 97) and `'A'` (code 65) are
simply different slots, so the two types stay distinct with no folding and no
comparisons — the letter itself is the address.

The guarantee that `jewels` holds no repeated character makes the recording
pass idempotent; each of at most 50 marks lands once. Duplicates in `stones`
count individually, which is the whole semantics: against `jewels = "aA"` the
string `"aAAbbbb"` contributes its one `a`, its one `A`, and none of its four
`b`s, for a count of 3. Nothing about the scan depends on the order of either
string, and a stone absent from the table falls through with the same single
lookup a match costs.

**Complexity:** `O(J + S)` time, `O(J)` space.
