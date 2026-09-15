# Solutions — Stamping The Sequence

Building `target` forwards from a blank canvas buries the choice of each
early stamp under everything stamped after it, but read backwards the puzzle
falls apart: the last stamp to cover a position leaves exactly the stamp's
own letter there, so undoing is a sequence of erasures, each of which must
land on a window that already matches the stamp. That reversed view is what
the pinned answer asks for, and it makes the construction greedy.

## Greedy erase, leftmost window first

Keep a work copy of `target` and repeatedly look for a window in which every
character either equals its `stamp` counterpart or has already been erased
to `'?'`. Erasing such a window is always safe: erasure only turns letters
into `'?'`, and a `'?'` accepts any stamp character, so no not-yet-erased
window is ever blocked by an earlier erasure — if any erasing order exists,
the leftmost-first one does. Each accepted window must still contain a
letter; an all-`'?'` window is a wasted turn that would loop forever, while
requiring progress bounds the loop at `n` rounds. A full scan that finds no
erasable window while letters remain proves no order exists at all — the
first erasure of any order would have had to match the unmodified string —
so the answer is empty.

The recorded indices come out in erasing order, which is stamping order run
backwards; reversing them yields the turns in the order they are played,
and each erasure removing at least one letter keeps the sequence within `n`
moves, far inside the `10 * target.length` allowance.

**Complexity:** `O(n · m · n)` time, `O(n)` space.
