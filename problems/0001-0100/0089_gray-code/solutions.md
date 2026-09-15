# Solutions — Gray Code

## Index XOR its right shift

The pinned order names its own recipe — the element at index `i` is `i ^ (i >> 1)` — so a single
loop over `0..2ⁿ-1` emits the answer directly, with no post-sort and no intermediate lists. The
formula really does meet every rule in the definition: incrementing `i` flips a trailing block of
low bits, and each of those flips except the topmost happens identically in `i >> 1`, so it cancels
in the XOR and consecutive elements differ in exactly one bit. The first element is `0 ^ 0 = 0`, and
the wrap holds because the last index `2ⁿ - 1` is all ones, whose shifted copy clears only the top
bit, leaving `2ⁿ⁻¹` — exactly the one bit separating the last element from the first.

Distinctness is easiest to see in the mirror view of the same sequence: the n-bit list is the
(n-1)-bit list followed by its reverse with the new top bit set, so the first half carries that bit
clear and the second half set, and no value can repeat. Building the list by that reflection
produces the same element at every index as the formula — the two are one sequence described twice,
which is why the formula loop alone serves as the uniform solution in all seven languages.

The loop runs at most `2¹⁶ = 65,536` steps, far inside the time limit. The cases stop at `n = 13`:
that answer serializes to about 39 KB, while `n = 14` already needs 85 KB and the `n = 16` ceiling
would need 373 KB — past the judge's 64 KB output budget, so those sizes are excluded rather than
silently truncated.

**Complexity:** `O(2ⁿ)` time, `O(1)` auxiliary space excluding the output.
