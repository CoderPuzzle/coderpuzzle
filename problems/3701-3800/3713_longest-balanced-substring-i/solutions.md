# Solutions — Longest Balanced Substring I

## Fixed-left sweep with incremental counts

Enumerating every substring from scratch would recount each window and cost
cubic time. Instead, fix the left endpoint `i` and grow the right endpoint `j`
one character at a time: each step adds a single letter to the window, so the
26-bucket count array updates in constant time, together with `distinct` (how
many letters are live) and `top` (the largest count among them). Because
`i` is fixed while `j` advances, counts only ever rise inside one sweep, so
`top = max(top, counts[c])` after the increment is exact.

A window of length `len` over `distinct` live letters is balanced precisely
when all their counts are equal, and since the counts sum to `len`, that
happens exactly when `distinct * top == len`: if the equality holds, every one
of the `distinct` counts sits between the average `len / distinct = top` and
the maximum `top`, so all equal `top`. This also covers the single-letter case
for free — one live letter gives `distinct = 1` and `top = len` for any run.
Each balanced window is a candidate answer, so the sweep records the best
length seen.

After resetting the counters per left endpoint (constant work per `i`), the
double loop touches each window once with constant-time bookkeeping. With
`s.length <= 1000` that is at most about half a million windows, comfortably
inside the limits.

**Complexity:** `O(n²)` time, `O(1)` space.
