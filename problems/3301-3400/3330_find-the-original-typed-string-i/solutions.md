# Solutions — Find the Original Typed String I

## Run-counting closed form

A long press can only extend a run of equal characters, and at most one
press happened, so the intended string agrees with word everywhere except
inside a single run: a run of length L could have been intended with any
length r from 1 to L, where the press accounted for the remaining L - r
copies (r = L meaning no press at all, or a press inside some other run).
Each shorter r yields a distinct string, and choices never combine across
runs, so the possibilities are word itself plus, for every run with
L ≥ 2, exactly L − 1 shorter originals.

Summing L − 1 over runs counts precisely the positions whose character
equals the previous one — one scan with a running comparison. With
`word.length ≤ 100` the answer fits comfortably in 32 bits.

**Complexity:** `O(n)` time, `O(1)` space.
