# Solutions — Maximum Element After Decreasing and Rearranging

Rearranging is free, so only the sorted order of the multiset matters:
any valid arrangement must start at `1`, and a decreasing operation can
never raise a value. The largest element is therefore bounded by the
longest chain the values can support, where each step may advance the
running value by at most one — and sorting exposes that chain greedily.

## Sort, then clamp each element to prev + 1

Sort ascending and sweep once: keep `cur`, initialized to `1` (the forced
first element), and for each subsequent value set `cur = min(cur + 1,
v)` — an element can be raised to at most one above the previous position
and can never be raised above its own value. Because the array was
sorted, every later value is at least as large as the earlier ones, so
clamping to `cur + 1` never wastes capacity: any arrangement's maximum
is at most this running count, and the constructed sequence achieves it.
The final `cur` is the answer.

One sort plus one linear pass.

**Complexity:** `O(n log n)` time, `O(1)` extra space (in-place sort).
