# Solutions — Move Zeroes

Two in-place compactions that agree on the reading sweep and part ways over
the zeros. The write index declines to carry them at all: non-zero values
are copied forward, and the tail is declared zero afterwards in a second
short pass. The snowball keeps every zero and rolls the whole pack of them
rightward — each non-zero it meets vaults the pack in a single exchange.

## Two-Pointer In-Place Swap

The solution keeps two pointers moving left to right: `fast` scans every element, while `slow` marks where the next non-zero element belongs. Everything before `slow` is the stabilized prefix of non-zero values in their original order; everything from `slow` to `fast` contains only zeros (or values already swapped forward).

Whenever `fast` lands on a non-zero value, the code swaps it with the element at `slow` and advances `slow`. When the value is zero nothing happens, so the zero is left behind to be part of the trailing block. Because non-zero elements are written in the order they are encountered, their relative order is preserved, and zeros naturally accumulate at the end.

The swap-based form answers the follow-up about minimizing operations: when `slow == fast` (the common case of a prefix with no zeros yet) the swap exchanges the element with itself, and the first zero only starts moving once a non-zero appears after it. Each zero is swapped forward at most once per non-zero that follows it, rather than being repeatedly bubbled.

Edge cases are handled for free: an array of all zeros never performs a swap, a single-element array returns itself, and an array with no zeros just "swaps" every element with itself in place. The array is modified in place with no copy, as required.

**Complexity:** `O(n)` time, `O(1)` space.

## Snowball Swap

Two cursors advance together over the array. The reader, `fast`, inspects
every element; the writer, `slow`, always sits on the slot the next
non-zero value should occupy. This split maintains an invariant across the
loop: `nums[:slow]` is finished — the non-zero values in their original
order — and the stretch between the cursors holds nothing but zeros that
are waiting to be overtaken. That stretch is the snowball: it grows by one
every time `fast` rolls over a zero, and every non-zero vaults the whole
ball in a single exchange.

When `fast` finds a non-zero value it trades places with whatever sits at
`slow` and both cursors advance; a zero is left where it is, joining the
middle stretch that the prefix will eventually absorb into the tail. Since
non-zero values are placed at `slow` in the order of their discovery,
their relative order survives untouched, and the zeros displaced by swaps
drift toward the end. Running this over `[7, 0, 4, 0, 9]`: 7 self-swaps
into place, 0 is skipped, 4 swaps ahead of the parked zero, 0 is skipped
again, 9 swaps forward, and `[7, 4, 9, 0, 0]` falls out.

The swap form is also the answer to the follow-up. While no zero has been
seen the cursors coincide and every "swap" is an element exchanging with
itself — zero writes for a zero-free prefix — and afterwards each non-zero
value moves exactly once, dragging at most one zero behind it. Bubbling
zeros rightward one position at a time, by contrast, can move a single
zero many times.

Nothing needs special casing: an all-zero array never triggers a swap, a
one-element array swaps with itself or not at all, and the mutation is
confined to the given array.

**Complexity:** `O(n)` time, `O(1)` space.
