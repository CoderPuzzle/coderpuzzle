# Solutions — Design an Ordered Stream

## Slot Array With a Frontier Pointer

The stream keeps one array slot per id — index 0 unused, ids are
1-based — and a pointer `ptr` marking the next id the output is waiting
for, initialized to `1`. A value that arrives before its turn is simply
parked in its slot; nothing about arrival order is recorded beyond the
parked values themselves, because the only thing that ever matters is
whether the slot at `ptr` is filled yet.

`insert` stores its value at `slots[idKey]`, then drains: while the slot
at `ptr` is filled, append its value to the chunk and advance `ptr`. The
loop stops at the first still-missing id, so the chunk is exactly the
run of consecutive inserted values starting where the output left off —
the largest chunk of currently inserted values that can appear next in
the order. Inserting an id beyond a hole returns an empty chunk and
changes nothing but that one slot.

Every value enters exactly one chunk exactly once, and `ptr` only ever
moves forward, so across all `n` inserts the drain step visits each slot
a constant number of times — linear total work, amortized constant per
insert — with the `n`-slot array as the only state the class carries.

**Complexity:** `O(n)` total across all inserts (amortized), `O(n)` space.
