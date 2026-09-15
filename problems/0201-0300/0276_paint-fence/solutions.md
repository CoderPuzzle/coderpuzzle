# Solutions — Paint Fence

## Rolling same/different counts

The only fact about an already-painted prefix that can constrain the next
post is whether its last two posts share a color — three in a row is the one
forbidden shape. So the ways to paint a prefix split into two counts: `same`,
where the final two posts match, and `diff`, where they differ. The prefix of
one post seeds them: nothing precedes it to match, so `same = 0` and all `k`
colors land in `diff`.

Extending by one post, a same-color finish is possible only after a differing
pair (the color is then forced), and a differing finish picks any of the
`k - 1` other colors after any prefix at all. That is the pair of transitions
`same = diff` and `diff = (same + diff) * (k - 1)`, rolled in place until `n`
posts are painted, with `same + diff` the answer. The seeds already carry the
small cases: `n = 1` returns `k` untouched, `n = 2` totals `k²` because a
two-post fence may repeat a color, and with `k = 1` the `k - 1` factor drives
both counts to zero from the third post on.

Two rolling variables do all the work, so the space is constant regardless of
`n`. Every partial count along the way is bounded by the final answer, which
the constraints cap below `2³¹ - 1`; fixed-width languages still roll the
counts in 64 bits so the intermediate products are never in doubt.

**Complexity:** `O(n)` time, `O(1)` space.
