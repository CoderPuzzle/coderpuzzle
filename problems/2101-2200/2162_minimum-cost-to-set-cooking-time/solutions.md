# Solutions — Minimum Cost to Set Cooking Time

## Enumerate the minute count

Everything the microwave can display is a pair `mm:ss` with both fields in
`[0, 99]`, and a pushed sequence is worth considering only when
`60 * mm + ss == targetSeconds`. For each `mm` in `[0, 99]` the implied
seconds are `targetSeconds - 60 * mm`; the pair survives when that value
also lands in `[0, 99]`, which for every `targetSeconds` up to 6039 happens
for at least one `mm` (below 6000 seconds take `mm = targetSeconds / 60`,
above it only `mm = 99` remains). At most a hundred candidates, so they can
all be priced and the minimum kept.

Pricing one pair starts from the four digits the microwave normalizes to,
`mm / 10, mm % 10, ss / 10, ss % 10`. Pushing at most four digits means the
leading zeroes need not be pushed at all, and since every push costs at
least one unit (and a move at least one more), the cheapest entry for a
fixed pair is always the zero-stripped digit sequence. A finger variable
starts at `startAt` and walks that sequence: each digit different from where
the finger rests adds `moveCost` and relocates the finger, and every digit
adds `pushCost`. The example-1 arithmetic falls out directly — `10:00` from
finger 1 costs `1 + 2 + 1 + 1 + 1 = 6`, beating both `09:60` spellings.

**Complexity:** `O(1)` time (at most 100 candidates of four digits each),
`O(1)` space.
