# Solutions — Total Characters in String After Transformations II

## 26×26 Transition Matrix Exponentiation

Only the character counts matter, never the string's order, so collapse `s` into a frequency vector `v` of length 26. One transformation is a linear map on counts: character `j` produces the `nums[j]` consecutive characters following it (wrapping past `'z'`), so the transition matrix `M` has `M[i][j] = 1` exactly when character `j` emits character `i` in a single step. The counts after `t` steps are simply `M^t · v`, and the answer is the sum of the resulting vector's entries mod `10⁹ + 7`.

Because `t` can be as large as `10⁹`, the power is computed by fast exponentiation — squaring the matrix and multiplying into an accumulator on set bits — so only `O(log t)` matrix products are needed. Each product is a 26×26 matrix multiply mod `10⁹ + 7`, which the implementation accelerates by skipping zero entries of the left operand (the raw transition matrix is sparse, though its powers fill in quickly).

Correctness follows from the counts forming a linear system: the number of `i`'s after one more step is `Σ_j M[i][j] · (count of j)`, and composition of steps composes the matrices, so `M^t` is exactly the `t`-fold transformation. The modulo commutes with matrix addition and multiplication here, so all arithmetic stays exact within the modulus.

Edge cases: wrap-around targets like `'y'` with `nums[24] = 3` are handled by the `(j + a) % 26` index; `nums[i]` between `1` and `25` guarantees every character emits at least one, so the string never shrinks; `t = 1` still goes through the same path. Counting the initial string is `O(|s|)`.

**Complexity:** `O(|s| + 26³ · log t)` time, `O(26²)` space.
