# Solutions — Poor Pigs

## The base-(rounds + 1) digit count

The time budget buys feeding rounds: `r = minutesToTest // minutesToDie` of
them, because a partial extra wait is too short to ever observe a death.
Across those rounds every pig ends in exactly one of `r + 1` states — it
dies in round 1, 2, ..., `r`, or it survives them all — so a pen of `p`
pigs produces at most `(r + 1)^p` distinct outcome vectors, whatever the
schedule. Example 1 is the smallest case in the flesh: at 15/15 there is
`r = 1` round, two pigs carry `2^2 = 4` vectors, and the four enumerated
outcomes (first only, second only, both, neither) are precisely those
vectors pointing at buckets 1, 3, 2, 4. The minimum is therefore the
smallest `p` with `(r + 1)^p >= buckets`.

Both directions of that bound are constructive. To achieve it, write each
bucket's index in base `r + 1` with `p` digits and feed pig `j`, in round
`t`, exactly the buckets whose `j`-th digit equals `t`: the poison's code
then spells itself out in the deaths — pig `j` dies in round `digit_j`, or
never when the digit is 0 — so decoding is unique, which is Example 2's
two-round schedule in generalized form (there `r = 2`, states = 3, and
`3^2 = 9 >= 4`). To see fewer pigs cannot win, run the count backwards:
`p - 1` pigs offer only `(r + 1)^(p-1)` outcome vectors, fewer than there
are buckets, and no adaptive plan can distinguish more buckets than it has
vectors. The classic ceiling case falls out the same way —
`buckets = 1000`, `minutesToDie = 15`, `minutesToTest = 60` gives
`r = 4`, states = 5, and since `5^4 = 625 < 1000 <= 3125 = 5^5`, five pigs.

The method multiplies its way to that boundary instead of taking a
logarithm. Coverage starts at 1 — so `buckets = 1` needs no pig at all —
and grows by one factor of `states` per pig until it reaches `buckets`.
Integer multiplication decides power boundaries like `512 = 2^9` versus
513 exactly, where a floating `ceil(log(buckets) / log(states))` can round
to the wrong side. The domain keeps it tiny: `buckets <= 1000` and
`states >= 2` cap the loop at ten steps, and the running product never
exceeds `buckets * states <= 101000`, far inside every fixed-width
integer.

**Complexity:** `O(log buckets)` time, `O(1)` space.
