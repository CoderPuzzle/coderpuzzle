# Solutions — Find All Numbers Disappeared in an Array

Both methods answer one membership question: a value is missing exactly
when nothing in the array claims it, and the only candidates are the
`1..n` window the values themselves live in. The hash set keeps the claims
in a plain set — one insert per element — then walks the candidates in
increasing order, keeping the ones the set cannot confirm. In-place sign
marking rents the array's own signs as the claim table instead, so the run
needs no storage beyond the array and its output. Neither method sorts
anything: both read the answer off an in-order walk — candidates `1..n`
ascending for the set, slots `0..n-1` (slot `i` standing for value `i + 1`)
for the marks — so the pinned ascending output costs nothing in either.

## Hash set over the values

The direct reading asks one question per candidate: is this value anywhere
in the array? A hash set answers it in expected constant time, so the naive
scan-and-search collapses to two linear passes. The first feeds every
`nums[i]` into the set; repeats are harmless, since a value already present
just overwrites its own entry. The second walks the candidates
`1, 2, ..., n` in increasing order and keeps every value the set does not
hold.

That walk is also where the required ordering comes from. The set carries
no order of its own, but the candidates are enumerated ascending, so the
answer leaves the loop already sorted — the same free ride index order
gives the marking sweep below, taken over values instead of slots.

For `nums = [3,1,1,4,2]` the set ends holding `{1, 2, 3, 4}`; candidates 1
through 4 each find themselves recorded, 5 does not, and the answer is
`[5]`. The bill is one insert per element plus at most `n` membership
tests, and the set is the only storage beyond the output.

**Complexity:** `O(n)` time, `O(n)` space.

## In-place sign marking

Because every value lies in `[1, n]`, the array's own indices can serve as the
hash table: value `v` is assigned slot `v - 1`. One linear pass reads each
element, maps it to its slot, and flips that slot's sign to record "value
seen". Reading `abs(nums[i])` keeps the pass correct even when the element
being read has already taken a flip from an earlier visit, and repeats are
harmless: only the first visit to a slot changes anything.

A second sweep then reads the marks back. Slot `i` still positive means the
value `i + 1` was never written anywhere in the array, so it belongs to the
answer; collecting in index order gathers the values ascending by
construction, which is exactly the order this judge pins. The same sweep
restores every negative mark with `abs`, leaving the array exactly as it
arrived.

Both passes touch nothing but the array plus the output list, and the
follow-up excludes the returned list from the space budget, so the whole
answer to "without extra space" is just these two sweeps.

**Complexity:** `O(n)` time, `O(1)` auxiliary space, excluding the output.
