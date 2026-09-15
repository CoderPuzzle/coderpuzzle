# Solutions — Process String with Special Operations II

## Length trace, then walk backwards

The final result can reach `10^15` characters, so building it is impossible
in any language here. The key observation is that the kth character does not
need the whole string: only the _lengths_ after each prefix, plus one
position that is rewritten as the operations are undone.

The first pass records `length[i]`, the size of the result after processing
`i` characters. `#` doubles it, `*` decrements it (never below zero), a
letter increments it, and `%` leaves it unchanged. These are plain 64-bit
arithmetic, and the constraint that the result's length never exceeds `10^15`
keeps every intermediate inside the range of a 64-bit counter. If `k` is at
or past the final length, the answer is `'.'` immediately.

The second pass walks `s` backwards carrying `pos`, the position of the
desired character in the result _at that point_. A `#` means the string was
its own duplicate, so a position in the right half folds into the left by
subtracting the pre-duplication length; a `%` mirrors the position across the
midpoint; a `*` only removed the tail, so every remaining position is
untouched; and a letter is the answer exactly when `pos` points at the slot
where it was appended. Each step is constant-time arithmetic on the length
array, so the whole run is two linear passes.

**Complexity:** `O(n)` time, `O(n)` space, where `n = s.length`.
