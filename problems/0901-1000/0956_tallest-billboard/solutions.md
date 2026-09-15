# Solutions — Tallest Billboard

## Dynamic programming on the height difference

Every rod has three fates — welded into the left support, welded into the
right one, or thrown away — and a build only counts when the two stands finish
at the same height. Enumerating the 3^n assignments is far out of reach, and
the heights themselves are too loose a handle: which pair of heights is
"better" depends on everything still to come. The one quantity that decides
compatibility with a perfect finish is the gap `left - right`, so that
difference is the state.

Keep a map from difference `d` to the tallest left support any build reaches
with that difference, seeded with `d = 0` at height 0. Each rod relaxes every
entry three ways: welding left moves the difference to `d + rod` and the
height to `left + rod`, welding right moves the difference to `d - rod` and
leaves the height alone, discarding changes nothing. Among builds sharing a
difference, only the tallest left support can matter — the right height is
pinned by `right = left - d`, and both welding moves pay off monotonically in
`left` — so one height per difference is a faithful summary. At the end
`d = 0` holds equal stands, and its recorded height is the answer.

Differences never leave `[-total, total]` for `total` the sum of all rods, so
the map is one flat array of `2 * total + 1` slots indexed by `d + total`,
with `-1` marking differences no build reaches. Each rod rebuilds the array
in a single pass over its populated slots.

**Complexity:** `O(n·S)` time, `O(S)` space, where `S` is the total length of
all rods.
