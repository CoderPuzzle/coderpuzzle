# Solutions — Find a Value of a Mysterious Function Closest to Target

## Distinct AND-values per right endpoint

Checking every `(l, r)` pair directly is quadratic, but bitwise AND has a
useful monotonic property: extending a subarray to the right can only
clear bits, never set them, so as `l` decreases for a fixed `r` the value
of `func(arr, l, r)` can only stay the same or lose bits. That means the
set of distinct values taken by `func(arr, l, r)` over all `l <= r`, for a
fixed `r`, is small — each new element can turn off at most the handful
of bits present in the values, so the set never grows past roughly
`log2(max(arr))` entries.

The algorithm walks `arr` left to right, keeping `prev`, the set of
distinct AND-values ending at the previous index together with the AND
itself. At each new index `arr[i]`, the new set is formed by ANDing
`arr[i]` with every value in `prev` and adding `arr[i]` alone (the
subarray that starts and ends at `i`); duplicate values collapse
naturally since it is a set. Every value produced this way is some
`func(arr, l, i)` for a valid `l`, so comparing each one against `target`
and keeping the smallest `|value - target|` seen across all indices finds
the global minimum without ever enumerating both endpoints explicitly.

Because the set at each step has at most `O(log(max(arr)))` distinct
values, and building the next set touches every value in the previous
one exactly once, the whole scan does `O(n log(max(arr)))` work in total.

**Complexity:** `O(n log(max(arr)))` time, `O(log(max(arr)))` space.
