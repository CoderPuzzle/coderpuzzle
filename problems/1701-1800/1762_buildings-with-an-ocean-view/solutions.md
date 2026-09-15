# Solutions — Buildings With an Ocean View

A building sees the ocean exactly when it strictly exceeds every
building to its right — that is, when it exceeds the maximum of the
suffix that follows it. One number per building decides everything.

## Right-to-left running maximum

Sweep from the ocean inward carrying the tallest height seen so far,
seeded at 0 (no building to the right of the last one). Each building
that strictly tops the running maximum has an unobstructed view; it
then becomes the new maximum for everything further left. Equal
heights block — a building matching the suffix maximum does not see
over its twin. Indices are collected right-to-left and reversed once
at the end to satisfy the ascending order.

On `[4,2,3,1]` the sweep sees 1, then 3 (view), then 2 (blocked by
3), then 4 (view), yielding `[0,2,3]`. On `[4,3,2,1]` every building
sets a new maximum, so all four qualify. Heights reach `10^9`, which
fits comfortably in 32 bits.

**Complexity:** `O(n)` time, `O(n)` space (output).
