# Solutions — Sort Integers by Binary Reflection

Simulate and sort, exactly as the definition reads. Every value's
reflection depends on that value alone, so the work splits into one
reflection pass and one ordering pass. The ordering runs on the composite
key `(reflection, value)`, spelled out explicitly rather than left to a
language's stable-sort behavior — stability guarantees differ across the
runtimes, and the smaller-value tie-break must hold in every one of them.

## Reflect Once, Sort on the Pair

Computing one reflection is a three-step walk: write the value in binary
without leading zeros, reverse that string, and read it back as a number.
The read-back step absorbs the interesting cases on its own. Reversing
may plant zeros at the front of the string — `100` becomes `001` — and
parsing drops them, so trailing zeros of the original simply vanish; that
is why every power of two reflects to `1`, the smallest reflection
reachable in the domain, and why powers of two always migrate to the front
of the answer in ascending order. Patterns of all ones reflect to
themselves, so repunits keep their relative order. Values whose binary
forms differ only by trailing zeros land on the same reflection (`11`,
`110`, and `1100` all become `3`) — real collisions the tie-break resolves
by original value. With at most thirty bits per value and at most one
hundred values, the whole pass is far below any limit.

Sorting then orders the values by their pairs directly: primary compare on
the reflection, secondary on the value. Because every reflection fits in a
machine word, each comparison costs constant time and the sort dominates
nothing — the total stays linearithmic with a linear pass in front.

**Complexity:** `O(n · b + n log n)` time, `O(n)` space — where `b` is
the bit length of the largest value.
