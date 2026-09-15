# Solutions — Find Missing Elements

## Presence sweep across the range

The boundaries of the answer are already known: the smallest and largest
values of nums delimit the original range, and every integer between them is
either still present or missing. So one pass over nums records presence — a
boolean slot per value is enough here because values never exceed 100 — and
a second pass walks the range from its minimum to its maximum, emitting each
value whose slot was never marked. Walking the range in increasing order
makes the output sorted by construction; no separate sort pass is needed.

The degenerate shapes resolve themselves inside this sweep. When nothing went
missing, every slot in the range stays marked and the walk collects nothing,
which is exactly the required empty list; when nums has shrunk to just its
two endpoints, the walk emits everything in between. Duplicate values could
not disturb the marking anyway — repeated writes land on the same slot —
though the statement guarantees uniqueness. And with at most 100 elements
over values bounded by 100, the original range spans at most 100 integers,
so both passes stay trivially small.

**Complexity:** `O(n + m)` time, `O(m)` space — where `m = max - min + 1` is
the width of the original range.
