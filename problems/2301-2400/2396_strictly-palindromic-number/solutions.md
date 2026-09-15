# Solutions — Strictly Palindromic Number

## The base n-2 representation is always 12

No `n` in the constraints (nor any integer above 4) survives the
definition, so the answer is always false — the work is in seeing why.
Consider base `b = n - 2`. Writing `n = b + 2` gives the two-digit
representation `"12"`: one `b`, plus two. Since `n >= 4` forces
`n - 2 >= 2`, that base always lies in the required range, and `"12"`
reads differently backward — a single counterexample suffices, so return
false unconditionally.

**Complexity:** `O(1)` time, `O(1)` space.
