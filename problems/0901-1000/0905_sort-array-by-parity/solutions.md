# Solutions — Sort Array By Parity

The condition is a partition rather than a sort: every even value must land
ahead of every odd value, and the pinned answer adds that each group keeps its
input order. One scan that routes each value into an even group or an odd group
as it is read produces exactly that — the two groups concatenated are the
answer, with no value ever compared against another by magnitude.

## Stable split into two groups

Walk `nums` once, test `value % 2 == 0`, and append to the even group or the
odd group accordingly. A value's position inside its group is its arrival
order, which is precisely the input order the pin asks each group to keep;
values never cross within a group, and every even precedes every odd by
construction, since the whole even group is emitted before the first odd. Zero
joins the evens — `0 % 2 == 0` — and the bounds need no care: parities of
`0` through `5000` are well defined for any 32-bit integer.

The array-typed languages preallocate the answer of length `n` and fill it
with two sweeps of `nums` — the evens first, then the odds — which writes the
same concatenation without intermediate lists; the remaining languages build
the two lists and join them. Either way every element is read a constant
number of times and written exactly once.

The classic alternative, an in-place two-pointer swap, also reaches evens
before odds, but it is unstable — a swap can reorder the values inside a
group — so it does not produce the pinned answer. Producing all `n` output
values puts a linear floor under any correct method, and this split meets it
while keeping each group in input order.

**Complexity:** `O(n)` time, `O(n)` space.
