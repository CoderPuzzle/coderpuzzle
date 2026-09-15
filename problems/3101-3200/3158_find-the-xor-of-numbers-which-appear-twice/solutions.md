# Solutions — Find the XOR of Numbers Which Appear Twice

The guarantee "each number appears once or twice" splits the array into
two disjoint camps: the singles and exactly one copy per duplicated
value. The answer asks only about the second camp, so the job is a
frequency census followed by folding the twice-occurring values into an
XOR accumulator.

## Frequency tally, then fold

One pass builds a value → count map. A second, shorter pass over the
map's entries XORs each value whose count is exactly two into the
accumulator; values appearing once are skipped rather than folded in,
since they would corrupt the result — XOR is self-canceling over pairs
but not over single occurrences. The map deduplicates automatically, so
each duplicated value contributes exactly once no matter how many other
pairs surround it.

Two behaviors worth noting: if nothing repeats the accumulator never
leaves 0, matching the required fallback; and even genuine duplicates can
cancel to 0 when their values do — `[1,1,2,2,3,3]` yields `1 ^ 2 ^ 3 =
0` — which the count-gated fold handles correctly since every triple of
distinct duplicated values still enters the XOR exactly once. Values are
bounded by 50 (6 bits), so `i32`/`int` arithmetic everywhere is safe by
a wide margin.

**Complexity:** `O(n)` time, `O(V)` space (V = distinct values).
