# Solutions — Candy

Both answers grow out of the same reading: the strict comparisons chop the
line into monotone slopes that meet at peaks, and every unit of weight above
the floor is there because some slope demands it. The sweep acts on that
reading mechanically — it writes a weight at every position, satisfies the
left-hand rule going in and the right-hand rule coming back, then sums what
it wrote. The run arithmetic skips the writing altogether: each mountain is
two triangular series sharing a peak, so the total can be accumulated from
three counters that merely measure how far the current slope has run.

## Two-Pass Neighbor Sweep

Initialize every child with one candy, the minimum allowed. A left-to-right pass then enforces the left-neighbor rule: whenever `ratings[i] > ratings[i - 1]`, set `candies[i] = candies[i - 1] + 1`, the smallest value that both exceeds the left neighbor's allotment and respects everything already fixed in the prefix. After this pass, only right-neighbor violations can remain.

A right-to-left pass enforces the right-neighbor rule symmetrically: for `ratings[i] > ratings[i + 1]`, set `candies[i] = max(candies[i], candies[i + 1] + 1)`. The `max` is the crucial detail — it can only raise a count, never lower it, so the second pass's fixes cannot undo the first pass's left-neighbor guarantees. A child sitting on a rising-then-falling ridge ends up with one more than the length of the longer adjacent monotone run, exactly the minimum the two constraints force, so summing the array yields the least total candy.

Equal neighboring ratings impose no constraint — both comparisons are strict — which is why `[1,2,2]` distributes as 1, 2, 1 with the third child keeping a single candy. Every child retains at least the initial one candy, satisfying the lower bound throughout.

**Complexity:** `O(n)` time, `O(n)` space.

## Run-Length Slope Arithmetic

The sweep settles positions one by one, but the shape it converges to has a
closed form. Between two flats — or an end of the line — the ratings form a
single mountain: a strictly rising leg of `a` positions ending at a peak,
then a strictly falling leg of `b` positions after it. On the rising leg the
weights have no choice: each step up must clear the one below, so they read
`1, 2, ..., a`, and the falling leg read up from its valley is
`1, 2, ..., b` for the same reason. A mountain therefore costs
`a(a+1)/2 + b(b+1)/2`, plus one more unit for every step by which `b + 1`
exceeds `a` — the peak belongs to both series and must top the taller, which
pins it at `max(a, b + 1)`.

No run is ever materialised. Three counters carry the whole computation:
`up` counts consecutive rises, `down` consecutive falls, and `peak` remembers
how long the ascent into the current peak was. A rise adds `up + 1`, the next
term of the rising series. A fall adds `down` — one for the new valley floor
and one for each earlier falling position, every one of which just grew by a
step — and a further `1` the moment `down` passes `peak`, which is the peak
itself being pushed up. Nothing is stored per position and no weight is ever
assigned; the total is simply accumulated as the slopes are walked.

Flats are the seams. Equal neighbours constrain nothing, so a flat is valley
ground where mountains touch: it contributes its plain `1`, zeroes every
counter, and both slopes restart after it. `[1, 2, 2, 1]` is two one-step
mountains sharing a summit plateau, costing `3 + 3 = 6` — exactly the
`1, 2, 2, 1` the sweep produces — and `[6, 6, 6, 6]` is four flats and
nothing else, costing `4`.

Each series is a lower bound as well as a tally: the `k`-th position up a
climb must weigh at least `k`, because the `k - 1` positions below it are
forced the same way all the way down to the valley, and the mirror argument
runs down every descent. The counters never add anything beyond these forced
values plus the correction the shared summit requires, so the arithmetic
lands on the same minimum the sweep reaches — without ever naming a weight.

**Complexity:** `O(n)` time, `O(1)` space.
