# Solutions — Guess the Majority in a Hidden Array

## Anchor trio against the field

Fix indices `0`, `1`, `2` as a referee trio and compare them against
every other index with `query(0, 1, 2, i)`. Because the trio never
changes, that call is a function of `nums[i]` alone, and — since a
binary value only has two settings — the function takes exactly one of
two possible answers across the whole array. So every `i` from `3` to
`n - 1` falls into one of two buckets, without yet revealing which
bucket holds which actual value, or even whether the trio itself is
unanimous or a `2`-`1` split.

A `4` anywhere settles that at once: the trio is unanimous (a `4` needs
all four entries equal), so both buckets are now readable — one bucket
matches the trio's shared value, the other (answered `2`) is the
minority. A `0` anywhere settles the opposite case: a `2`-`2` spread
against an already-mixed trio only happens when the fourth entry sits
on the trio's minority side, so the bucket answered `2` matches the
trio's majority value and the bucket answered `0` is the minority.
Either sighting also fixes how many of the trio itself belong to each
bucket (`3`-`0` or `2`-`1`), so tallying each bucket's tail members
plus its trio contribution gives the true counts; return an index from
the larger bucket, or `-1` on a tie.

The one gap is every query answering `2`, which only happens when every
index past the trio shares one hidden value `v` — the per-index
function is injective, so a constant answer forces a constant input,
and since the array holds at least five entries, indices `3` and `4`
both equal `v`. One further call, `query(0, 1, 3, 4)`, compares the
trio's first two entries against that now-known-equal pair; combined
with the `3`-`1` split already seen at index `3`, it pins down exactly
how many of the trio equal `v`, closing the count — and, if `v` turns
out to be the minority, naming a trio index that holds the majority
value instead.

**Complexity:** `O(n)` calls to `query` (at most `n - 2`, well inside
the `2n` budget), `O(n)` extra space.
