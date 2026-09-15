# Solutions — Find the Highest Altitude

The altitudes along the trip are the prefix sums of `gain`, prefixed by
the starting point's altitude of 0: point 0 sits at 0, point 1 at
`gain[0]`, point 2 at `gain[0] + gain[1]`, and so on. The answer is the
largest value on that profile — and since the profile starts at 0, a
trip that only ever descends still peaks at its start.

## Running altitude sweep

Keep two scalars: the running altitude, and the best altitude seen so
far, both seeded to 0 so the starting point counts as a candidate
before any gain is absorbed. Each step adds one `gain[i]` to the
running altitude — arriving at point `i + 1` — and raises the best to
match whenever the new altitude tops it. After the sweep, the best is
the highest of all `n + 1` altitudes, because every altitude was the
running value at exactly one step (and the start's 0 was the seed).

On `[-5,1,5,0,-7]` the running altitude visits 0, -5, -4, 1, 1, -6; the
best lifts from 0 to 1 at the third point and never moves again. On the
all-descent `[-4,-3,-2,-1,4,3,2]` the running value tops out at -1 and
never reaches the seed, so the answer stays 0 — the start itself is the
highest point. With `n <= 100` and `|gain[i]| <= 100` every altitude
fits in 32 bits with room to spare (`|altitude| <= 10^4`), and the
sweep stores nothing beyond the two scalars.

**Complexity:** `O(n)` time, `O(1)` extra space.
