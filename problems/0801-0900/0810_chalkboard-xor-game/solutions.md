# Solutions — Chalkboard XOR Game

## One fold and a parity check

Both terminal rules trigger on the same quantity — the XOR of the whole
board — so the entire game compresses into two facts about the starting
position: that XOR and the parity of the element count. Fold the array
once into `xor`; if `xor` is already 0, the second rule hands Alice the
win the moment she steps up to the board. Otherwise parity decides.

With an even count and `xor != 0`, Alice always has a safe erasure.
Erasing `x` leaves `xor ^ x`, which is 0 exactly when `x` equals the
fold — so erasing the wrong element is the only way to lose, and not
every element can be that wrong element: if all of them equaled the
fold, an even number of copies would fold to 0, contradicting
`xor != 0`. Alice erases something else, handing Bob an odd board with
nonzero XOR. Whatever Bob does, he either zeroes the board (losing on
the spot) or returns an even nonzero board to Alice — the invariant she
just left. She never runs out of safe moves; Bob eventually faces a
board where every element equals the fold and is forced to lose. With an
odd count and `xor != 0` the roles are fixed the other way: every Alice
move that avoids instant loss gives Bob that winning even position, and
if all elements equal the fold she loses immediately, so Alice loses.

That is the whole decision: Alice wins iff `xor == 0` or the count is
even. Example 1 folds `[1,1,2]` to 2 over three elements — nonzero fold,
odd count — so `false`; Example 2 has two elements, and Example 3 folds
`[1,2,3]` to 0, both `true`. One pass keeps a single accumulator; the
values stay below `2¹⁶`, so 32-bit integers hold every intermediate fold.

**Complexity:** `O(n)` time, `O(1)` space.
