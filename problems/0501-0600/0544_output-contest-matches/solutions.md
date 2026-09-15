# Solutions — Output Contest Matches

## Strong-weak fold of bracket strings

Hold one bracket string per surviving side of the tournament, in round
order — initially the labels `"1"…"n"` themselves. Each round is a fold of
that list against its own reverse: side `i` meets side `m-1-i`, exactly the
rather-strong-vs-rather-weak pairing the statement demands, and the match is
recorded as `"(" + a + "," + b + ")"`. The fold halves the list, and because
`n` is a power of two the halving is exact every round, so after `log2 n`
rounds exactly one side — the complete bracket — remains, and it is the
answer. The degenerate `n = 2` folds once and yields `"(1,2)"`; at `n = 16`
the structure is already visible — `((1,16),(8,9))` and `((4,13),(5,12))`
under one roof, then mirrored by `((2,15),(7,10))` and `((3,14),(6,11))` —
and by `n = 32` the same three-round shape nests once more.

The separator inside every pair is a bare comma with no following space. The
statement's round-by-round lines do show `", "` between the sides, but both
final outputs — `"((1,4),(2,3))"` and `"(((1,8),(4,5)),((2,7),(3,6)))"` —
contain no spaces anywhere, so the pinned format is comma-with-no-space at
every level of nesting; the judge compares strings exactly.

Each round re-carries every label once plus the accumulated brackets, and
inside this domain no label exceeds four digits, so a round costs work
proportional to its `Θ(n)` characters and the `log2 n` rounds build
`O(n log n)` characters in all. The answer alone accounts for that bound:
`n` labels, `n - 1` pairs of parentheses and `n - 1` commas — at
`n = 4096` that is 15,277 digit characters against 12,285 brackets and
commas, 27,562 in total.

**Complexity:** `O(n log n)` time, `O(n log n)` space — the answer string
itself is Θ(n log n) characters.
