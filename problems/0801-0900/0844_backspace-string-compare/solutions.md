# Solutions — Backspace String Compare

The final text each string types out is fixed by its characters alone, and
the deletion structure is local: read right-to-left, every `#` condemns the
nearest character to its left that is still alive. That makes equality a
backward walk — no rebuilt strings needed.

## Reverse walk with skip counters

Walk one index from the end of each string. A `settle` helper pushes each
index leftward past everything that does not survive: a `#` banks one skip,
a live character first pays a banked skip, and the first character that owes
nothing is a survivor. Reading this direction is exactly the editor's rule —
a `#` deletes the closest surviving character to its left, a `#` arriving
after everything to its right is already condemned (or at the empty start)
deletes nothing at all, which is why backspacing an empty text leaves it
empty. A `#` never survives to be deleted by a later `#`; it always acts,
never persists.

The main loop settles both indexes and compares the survivors pairwise,
returning `false` at the first unequal pair. When either index falls off the
left end, the answer is whether both fell off together: both texts empty
count as equal, a lone survivor decides `false`. Raw lengths say nothing —
`ab#c` and `ac` type out identically — so the walk, not a length check,
decides.

Each index only ever moves left, and `settle` resumes from where the last
call stopped, so every character of both strings is visited a constant
number of times and nothing is copied.

**Complexity:** `O(n + m)` time, `O(1)` space.
