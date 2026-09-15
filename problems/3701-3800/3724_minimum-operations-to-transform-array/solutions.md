# Solutions — Minimum Operations to Transform Array

## Tail-to-span gap

The two lengths differ by exactly one, and appending is the only operation
that grows the array — so every plan performs precisely one append, and the
copy it takes lands after everything else. Relative order never changes:
each original index keeps its slot in the final array, and one chosen index
j additionally supplies the appended tail through its snapshot. Every other
slot i is pure unit nudging from nums1[i] to nums2[i], costing exactly
|nums1[i] - nums2[i]| operations — no plan can beat that, and walking
straight there achieves it.

Slot j does double duty: its element must end at nums2[j] while its
snapshot must end at nums2[n]. Take the snapshot at some moment of the
element's life; whatever value v it carries then, the element travels
nums1[j] to v to nums2[j] (at least |nums1[j] - nums2[j]| moves) and the
copy travels v to nums2[n] (at least |v - nums2[n]|), plus one for the
append itself. Moving v off the span between nums1[j] and nums2[j] only
lengthens both journeys, so the best snapshot clamps nums2[n] onto that
span: slot j's total is |nums1[j] - nums2[j]| + 1 + the distance from
nums2[n] to the span.

Summing slot j's terms over every candidate j, everything but that final
distance cancels against the fixed per-slot costs — the answer is
sum(|nums1[i] - nums2[i]|) + 1 + min over j of the tail-to-span distance.
One pass accumulates the sum and a second finds the smallest distance; the
total reaches about 5 x 10^10 at the constraints' extremes, past 32-bit
range but comfortably inside 64 bits. The problem is never impossible: a
single append always closes the length gap.

**Complexity:** `O(n)` time, `O(1)` space.
