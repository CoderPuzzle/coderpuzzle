# Solutions — Matrix Similarity After Cyclic Shifts

## Rotation invariance, checked in place

k repeated shifts compose into a single rotation: after k steps an
even-indexed row equals its original left-rotated by k, and an
odd-indexed row its original right-rotated by k, both taken modulo the row
length n. The matrix therefore ends up identical to the original exactly
when every row is invariant under its rotation.

A row is invariant under a left rotation by d precisely when
row[i] == row[(i + d) mod n] for every i, and the same condition reads the
rotation in the right direction — invariance under +d is invariance under
-d — so one comparison per cell settles both row parities, with no
intermediate matrices. When k % n == 0 every row comes back unchanged and
the answer is immediately true. Checking a cell only reads positions of its
own row, so the scan costs one pass over the matrix with constant extra
space.

**Complexity:** `O(m · n)` time, `O(1)` extra space.
