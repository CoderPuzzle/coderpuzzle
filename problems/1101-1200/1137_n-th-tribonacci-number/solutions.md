# Solutions — N-th Tribonacci Number

## Three-variable rolling window

Each term depends only on the three before it, so the whole table collapses
to a window of three integers. Starting from `(T0, T1, T2) = (0, 1, 1)`,
one step shifts the window forward — the oldest value drops out, and the new
entry is the sum of all three. After `n - 2` steps the window's last element
is `Tn`, and the two trivial cases `n = 0` and `n <= 2` fall out of the
initialization without special handling beyond returning `T0` directly.

The constraint caps `n` at 37, where `T37 = 2 082 876 103` still fits in a
signed 32-bit integer — the guarantee the statement makes.

**Complexity:** `O(n)` time and `O(1)` space — three integers regardless of
`n`.
