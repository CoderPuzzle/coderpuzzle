# Solutions — Degree of an Array

## Count, first index, and last index in one pass

A subarray matches the array's degree only by holding every copy of some value
at that frequency — drop one copy of that value from the window and its count
falls short. So for each value the only candidate window is exactly the
stretch from its first occurrence to its last: nothing shorter can contain
all its copies, and nothing longer is needed, because that stretch already
holds the value's full frequency.

The scan keeps three hash maps — occurrence count, first index, last index —
updated in a single left-to-right pass: the count increments on every
sighting, the first index is written only where the value is first seen, and
the last index is overwritten on every sighting so it settles on the final
one. Afterwards the degree is the maximum count, and the answer is the
smallest `last - first + 1` over the values whose count equals it.

Values below the degree never matter: their spans cannot reach the degree no
matter how tightly they nest. When several values tie at the degree, their
spans compete directly, and the winner is simply the most compact one — as in
`[1,2,2,3,1]`, where 1 spans the whole array while 2 spans only two slots.

**Complexity:** `O(n)` time, `O(n)` space.
